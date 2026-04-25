/**
 * PDF Toolkit - Shared Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateToggleButton(true);
    }
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateToggleButton(isLight);
}

function updateToggleButton(isLight) {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
        btn.innerHTML = isLight 
            ? '<i class="fa-solid fa-moon"></i> Dark Mode' 
            : '<i class="fa-solid fa-sun"></i> Light Mode';
    }
}

const UI = {
    showLoader: () => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'flex';
    },
    hideLoader: () => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    },
    showStatus: (id = 'statusMessage') => {
        const status = document.getElementById(id);
        if (status) {
            status.classList.remove('d-none');
            setTimeout(() => status.classList.add('d-none'), 5000);
        }
    },
    showError: (text, id = 'errorMessage') => {
        const error = document.getElementById(id);
        const errorText = document.getElementById('errorText');
        if (error) {
            if (errorText) errorText.innerText = text;
            error.classList.remove('d-none');
            setTimeout(() => error.classList.add('d-none'), 5000);
        } else {
            alert(text);
        }
    }
};

// Handle Drag & Drop UI states
function setupDragAndDrop(dropZoneId, fileInputId, onFilesAdded) {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(fileInputId);

    if (!dropZone || !fileInput) return;

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    ['dragleave', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, () => dropZone.classList.remove('drag-over'));
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFilesAdded(files);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            onFilesAdded(e.target.files);
        }
    });
}

// Download Helper
function downloadPdf(pdfBytes, fileName) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
