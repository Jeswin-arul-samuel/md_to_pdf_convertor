let selectedFiles = [];
let customCssPath = null;
let selectedFileIndex = null;
let licenseStatus = null;

// Style options state with defaults
let styleOptions = {
  // Typography
  fontFamily: 'serif',
  fontSize: '12pt',
  lineHeight: '1.6',
  headingFont: 'sans-serif',
  // Layout
  pageMargins: '1in',
  pageMarginCustom: '1in',
  contentWidth: '800px',
  paragraphSpacing: '16px',
  // Colors
  textColor: '#333333',
  backgroundColor: '#ffffff',
  headingColor: '#1a1a1a',
  linkColor: '#0066cc',
  codeBackground: '#f5f5f5',
  codeTextColor: '#c7254e',
  // Tables
  tableBorders: true,
  tableAlternateRows: true,
  tableBorderWidth: '1px',
  tableCellPadding: '8px',
  tableHeaderBackground: '#f5f5f5',
  tableHeaderText: '#333333',
  // Images
  imageMaxWidth: '100%',
  imageAlignment: 'center',
  imageSpacing: '16px',
  // Lists
  listBulletStyle: 'disc',
  listNumberStyle: 'decimal',
  listIndentation: '2em',
  listItemSpacing: '0.5em',
  // Code
  codeBorderRadius: '6px',
  codePadding: '16px',
  codeLineHeight: '1.5',
  // Links
  linkUnderline: true,
  // Headings
  headingMarginTop: '1.5em',
  headingMarginBottom: '0.5em',
  // Blockquote
  blockquoteBorderColor: '#0066cc',
  blockquoteBackground: '#f0f0f0',
  // Text & Spacing
  textAlignment: 'left',
  letterSpacing: '0px',
  wordSpacing: '0px',
  // PDF Headers/Footers
  pdfHeaderText: '',
  pdfFooterText: '',
  pdfPageNumbers: true,
  pdfPageNumberPosition: 'footer-right'
};

// Mode state for Files vs Editor
let currentMode = 'files';
let editorContent = '';
let editorPreviewTimeout = null;
let unsavedChanges = false;
let currentFilePath = null; // Track which file is currently being edited

