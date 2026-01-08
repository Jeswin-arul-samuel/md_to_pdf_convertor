const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const puppeteer = require('puppeteer');
const { LicenseManager, generateLicenseKey } = require('./license');

let mainWindow;
let licenseManager;

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
  // Initialize license manager with user data path
  licenseManager = new LicenseManager(app.getPath('userData'));

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

  // List style mappings
  const listStyleMap = {
    'disc': 'disc',
    'circle': 'circle',
    'square': 'square'
  };

  const numberStyleMap = {
    'decimal': 'decimal',
    'lower-alpha': 'lower-alpha',
    'upper-alpha': 'upper-alpha',
    'lower-roman': 'lower-roman',
    'upper-roman': 'upper-roman'
  };

  // Image alignment styles
  const imageAlignmentMap = {
    'left': 'margin-right: auto; display: block;',
    'center': 'margin-left: auto; margin-right: auto; display: block;',
    'right': 'margin-left: auto; display: block;'
  };

  // Link underline
  const linkTextDecoration = options.linkUnderline ? 'underline' : 'none';

  // Table border styles
  const tableBorderStyle = options.tableBorders ? `border: ${options.tableBorderWidth || '1px'} solid #ddd;` : 'border: none;';
  const tableAlternateRowsCSS = options.tableAlternateRows ? `
    tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }` : '';

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
      text-align: ${options.textAlignment || 'left'};
      letter-spacing: ${options.letterSpacing || '0px'};
      word-spacing: ${options.wordSpacing || '0px'};
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${headingFontFamily};
      color: ${options.headingColor};
      margin-top: ${options.headingMarginTop || '1.5em'};
      margin-bottom: ${options.headingMarginBottom || '0.5em'};
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
      text-decoration: ${linkTextDecoration};
    }

    a:hover {
      text-decoration: underline;
    }

    code {
      font-family: "Courier New", Consolas, monospace;
      background-color: ${options.codeBackground};
      color: ${options.codeTextColor};
      padding: 2px 6px;
      border-radius: ${options.codeBorderRadius || '3px'};
      font-size: 0.9em;
    }

    pre {
      background-color: ${options.codeBackground};
      padding: ${options.codePadding || '16px'};
      border-radius: ${options.codeBorderRadius || '6px'};
      overflow-x: auto;
      margin: 1em 0;
      line-height: ${options.codeLineHeight || '1.5'};
    }

    pre code {
      background: none;
      padding: 0;
      color: ${options.codeTextColor};
    }

    blockquote {
      border-left: 4px solid ${options.blockquoteBorderColor || options.linkColor};
      background-color: ${options.blockquoteBackground || 'transparent'};
      margin: 1em 0;
      padding: 0.5em 0 0.5em 1em;
      color: #666;
      font-style: italic;
    }

    ul {
      padding-left: ${options.listIndentation || '2em'};
      margin-bottom: ${options.paragraphSpacing};
      list-style-type: ${listStyleMap[options.listBulletStyle] || 'disc'};
    }

    ol {
      padding-left: ${options.listIndentation || '2em'};
      margin-bottom: ${options.paragraphSpacing};
      list-style-type: ${numberStyleMap[options.listNumberStyle] || 'decimal'};
    }

    li {
      margin-bottom: ${options.listItemSpacing || '0.5em'};
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
    }

    th, td {
      ${tableBorderStyle}
      padding: ${options.tableCellPadding || '8px 12px'};
      text-align: left;
    }

    th {
      background-color: ${options.tableHeaderBackground || options.codeBackground};
      color: ${options.tableHeaderText || '#333333'};
      font-weight: 600;
    }
    ${tableAlternateRowsCSS}

    img {
      max-width: ${options.imageMaxWidth || '100%'};
      height: auto;
      ${imageAlignmentMap[options.imageAlignment] || imageAlignmentMap['left']}
      margin: ${options.imageSpacing || '16px'} 0;
    }

    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 2em 0;
    }

    @media print {
      body {
        padding: ${options.pageMarginCustom || options.pageMargins || '1in'};
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

    // Create complete HTML document with page preview styling
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      background: #f0f0f0;
      padding: 20px;
      margin: 0;
    }

    .page-container > * {
      margin: 0;
      padding: 0;
    }

    .page-container {
      background: #e8e8e8;
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1), 0 0 0 1px #bbb;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: stretch;
    }

    .page-content {
      background: white;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .page-margin-guide {
      position: absolute;
      border: 1px dashed #ccc;
      background: transparent;
      pointer-events: none;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    body > .page-container {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    /* Reset padding from generated CSS */
    .page-content {
      padding: 0 !important;
      margin: 0 !important;
    }

    ${css}
  </style>
</head>
<body>
  <div class="page-container">
    <div class="page-content">
      <div class="page-margin-guide" style="top: 0; left: 0; right: 0; bottom: 0;"></div>
      <div style="width: 100%; height: 100%; overflow: auto; position: relative;">
        ${htmlContent}
      </div>
    </div>
  </div>
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

// Helper function to generate HTML from markdown text (not from file)
function generateHTMLFromText(markdownContent, cssPath = null, styleOptions = null) {
  try {
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

    // Create complete HTML document with page preview styling
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      background: #f0f0f0;
      padding: 20px;
      margin: 0;
    }

    .page-container > * {
      margin: 0;
      padding: 0;
    }

    .page-container {
      background: #e8e8e8;
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1), 0 0 0 1px #bbb;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: stretch;
    }

    .page-content {
      background: white;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .page-margin-guide {
      position: absolute;
      border: 1px dashed #ccc;
      background: transparent;
      pointer-events: none;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    body > .page-container {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    /* Reset padding from generated CSS */
    .page-content {
      padding: 0 !important;
      margin: 0 !important;
    }

    ${css}
  </style>
</head>
<body>
  <div class="page-container">
    <div class="page-content">
      <div class="page-margin-guide" style="top: 0; left: 0; right: 0; bottom: 0;"></div>
      <div style="width: 100%; height: 100%; overflow: auto; position: relative;">
        ${htmlContent}
      </div>
    </div>
  </div>
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

// Helper function to build header template for PDF
function buildHeaderTemplate(options) {
  const headerText = options.pdfHeaderText || '';
  if (!headerText) {
    return null;
  }

  return `
    <div style="width: 100%; text-align: center; font-size: 12px; padding: 10px; border-bottom: 1px solid #ddd;">
      ${headerText}
    </div>
  `;
}

// Helper function to build footer template for PDF
function buildFooterTemplate(options) {
  const footerText = options.pdfFooterText || '';
  const showPageNumbers = options.pdfPageNumbers !== false;
  const position = options.pdfPageNumberPosition || 'footer-right';

  // Determine alignment based on position
  let alignment = 'right';
  let positionClass = position.includes('left') ? 'left' : (position.includes('center') ? 'center' : 'right');

  let content = '';
  if (footerText && showPageNumbers) {
    content = `${footerText} - <span class="pageNumber"></span>/<span class="totalPages"></span>`;
  } else if (footerText) {
    content = footerText;
  } else if (showPageNumbers) {
    content = '<span class="pageNumber"></span>/<span class="totalPages"></span>';
  }

  if (!content) {
    return null;
  }

  return `
    <div style="width: 100%; text-align: ${positionClass}; font-size: 12px; padding: 10px 20px; border-top: 1px solid #ddd;">
      ${content}
    </div>
  `;
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
    const margins = styleOptions ? (styleOptions.pageMarginCustom || styleOptions.pageMargins || '1in') : '1in';

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(htmlResult.html, { waitUntil: 'networkidle0' });

    // Build header and footer templates
    const headerTemplate = styleOptions ? buildHeaderTemplate(styleOptions) : null;
    const footerTemplate = styleOptions ? buildFooterTemplate(styleOptions) : null;

    // Generate PDF with headers/footers if needed
    const pdfOptions = {
      path: pdfPath,
      format: 'A4',
      margin: {
        top: margins,
        right: margins,
        bottom: margins,
        left: margins
      },
      printBackground: true
    };

    // Add header/footer if they exist
    if (headerTemplate || footerTemplate) {
      pdfOptions.displayHeaderFooter = true;
      if (headerTemplate) {
        pdfOptions.headerTemplate = headerTemplate;
      }
      if (footerTemplate) {
        pdfOptions.footerTemplate = footerTemplate;
      }
    }

    await page.pdf(pdfOptions);

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

// Generate preview from markdown text (for editor mode)
ipcMain.handle('generate-preview-from-text', async (event, { markdownText, cssPath, styleOptions }) => {
  try {
    const htmlResult = generateHTMLFromText(markdownText, cssPath, styleOptions);
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

// Convert markdown text to PDF (for editor mode)
ipcMain.handle('convert-text-to-pdf', async (event, { markdownText, pdfPath, cssPath, styleOptions }) => {
  let browser;
  try {
    const htmlResult = generateHTMLFromText(markdownText, cssPath, styleOptions);
    if (!htmlResult.success) {
      return htmlResult;
    }

    // Get margins from styleOptions or use default
    const margins = styleOptions ? (styleOptions.pageMarginCustom || styleOptions.pageMargins || '1in') : '1in';

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(htmlResult.html, { waitUntil: 'networkidle0' });

    // Build header and footer templates
    const headerTemplate = styleOptions ? buildHeaderTemplate(styleOptions) : null;
    const footerTemplate = styleOptions ? buildFooterTemplate(styleOptions) : null;

    // Generate PDF with headers/footers if needed
    const pdfOptions = {
      path: pdfPath,
      format: 'A4',
      margin: {
        top: margins,
        right: margins,
        bottom: margins,
        left: margins
      },
      printBackground: true
    };

    // Add header/footer if they exist
    if (headerTemplate || footerTemplate) {
      pdfOptions.displayHeaderFooter = true;
      if (headerTemplate) {
        pdfOptions.headerTemplate = headerTemplate;
      }
      if (footerTemplate) {
        pdfOptions.footerTemplate = footerTemplate;
      }
    }

    await page.pdf(pdfOptions);

    await browser.close();

    return { success: true, message: 'PDF generated successfully' };
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    return {
      success: false,
      error: error.message || 'Failed to convert to PDF'
    };
  }
});

// Read file content
ipcMain.handle('read-file', async (event, { filePath }) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Write file content
ipcMain.handle('write-file', async (event, { filePath, content }) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
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

// ==================== LICENSE HANDLERS ====================

// Get current license status
ipcMain.handle('get-license-status', async () => {
  return licenseManager.getLicenseStatus();
});

// Activate license with key
ipcMain.handle('activate-license', async (event, { licenseKey }) => {
  return licenseManager.activateLicense(licenseKey);
});

// Record a file conversion (for trial tracking)
ipcMain.handle('record-conversion', async () => {
  return licenseManager.recordConversion();
});

// Check if user can convert
ipcMain.handle('can-convert', async () => {
  return {
    canConvert: licenseManager.canConvert(),
    status: licenseManager.getLicenseStatus()
  };
});

// Deactivate license
ipcMain.handle('deactivate-license', async () => {
  return licenseManager.deactivateLicense();
});

// Reset trial (for development/testing only)
ipcMain.handle('reset-trial', async () => {
  return licenseManager.resetTrial();
});

// Generate license key (for development/testing only - remove in production or secure it)
ipcMain.handle('generate-license-key', async () => {
  return { key: generateLicenseKey() };
});
