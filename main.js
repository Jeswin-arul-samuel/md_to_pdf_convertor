const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  mainWindow.loadFile('renderer/index.html');

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Generate dynamic CSS from style options
function generateDynamicCSS(options) {
  const fontFamilies = {
    'serif': 'Georgia, "Times New Roman", serif',
    'sans-serif': '"Helvetica Neue", Arial, sans-serif',
    'monospace': '"Courier New", Consolas, monospace'
  };

  const bodyFont = fontFamilies[options.fontFamily] || fontFamilies['serif'];
  const headingFontFamily = options.headingFont === 'same'
    ? bodyFont
    : (fontFamilies[options.headingFont] || fontFamilies['sans-serif']);

  return `
    body {
      font-family: ${bodyFont};
      font-size: ${options.fontSize};
      line-height: ${options.lineHeight};
      color: ${options.textColor};
      background-color: ${options.backgroundColor};
      max-width: ${options.contentWidth};
      margin: 0 auto;
      padding: 20px;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${headingFontFamily};
      color: ${options.headingColor};
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
    }

    h1 { font-size: 2em; }
    h2 { font-size: 1.5em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: 0.875em; }
    h6 { font-size: 0.75em; }

    p {
      margin-bottom: ${options.paragraphSpacing};
    }

    a {
      color: ${options.linkColor};
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    code {
      font-family: "Courier New", Consolas, monospace;
      background-color: ${options.codeBackground};
      color: ${options.codeTextColor};
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 0.9em;
    }

    pre {
      background-color: ${options.codeBackground};
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 1em 0;
    }

    pre code {
      background: none;
      padding: 0;
      color: ${options.codeTextColor};
    }

    blockquote {
      border-left: 4px solid ${options.linkColor};
      margin: 1em 0;
      padding-left: 1em;
      color: #666;
      font-style: italic;
    }

    ul, ol {
      padding-left: 2em;
      margin-bottom: ${options.paragraphSpacing};
    }

    li {
      margin-bottom: 0.5em;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background-color: ${options.codeBackground};
      font-weight: 600;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 2em 0;
    }

    @media print {
      body {
        padding: ${options.pageMargins};
      }
    }
  `;
}

// Helper function to generate HTML from markdown
function generateHTML(mdPath, cssPath = null, styleOptions = null) {
  try {
    // Read the markdown file
    const markdownContent = fs.readFileSync(mdPath, 'utf8');

    // Convert markdown to HTML
    const htmlContent = marked.parse(markdownContent);

    // Determine CSS to use
    let css = '';
    if (cssPath && fs.existsSync(cssPath)) {
      // Custom CSS file takes precedence
      css = fs.readFileSync(cssPath, 'utf8');
    } else if (styleOptions) {
      // Generate dynamic CSS from style options
      css = generateDynamicCSS(styleOptions);
    } else {
      // Fall back to default styling
      const defaultCss = path.join(__dirname, 'assets', 'default-style.css');
      if (fs.existsSync(defaultCss)) {
        css = fs.readFileSync(defaultCss, 'utf8');
      }
    }

    // Create complete HTML document
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    ${css}
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

    return { success: true, html: fullHtml };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to generate HTML'
    };
  }
}

// Convert markdown to PDF using Puppeteer
async function convertToPDF(mdPath, pdfPath, cssPath = null, styleOptions = null) {
  let browser;
  try {
    const htmlResult = generateHTML(mdPath, cssPath, styleOptions);
    if (!htmlResult.success) {
      return htmlResult;
    }

    // Get margins from styleOptions or use default
    const margins = styleOptions ? styleOptions.pageMargins : '1in';

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(htmlResult.html, { waitUntil: 'networkidle0' });

    // Generate PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: margins,
        right: margins,
        bottom: margins,
        left: margins
      },
      printBackground: true
    });

    await browser.close();

    return { success: true, message: 'PDF created successfully!' };
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    return {
      success: false,
      error: error.message || 'Failed to convert markdown to PDF'
    };
  }
}

// IPC handlers
ipcMain.handle('check-pandoc', async () => {
  // No longer need Pandoc, but keeping this for compatibility
  return { installed: true };
});

ipcMain.handle('convert-to-pdf', async (event, { mdPath, cssPath, suggestedName, styleOptions }) => {
  try {
    // Show save dialog
    const defaultPath = suggestedName || mdPath.replace(/\.md$/i, '.pdf');
    const { filePath, canceled } = await dialog.showSaveDialog(mainWindow, {
      title: 'Save PDF',
      defaultPath: defaultPath,
      filters: [
        { name: 'PDF Files', extensions: ['pdf'] }
      ]
    });

    if (canceled || !filePath) {
      return { success: false, canceled: true };
    }

    // Convert the file
    const result = await convertToPDF(mdPath, filePath, cssPath, styleOptions);

    if (result.success) {
      return { success: true, pdfPath: filePath, message: result.message };
    } else {
      return result;
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'An error occurred during conversion'
    };
  }
});

ipcMain.handle('select-css', async () => {
  const { filePaths, canceled } = await dialog.showOpenDialog(mainWindow, {
    title: 'Select CSS File',
    filters: [
      { name: 'CSS Files', extensions: ['css'] }
    ],
    properties: ['openFile']
  });

  if (canceled || filePaths.length === 0) {
    return { canceled: true };
  }

  return { cssPath: filePaths[0] };
});

ipcMain.handle('select-markdown', async () => {
  const { filePaths, canceled } = await dialog.showOpenDialog(mainWindow, {
    title: 'Select Markdown Files',
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown'] }
    ],
    properties: ['openFile', 'multiSelections']
  });

  if (canceled || filePaths.length === 0) {
    return { canceled: true };
  }

  // Return array of files for multiple selection support
  const files = filePaths.map(fp => ({
    filePath: fp,
    fileName: path.basename(fp)
  }));

  return { files };
});

ipcMain.handle('generate-preview', async (event, { mdPath, cssPath, styleOptions }) => {
  try {
    const htmlResult = generateHTML(mdPath, cssPath, styleOptions);
    return htmlResult;
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to generate preview'
    };
  }
});

// Select output folder for batch conversion
ipcMain.handle('select-output-folder', async () => {
  const { filePaths, canceled } = await dialog.showOpenDialog(mainWindow, {
    title: 'Select Output Folder',
    properties: ['openDirectory', 'createDirectory']
  });

  if (canceled || filePaths.length === 0) {
    return { canceled: true };
  }

  return { folderPath: filePaths[0] };
});

// Convert single file to PDF at specified path (for batch mode)
ipcMain.handle('convert-to-pdf-batch', async (event, { mdPath, pdfPath, cssPath, styleOptions }) => {
  try {
    const result = await convertToPDF(mdPath, pdfPath, cssPath, styleOptions);
    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to convert file'
    };
  }
});

// Show completion message
ipcMain.handle('show-message', async (event, { type, title, message }) => {
  await dialog.showMessageBox(mainWindow, {
    type: type || 'info',
    title: title || 'Message',
    message: message,
    buttons: ['OK']
  });
  return { success: true };
});