const addFilesSection = document.querySelector('.add-files-section');
const fileInput = document.getElementById('fileInput');
const addFilesBtn = document.getElementById('addFilesBtn');
const fileList = document.getElementById('fileList');
const files = document.getElementById('files');
const fileCount = document.getElementById('fileCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const convertBtn = document.getElementById('convertBtn');
const statusDiv = document.getElementById('status');
const customCssCheck = document.getElementById('customCssCheck');
const cssInput = document.getElementById('cssInput');
const cssPath = document.getElementById('cssPath');
const browseCssBtn = document.getElementById('browseCssBtn');
const previewFrame = document.getElementById('previewFrame');
const sidebar = document.querySelector('.sidebar');

// Editor and panel elements
const editorPanel = document.getElementById('editorPanel');
const previewPanel = document.getElementById('previewPanel');
const editorTextarea = document.getElementById('editorTextarea');
const expandEditorBtn = document.getElementById('expandEditorBtn');
const expandPreviewBtn = document.getElementById('expandPreviewBtn');
const saveEditorBtn = document.getElementById('saveEditorBtn');
const unsavedIndicator = document.getElementById('unsavedIndicator');

// Style option controls
const fontFamily = document.getElementById('fontFamily');
const fontSize = document.getElementById('fontSize');
const lineHeight = document.getElementById('lineHeight');
const headingFont = document.getElementById('headingFont');
const pageMargins = document.getElementById('pageMargins');
const contentWidth = document.getElementById('contentWidth');
const paragraphSpacing = document.getElementById('paragraphSpacing');
const textColor = document.getElementById('textColor');
const backgroundColor = document.getElementById('backgroundColor');
const headingColor = document.getElementById('headingColor');
const linkColor = document.getElementById('linkColor');
const codeBackground = document.getElementById('codeBackground');
const codeTextColor = document.getElementById('codeTextColor');

// New style controls - Margins
const pageMarginCustom = document.getElementById('pageMarginCustom');

// Table styling controls
const tableBorders = document.getElementById('tableBorders');
const tableAlternateRows = document.getElementById('tableAlternateRows');
const tableBorderWidth = document.getElementById('tableBorderWidth');
const tableCellPadding = document.getElementById('tableCellPadding');
const tableHeaderBackground = document.getElementById('tableHeaderBackground');
const tableHeaderText = document.getElementById('tableHeaderText');

// Image styling controls
const imageMaxWidth = document.getElementById('imageMaxWidth');
const imageAlignment = document.getElementById('imageAlignment');
const imageSpacing = document.getElementById('imageSpacing');

// List styling controls
const listBulletStyle = document.getElementById('listBulletStyle');
const listNumberStyle = document.getElementById('listNumberStyle');
const listIndentation = document.getElementById('listIndentation');
const listItemSpacing = document.getElementById('listItemSpacing');

// Code styling controls
const codeBorderRadius = document.getElementById('codeBorderRadius');
const codePadding = document.getElementById('codePadding');
const codeLineHeight = document.getElementById('codeLineHeight');

// Link styling controls
const linkUnderline = document.getElementById('linkUnderline');

// Heading spacing controls
const headingMarginTop = document.getElementById('headingMarginTop');
const headingMarginBottom = document.getElementById('headingMarginBottom');

// Blockquote styling controls
const blockquoteBorderColor = document.getElementById('blockquoteBorderColor');
const blockquoteBackground = document.getElementById('blockquoteBackground');

// Text & Spacing controls
const textAlignment = document.getElementById('textAlignment');
const letterSpacing = document.getElementById('letterSpacing');
const wordSpacing = document.getElementById('wordSpacing');

// PDF Headers/Footers controls
const pdfHeaderText = document.getElementById('pdfHeaderText');
const pdfFooterText = document.getElementById('pdfFooterText');
const pdfPageNumbers = document.getElementById('pdfPageNumbers');
const pdfPageNumberPosition = document.getElementById('pdfPageNumberPosition');

// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');

    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Global drag and drop handlers (works anywhere in the sidebar)
sidebar.addEventListener('dragover', (e) => {
  e.preventDefault();
  addFilesSection.classList.add('drag-over');
});

sidebar.addEventListener('dragleave', (e) => {
  // Only remove if we're leaving the sidebar entirely
  if (e.target === sidebar) {
    addFilesSection.classList.remove('drag-over');
  }
});

sidebar.addEventListener('drop', (e) => {
  e.preventDefault();
  addFilesSection.classList.remove('drag-over');

  const droppedFiles = Array.from(e.dataTransfer.files);
  const mdFiles = droppedFiles.filter(file =>
    file.name.match(/\.(md|markdown)$/i)
  );

  if (mdFiles.length === 0 && droppedFiles.length > 0) {
    showStatus('Only Markdown files (.md, .markdown) are allowed', 'error');
    return;
  }

  mdFiles.forEach(file => {
    if (file.path) {
      addFile(file.path, file.name);
    }
  });

  const skipped = droppedFiles.length - mdFiles.length;
  if (skipped > 0) {
    showStatus(`Added ${mdFiles.length} file(s), skipped ${skipped} non-markdown file(s)`, 'error');
  }
});

// Expand/Collapse functionality
let editorExpanded = false;
let previewExpanded = false;

expandEditorBtn.addEventListener('click', () => {
  editorExpanded = !editorExpanded;
  previewPanel.classList.toggle('collapsed', editorExpanded);
  editorPanel.classList.toggle('expanded', editorExpanded);

  // Toggle icons
  const expandIcon = expandEditorBtn.querySelector('.icon-expand');
  const shrinkIcon = expandEditorBtn.querySelector('.icon-shrink');
  if (editorExpanded) {
    expandIcon.style.display = 'none';
    shrinkIcon.style.display = 'block';
    expandEditorBtn.title = 'Collapse editor';
  } else {
    expandIcon.style.display = 'block';
    shrinkIcon.style.display = 'none';
    expandEditorBtn.title = 'Expand editor';
  }
});

expandPreviewBtn.addEventListener('click', () => {
  previewExpanded = !previewExpanded;
  editorPanel.classList.toggle('collapsed', previewExpanded);
  previewPanel.classList.toggle('expanded', previewExpanded);

  // Toggle icons
  const expandIcon = expandPreviewBtn.querySelector('.icon-expand');
  const shrinkIcon = expandPreviewBtn.querySelector('.icon-shrink');
  if (previewExpanded) {
    expandIcon.style.display = 'none';
    shrinkIcon.style.display = 'block';
    expandPreviewBtn.title = 'Collapse preview';
  } else {
    expandIcon.style.display = 'block';
    shrinkIcon.style.display = 'none';
    expandPreviewBtn.title = 'Expand preview';
  }
});

// Mark as unsaved when editor content changes
function markAsUnsaved() {
  if (currentFilePath && !unsavedChanges) {
    unsavedChanges = true;
    unsavedIndicator.textContent = ' •';
    saveEditorBtn.style.display = 'flex';
  }
}

// Mark as saved and hide indicator
function markAsSaved() {
  unsavedChanges = false;
  unsavedIndicator.textContent = '';
  saveEditorBtn.style.display = 'none';
}

// Save editor content to file
saveEditorBtn.addEventListener('click', async () => {
  if (!currentFilePath) {
    showStatus('No file to save', 'error');
    return;
  }

  try {
    showStatus('Saving...', '');
    const result = await window.electron.writeFile(currentFilePath, editorContent);

    if (result.success) {
      markAsSaved();
      showStatus('File saved successfully', 'success');
    } else {
      showStatus('Error saving file: ' + result.error, 'error');
    }
  } catch (error) {
    showStatus('Error saving file: ' + error.message, 'error');
  }
});

// Editor input with debounced preview updates
editorTextarea.addEventListener('input', (e) => {
  editorContent = e.target.value;
  markAsUnsaved();

  // Clear existing timeout
  if (editorPreviewTimeout) {
    clearTimeout(editorPreviewTimeout);
  }

  // Debounce preview update by 350ms
  editorPreviewTimeout = setTimeout(() => {
    generateEditorPreview();
  }, 350);
});

// Generate preview from editor text
async function generateEditorPreview() {
  if (!editorContent.trim()) {
    previewFrame.srcdoc = '<div style="padding: 20px; color: #999; font-size: 14px;">Start typing Markdown to see preview...</div>';
    return;
  }

  try {
    showStatus('Generating preview...', '');

    // Save current scroll position before updating preview
    const scrollPosition = previewFrame.contentWindow?.scrollY || 0;

    // Call the new IPC handler for text-based preview generation
    const result = await window.electron.generatePreviewFromText({
      markdownText: editorContent,
      cssPath: customCssPath,
      styleOptions: styleOptions
    });

    if (result.success) {
      previewFrame.srcdoc = result.html;

      // Restore scroll position after content loads
      setTimeout(() => {
        if (previewFrame.contentWindow) {
          previewFrame.contentWindow.scrollTo(0, scrollPosition);
        }
      }, 50);

      showStatus('', '');
    } else {
      showStatus('Error generating preview: ' + (result.error || 'Unknown error'), 'error');
    }
  } catch (error) {
    showStatus('Error generating preview: ' + error.message, 'error');
  }
}

// Add files button
addFilesBtn.addEventListener('click', async () => {
  const result = await window.electron.selectMarkdown();
  if (!result.canceled && result.files) {
    result.files.forEach(file => {
      addFile(file.filePath, file.fileName);
    });
  }
});

// Add file to list
function addFile(filePath, name) {
  if (!name.match(/\.(md|markdown)$/i)) {
    showStatus('Please select Markdown files (.md or .markdown)', 'error');
    return;
  }

  // Check if file already added
  if (selectedFiles.some(f => f.path === filePath)) {
    showStatus('File already added', 'error');
    return;
  }

  const isFirstFile = selectedFiles.length === 0;
  selectedFiles.push({ path: filePath, name: name });

  // Auto-select first file and show preview
  if (isFirstFile) {
    selectedFileIndex = 0;
  }

  updateFileList();

  // Show preview and load content into editor for currently selected file
  if (selectedFileIndex !== null) {
    const file = selectedFiles[selectedFileIndex];
    generatePreview(file.path, file.name);
    // Load file content into editor
    loadFileContentToEditor(file.path);
  }

  showStatus('', '');
}

// Load file content into editor
async function loadFileContentToEditor(filePath) {
  try {
    const result = await window.electron.readFile(filePath);
    if (result.success) {
      currentFilePath = filePath;
      editorContent = result.content;
      editorTextarea.value = result.content;
      markAsSaved(); // Reset unsaved indicator when loading a new file
      // Generate preview from the loaded content
      generateEditorPreview();
    }
  } catch (error) {
    // Silently fail if unable to load file
  }
}

// Update file list UI
function updateFileList() {
  if (selectedFiles.length === 0) {
    fileList.style.display = 'none';
    convertBtn.disabled = true;
    selectedFileIndex = null;
    previewFrame.srcdoc = '';
    return;
  }

  fileList.style.display = 'block';
  convertBtn.disabled = false;

  fileCount.textContent = `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''}`;

  files.innerHTML = '';
  selectedFiles.forEach((file, index) => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    if (index === selectedFileIndex) {
      fileItem.classList.add('selected');
    }

    fileItem.innerHTML = `
      <div class="file-item-info">
        <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <span class="file-item-name">${file.name}</span>
      </div>
      <button class="btn-remove-file" data-index="${index}">Remove</button>
    `;

    // Click on file to preview and load into editor
    fileItem.querySelector('.file-item-info').addEventListener('click', () => {
      selectedFileIndex = index;
      updateFileList();
      generatePreview(file.path, file.name);
      // Load file content into editor
      loadFileContentToEditor(file.path);
    });

    // Remove file button
    fileItem.querySelector('.btn-remove-file').addEventListener('click', (e) => {
      e.stopPropagation();
      removeFile(index);
    });

    files.appendChild(fileItem);
  });
}

