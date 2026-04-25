#  PDF Toolkit – Professional Client-Side PDF Editor

A lightweight, high-performance, and privacy-first web application designed to handle your PDF needs directly in the browser. No uploads, no servers, just pure client-side processing.

##  Live Demo

Check out the live application here:  
[https://bhabina2005.github.io/pdf-toolkit/](https://bhabina2005.github.io/pdf-toolkit/)

## Features

*   ** PDF Merger:** Combine multiple PDF documents into a single file with ease.
*   ** PDF Splitter:** Extract specific page ranges or individual pages into separate documents.
*   ** Privacy-First:** Files never leave your computer. All processing happens locally in your browser.
*   ** Responsive Design:** Fully optimized for desktops, tablets, and mobile devices.
*   ** Glassmorphic UI:** A modern, clean, and visually appealing interface built with cutting-edge CSS.

##  Tech Stack

*   **Frontend:** HTML5, CSS3 (Vanilla), Bootstrap 5
*   **Logic:** JavaScript (ES6+)
*   **Library:** [pdf-lib](https://pdf-lib.js.org/) (High-performance PDF manipulation)
*   **Icons:** Font Awesome / Bootstrap Icons

##  How It Works

Traditional PDF tools upload your sensitive documents to a remote server for processing. **PDF Toolkit** is different. 

Using the power of `pdf-lib` and the browser's `ArrayBuffer` API, the application reads your files directly from the input field, performs the requested operations (merging or splitting) in the browser's memory, and generates a download link instantly. Your data remains 100% under your control.

##  Project Structure
pdf-toolkit/
├── index.html          # Landing page
├── merge.html          # PDF Merger interface
├── split.html          # PDF Splitter interface
├── style.css           # Global styles & Glassmorphism effects
├── main.js             # General application logic
├── merge.js            # Logic for merging PDFs
└── split.js            # Logic for splitting PDFs

##  Run Locally

Follow these steps to set up the project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pdf-toolkit.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd pdf-toolkit
    ```
3.  **Open in Browser:**
    Simply open `index.html` in any modern web browser, or use a local server like Live Server (VS Code extension).

##  Screenshots

| Landing Page | PDF Merger |
| :--- | :--- |
| ![Landing Page Placeholder](https://via.placeholder.com/400x250?text=Landing+Page) | ![Merger Placeholder](https://via.placeholder.com/400x250?text=PDF+Merger) |


## Future Improvements

- [ ] Add PDF compression functionality.
- [ ] Implement PDF-to-Image conversion.
- [ ] Add page reordering via drag-and-drop.
- [ ] Support for password-protected PDFs.

##  Author

**Bhabina Babu**  
 [GitHub](https://github.com/Bhabina2005)

## License

This project is licensed under the [MIT License](LICENSE).
