/**
 * PDF Toolkit - Merge Logic
 */

let selectedFiles = [];

document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop('dropZone', 'fileInput', handleFilesAdded);

    const mergeBtn = document.getElementById('mergeBtn');
    mergeBtn.addEventListener('click', mergePdfs);
});

function handleFilesAdded(files) {
    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
        UI.showError('Please select valid PDF files.');
        return;
    }

    selectedFiles = [...selectedFiles, ...pdfFiles];
    renderFileList();
    updateMergeButton();
}

function renderFileList() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'file-pill';
        item.innerHTML = `
            <div class="d-flex align-items-center overflow-hidden">
                <i class="fa-solid fa-file-pdf text-primary me-3"></i>
                <span class="text-truncate fw-medium small">${file.name}</span>
            </div>
            <button class="btn btn-sm text-secondary p-0 ms-2" onclick="removeFile(${index})" title="Remove">
                <i class="fa-solid fa-x-mark"></i>
            </button>
        `;
        fileList.appendChild(item);
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    renderFileList();
    updateMergeButton();
}

function updateMergeButton() {
    const mergeBtn = document.getElementById('mergeBtn');
    mergeBtn.disabled = selectedFiles.length < 2;
}

async function mergePdfs() {
    if (selectedFiles.length < 2) return;

    try {
        UI.showLoader();
        
        const mergedPdf = await PDFLib.PDFDocument.create();

        for (const file of selectedFiles) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const pdfBytes = await mergedPdf.save();
        downloadPdf(pdfBytes, 'merged_document.pdf');
        
        UI.hideLoader();
        UI.showStatus();
        
        // Reset after success
        // selectedFiles = [];
        // renderFileList();
        // updateMergeButton();
    } catch (error) {
        console.error(error);
        UI.hideLoader();
        UI.showError('An error occurred while merging the PDFs.');
    }
}