// Remove single file
function removeFile(index) {
  selectedFiles.splice(index, 1);
  if (selectedFileIndex === index) {
    selectedFileIndex = selectedFiles.length > 0 ? 0 : null;
  } else if (selectedFileIndex > index) {
    selectedFileIndex--;
  }
  updateFileList();

  // Show preview for the currently selected file
  if (selectedFileIndex !== null) {
    const file = selectedFiles[selectedFileIndex];
    generatePreview(file.path, file.name);
  }
}

// Clear all files
clearAllBtn.addEventListener('click', () => {
  selectedFiles = [];
  selectedFileIndex = null;
  updateFileList();
  showStatus('', '');
});

// Custom CSS checkbox
customCssCheck.addEventListener('change', (e) => {
  if (e.target.checked) {
    cssInput.style.display = 'flex';
  } else {
    cssInput.style.display = 'none';
    customCssPath = null;
    cssPath.value = '';
  }

  // Refresh preview
  if (selectedFileIndex !== null) {
    const file = selectedFiles[selectedFileIndex];
    generatePreview(file.path, file.name);
  }
});

// Browse CSS button
browseCssBtn.addEventListener('click', async () => {
  const result = await window.electron.selectCSS();
  if (!result.canceled && result.cssPath) {
    customCssPath = result.cssPath;
    cssPath.value = result.cssPath;

    // Refresh preview
    if (selectedFileIndex !== null) {
      const file = selectedFiles[selectedFileIndex];
      generatePreview(file.path, file.name);
    }
  }
});

