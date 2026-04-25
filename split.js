/**
 * PDF Toolkit - Split Logic
 */

let selectedFile = null;
let pdfDoc = null;

document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop('dropZone', 'fileInput', handleFileAdded);

    const splitBtn = document.getElementById('splitBtn');
    splitBtn.addEventListener('click', splitPdf);
});

async function handleFileAdded(files) {
    const file = files[0];
    if (!file || file.type !== 'application/pdf') {
        UI.showError('Please select a valid PDF file.');
        return;
    }

    selectedFile = file;
    
    try {
        UI.showLoader();
        const arrayBuffer = await file.arrayBuffer();
        pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();

        // Update UI
        document.getElementById('fileNameDisplay').innerText = file.name;
        document.getElementById('pageCountDisplay').innerText = `${pageCount} pages`;
        document.getElementById('fileInfo').classList.remove('d-none');
        document.getElementById('splitBtn').disabled = false;
        
        UI.hideLoader();
    } catch (error) {
        console.error(error);
        UI.hideLoader();
        UI.showError('Error loading PDF. It might be encrypted or corrupted.');
    }
}

async function splitPdf() {
    if (!pdfDoc) return;

    const rangeInput = document.getElementById('pageRange').value.trim();
    if (!rangeInput) {
        UI.showError('Please enter a page range.');
        return;
    }

    try {
        const pageCount = pdfDoc.getPageCount();
        const pagesToExtract = parsePageRange(rangeInput, pageCount);

        if (pagesToExtract.length === 0) {
            UI.showError('Invalid page range.');
            return;
        }

        UI.showLoader();

        const newPdf = await PDFLib.PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract.map(p => p - 1));
        copiedPages.forEach(page => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        downloadPdf(pdfBytes, `split_${selectedFile.name}`);

        UI.hideLoader();
        UI.showStatus();
    } catch (error) {
        console.error(error);
        UI.hideLoader();
        UI.showError('An error occurred while splitting the PDF.');
    }
}

/**
 * Parses strings like "1-3, 5, 8-10" into [1, 2, 3, 5, 8, 9, 10]
 */
function parsePageRange(input, maxPages) {
    const pages = new Set();
    const parts = input.split(',');

    for (let part of parts) {
        part = part.trim();
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
                for (let i = start; i <= Math.min(end, maxPages); i++) {
                    pages.add(i);
                }
            }
        } else {
            const page = Number(part);
            if (!isNaN(page) && page > 0 && page <= maxPages) {
                pages.add(page);
            }
        }
    }

    return Array.from(pages).sort((a, b) => a - b);
}