// Collapsible section headers
document.querySelectorAll('.section-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');

    content.classList.toggle('open');
    icon.style.transform = content.classList.contains('open') ? 'rotate(0deg)' : 'rotate(-90deg)';
  });
});

// Style option change handlers
function onStyleChange() {
  // Update styleOptions from controls
  styleOptions.fontFamily = fontFamily.value;
  styleOptions.fontSize = fontSize.value;
  styleOptions.lineHeight = lineHeight.value;
  styleOptions.headingFont = headingFont.value;
  styleOptions.pageMargins = pageMargins.value;
  styleOptions.pageMarginCustom = pageMarginCustom.value;
  styleOptions.contentWidth = contentWidth.value;
  styleOptions.paragraphSpacing = paragraphSpacing.value;
  styleOptions.textColor = textColor.value;
  styleOptions.backgroundColor = backgroundColor.value;
  styleOptions.headingColor = headingColor.value;
  styleOptions.linkColor = linkColor.value;
  styleOptions.codeBackground = codeBackground.value;
  styleOptions.codeTextColor = codeTextColor.value;
  // Tables
  styleOptions.tableBorders = tableBorders.checked;
  styleOptions.tableAlternateRows = tableAlternateRows.checked;
  styleOptions.tableBorderWidth = tableBorderWidth.value;
  styleOptions.tableCellPadding = tableCellPadding.value;
  styleOptions.tableHeaderBackground = tableHeaderBackground.value;
  styleOptions.tableHeaderText = tableHeaderText.value;
  // Images
  styleOptions.imageMaxWidth = imageMaxWidth.value;
  styleOptions.imageAlignment = imageAlignment.value;
  styleOptions.imageSpacing = imageSpacing.value;
  // Lists
  styleOptions.listBulletStyle = listBulletStyle.value;
  styleOptions.listNumberStyle = listNumberStyle.value;
  styleOptions.listIndentation = listIndentation.value;
  styleOptions.listItemSpacing = listItemSpacing.value;
  // Code
  styleOptions.codeBorderRadius = codeBorderRadius.value;
  styleOptions.codePadding = codePadding.value;
  styleOptions.codeLineHeight = codeLineHeight.value;
  // Links
  styleOptions.linkUnderline = linkUnderline.checked;
  // Headings
  styleOptions.headingMarginTop = headingMarginTop.value;
  styleOptions.headingMarginBottom = headingMarginBottom.value;
  // Blockquote
  styleOptions.blockquoteBorderColor = blockquoteBorderColor.value;
  styleOptions.blockquoteBackground = blockquoteBackground.value;
  // Text & Spacing
  styleOptions.textAlignment = textAlignment.value;
  styleOptions.letterSpacing = letterSpacing.value;
  styleOptions.wordSpacing = wordSpacing.value;
  // PDF Headers/Footers
  styleOptions.pdfHeaderText = pdfHeaderText.value;
  styleOptions.pdfFooterText = pdfFooterText.value;
  styleOptions.pdfPageNumbers = pdfPageNumbers.checked;
  styleOptions.pdfPageNumberPosition = pdfPageNumberPosition.value;

  // Refresh preview - always update both if they have content
  // Regenerate editor preview if it has content
  if (editorContent.trim()) {
    generateEditorPreview();
  }
  // Refresh file preview if a file is selected
  if (selectedFileIndex !== null) {
    const file = selectedFiles[selectedFileIndex];
    generatePreview(file.path, file.name);
  }
}

// Add change listeners to all style controls
const allStyleControls = [
  fontFamily, fontSize, lineHeight, headingFont,
  pageMargins, pageMarginCustom, contentWidth, paragraphSpacing,
  textColor, backgroundColor, headingColor, linkColor,
  codeBackground, codeTextColor,
  // New controls
  tableBorders, tableAlternateRows, tableBorderWidth, tableCellPadding,
  tableHeaderBackground, tableHeaderText,
  imageMaxWidth, imageAlignment, imageSpacing,
  listBulletStyle, listNumberStyle, listIndentation, listItemSpacing,
  codeBorderRadius, codePadding, codeLineHeight,
  linkUnderline,
  headingMarginTop, headingMarginBottom,
  blockquoteBorderColor, blockquoteBackground,
  textAlignment, letterSpacing, wordSpacing,
  pdfHeaderText, pdfFooterText, pdfPageNumbers, pdfPageNumberPosition
];

allStyleControls.forEach(control => {
  if (control) {
    control.addEventListener('change', onStyleChange);
    // For color inputs, also listen to 'input' for real-time updates
    if (control.type === 'color') {
      control.addEventListener('input', onStyleChange);
    }
    // For text inputs, also listen to 'input'
    if (control.type === 'text') {
      control.addEventListener('input', onStyleChange);
    }
  }
});

// Generate preview
async function generatePreview(filePath, fileName) {
  try {
    // Save current scroll position before updating preview
    const scrollPosition = previewFrame.contentWindow?.scrollY || 0;

    const result = await window.electron.generatePreview({
      mdPath: filePath,
      cssPath: customCssCheck.checked ? customCssPath : null,
      styleOptions: styleOptions
    });

    if (result.success) {
      previewFrame.srcdoc = result.html;

      // Restore scroll position after content loads
      setTimeout(() => {
        if (previewFrame.contentWindow) {
          previewFrame.contentWindow.scrollTo(0, scrollPosition);
        }
      }, 50);
    } else {
      showStatus(`Preview error: ${result.error}`, 'error');
    }
  } catch (error) {
    showStatus(`Preview error: ${error.message}`, 'error');
  }
}

// Modal elements
const saveModeModal = document.getElementById('saveModeModal');
const saveOneByOneBtn = document.getElementById('saveOneByOne');
const saveAllTogetherBtn = document.getElementById('saveAllTogether');
const cancelSaveModeBtn = document.getElementById('cancelSaveMode');

// Show save mode modal
function showSaveModeModal() {
  return new Promise((resolve) => {
    saveModeModal.style.display = 'flex';

    const handleOneByOne = () => {
      cleanup();
      resolve('one-by-one');
    };

    const handleAllTogether = () => {
      cleanup();
      resolve('all-together');
    };

    const handleCancel = () => {
      cleanup();
      resolve('cancel');
    };

    const cleanup = () => {
      saveModeModal.style.display = 'none';
      saveOneByOneBtn.removeEventListener('click', handleOneByOne);
      saveAllTogetherBtn.removeEventListener('click', handleAllTogether);
      cancelSaveModeBtn.removeEventListener('click', handleCancel);
    };

    saveOneByOneBtn.addEventListener('click', handleOneByOne);
    saveAllTogetherBtn.addEventListener('click', handleAllTogether);
    cancelSaveModeBtn.addEventListener('click', handleCancel);
  });
}

// Convert files one by one (original behavior)
async function convertOneByOne() {
  let successCount = 0;
  let failCount = 0;
  let lastSavedPath = null;

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];

    try {
      const result = await window.electron.convertToPDF({
        mdPath: file.path,
        cssPath: customCssCheck.checked ? customCssPath : null,
        suggestedName: file.name.replace(/\.(md|markdown)$/i, '.pdf'),
        styleOptions: styleOptions
      });

      if (result.success && !result.canceled) {
        successCount++;
        lastSavedPath = result.pdfPath;
      } else if (result.canceled) {
        showStatus('Conversion canceled', 'error');
        return { successCount, failCount, canceled: true };
      } else {
        failCount++;
        console.error(`Failed to convert ${file.name}:`, result.error);
      }
    } catch (error) {
      failCount++;
      console.error(`Error converting ${file.name}:`, error);
    }
  }

  return { successCount, failCount, lastSavedPath };
}

// Convert all files to a single folder (takes folder path as parameter)
async function convertAllToFolderWithPath(outputFolder) {
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    const pdfName = file.name.replace(/\.(md|markdown)$/i, '.pdf');
    const pdfPath = `${outputFolder}/${pdfName}`;

    try {
      const result = await window.electron.convertToPDFBatch({
        mdPath: file.path,
        pdfPath: pdfPath,
        cssPath: customCssCheck.checked ? customCssPath : null,
        styleOptions: styleOptions
      });

      if (result.success) {
        successCount++;
      } else {
        failCount++;
        console.error(`Failed to convert ${file.name}:`, result.error);
      }
    } catch (error) {
      failCount++;
      console.error(`Error converting ${file.name}:`, error);
    }
  }

  return { successCount, failCount, outputFolder };
}

// Convert button
convertBtn.addEventListener('click', async () => {
  if (selectedFiles.length === 0) {
    showStatus('Please add files first', 'error');
    return;
  }

  // Check if user can convert (license/trial check)
  const canConvert = await checkCanConvert();
  if (!canConvert) {
    return;
  }

  // Ask to save unsaved changes before converting
  if (unsavedChanges && currentFilePath) {
    const shouldSave = confirm(`You have unsaved changes. Would you like to save them before converting?\n\nClick OK to save, or Cancel to convert without saving.`);
    if (shouldSave) {
      const result = await window.electron.writeFile(currentFilePath, editorContent);
      if (result.success) {
        markAsSaved();
        showStatus('File saved', 'success');
      } else {
        showStatus('Error saving file: ' + result.error, 'error');
        return;
      }
    }
  }

  // If only one file, use direct save dialog
  if (selectedFiles.length === 1) {
    showStatus('Converting...', 'processing');
    convertBtn.disabled = true;

    const result = await convertOneByOne();
    convertBtn.disabled = false;

    if (result.canceled) return;

    if (result.successCount > 0) {
      // Record conversion for trial tracking
      await window.electron.recordConversion();
      await updateLicenseStatus();

      showStatus('Success! Converted 1 file', 'success');
      await window.electron.showMessage({
        type: 'info',
        title: 'Conversion Complete',
        message: `PDF saved to:\n${result.lastSavedPath}`
      });
    } else {
      showStatus('Failed to convert file', 'error');
    }
    return;
  }

  // Multiple files - show save mode modal
  const saveMode = await showSaveModeModal();

  if (saveMode === 'cancel') {
    return;
  }

  let result;
  if (saveMode === 'one-by-one') {
    showStatus(`Converting ${selectedFiles.length} file(s)...`, 'processing');
    convertBtn.disabled = true;
    result = await convertOneByOne();
  } else {
    // For batch mode, first ask for folder before showing "Converting..."
    const folderResult = await window.electron.selectOutputFolder();
    if (folderResult.canceled) {
      showStatus('', '');
      return;
    }

    showStatus(`Converting ${selectedFiles.length} file(s)...`, 'processing');
    convertBtn.disabled = true;
    result = await convertAllToFolderWithPath(folderResult.folderPath);
  }

  convertBtn.disabled = false;

  if (result.canceled) {
    showStatus('Conversion canceled', 'error');
    return;
  }

  // Update license status after conversions
  await updateLicenseStatus();

  // Show status
  if (result.successCount > 0 && result.failCount === 0) {
    showStatus(`Success! Converted ${result.successCount} file(s)`, 'success');
  } else if (result.successCount > 0 && result.failCount > 0) {
    showStatus(`Converted ${result.successCount} file(s), ${result.failCount} failed`, 'error');
  } else if (result.failCount > 0) {
    showStatus(`Failed to convert ${result.failCount} file(s)`, 'error');
    return;
  }

  // Show completion message
  if (result.successCount > 0) {
    const message = result.outputFolder
      ? `${result.successCount} PDF file(s) saved to:\n${result.outputFolder}`
      : `${result.successCount} PDF file(s) converted successfully.`;

    await window.electron.showMessage({
      type: 'info',
      title: 'Conversion Complete',
      message: message
    });
  }
});


// Show status message
function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
}

// ==================== LICENSE MANAGEMENT ====================

const licenseStatusDiv = document.getElementById('licenseStatus');
const licenseBadge = document.getElementById('licenseBadge');
const licenseInfo = document.getElementById('licenseInfo');
const licenseModal = document.getElementById('licenseModal');
const trialExpiredModal = document.getElementById('trialExpiredModal');
const licenseKeyInput = document.getElementById('licenseKeyInput');
const licenseError = document.getElementById('licenseError');
const activateLicenseBtn = document.getElementById('activateLicense');
const cancelLicenseBtn = document.getElementById('cancelLicense');
const enterLicenseKeyBtn = document.getElementById('enterLicenseKey');

// Update license status display
async function updateLicenseStatus() {
  try {
    licenseStatus = await window.electron.getLicenseStatus();

    if (licenseStatus.licensed) {
      licenseBadge.textContent = 'Licensed';
      licenseBadge.className = 'license-badge licensed';
      licenseInfo.textContent = 'Unlimited access';
    } else if (licenseStatus.trialExpired) {
      licenseBadge.textContent = 'Expired';
      licenseBadge.className = 'license-badge expired';
      licenseInfo.textContent = 'Click to activate';
    } else {
      licenseBadge.textContent = 'Trial';
      licenseBadge.className = 'license-badge trial';
      licenseInfo.textContent = `${licenseStatus.daysRemaining} days left`;
    }
  } catch (error) {
    console.error('Error getting license status:', error);
    licenseInfo.textContent = 'Error';
  }
}

// Show license modal
function showLicenseModal() {
  licenseModal.style.display = 'flex';
  licenseKeyInput.value = '';
  licenseError.textContent = '';
  licenseKeyInput.focus();
}

// Hide license modal
function hideLicenseModal() {
  licenseModal.style.display = 'none';
  licenseKeyInput.value = '';
  licenseError.textContent = '';
}

// Show trial expired modal
function showTrialExpiredModal() {
  trialExpiredModal.style.display = 'flex';
}

// Hide trial expired modal
function hideTrialExpiredModal() {
  trialExpiredModal.style.display = 'none';
}

// Format license key input (add dashes automatically)
licenseKeyInput.addEventListener('input', (e) => {
  let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

  // Add dashes after MDPDF and every 4 characters
  if (value.length > 5) {
    value = value.slice(0, 5) + '-' + value.slice(5);
  }
  if (value.length > 10) {
    value = value.slice(0, 10) + '-' + value.slice(10);
  }
  if (value.length > 15) {
    value = value.slice(0, 15) + '-' + value.slice(15);
  }
  if (value.length > 20) {
    value = value.slice(0, 20) + '-' + value.slice(20);
  }

  e.target.value = value.slice(0, 25); // MDPDF-XXXX-XXXX-XXXX-XXXX = 25 chars
});

// Activate license
activateLicenseBtn.addEventListener('click', async () => {
  const key = licenseKeyInput.value.trim();

  if (!key) {
    licenseError.textContent = 'Please enter a license key';
    return;
  }

  activateLicenseBtn.disabled = true;
  activateLicenseBtn.textContent = 'Activating...';

  try {
    const result = await window.electron.activateLicense(key);

    if (result.success) {
      hideLicenseModal();
      hideTrialExpiredModal();
      await updateLicenseStatus();
      await window.electron.showMessage({
        type: 'info',
        title: 'License Activated',
        message: 'Thank you! Your license has been activated successfully. You now have unlimited conversions.'
      });
    } else {
      licenseError.textContent = result.error || 'Invalid license key';
    }
  } catch (error) {
    licenseError.textContent = 'Error activating license. Please try again.';
    console.error('License activation error:', error);
  } finally {
    activateLicenseBtn.disabled = false;
    activateLicenseBtn.textContent = 'Activate';
  }
});

// Cancel license modal
cancelLicenseBtn.addEventListener('click', hideLicenseModal);

// Enter license key from trial expired modal
enterLicenseKeyBtn.addEventListener('click', () => {
  hideTrialExpiredModal();
  showLicenseModal();
});

// Click on license status to show modal
licenseStatusDiv.addEventListener('click', () => {
  if (licenseStatus && !licenseStatus.licensed) {
    showLicenseModal();
  }
});

// Check if user can convert (and show appropriate modal if not)
async function checkCanConvert() {
  const result = await window.electron.canConvert();

  if (!result.canConvert) {
    showTrialExpiredModal();
    return false;
  }

  return true;
}

// Initialize license status on load
document.addEventListener('DOMContentLoaded', async () => {
  await updateLicenseStatus();

  // If trial is expired, show the modal on startup
  if (licenseStatus && licenseStatus.trialExpired) {
    showTrialExpiredModal();
  }
});

// Call updateLicenseStatus immediately as well (for cases where DOMContentLoaded already fired)
updateLicenseStatus();
