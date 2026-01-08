const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  checkPandoc: () => ipcRenderer.invoke('check-pandoc'),
  convertToPDF: (data) => ipcRenderer.invoke('convert-to-pdf', data),
  convertToPDFBatch: (data) => ipcRenderer.invoke('convert-to-pdf-batch', data),
  convertTextToPDF: (data) => ipcRenderer.invoke('convert-text-to-pdf', data),
  selectCSS: () => ipcRenderer.invoke('select-css'),
  selectMarkdown: () => ipcRenderer.invoke('select-markdown'),
  selectOutputFolder: () => ipcRenderer.invoke('select-output-folder'),
  generatePreview: (data) => ipcRenderer.invoke('generate-preview', data),
  generatePreviewFromText: (data) => ipcRenderer.invoke('generate-preview-from-text', data),
  readFile: (filePath) => ipcRenderer.invoke('read-file', { filePath }),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', { filePath, content }),
  showMessage: (data) => ipcRenderer.invoke('show-message', data),

  // License management
  getLicenseStatus: () => ipcRenderer.invoke('get-license-status'),
  activateLicense: (licenseKey) => ipcRenderer.invoke('activate-license', { licenseKey }),
  recordConversion: () => ipcRenderer.invoke('record-conversion'),
  canConvert: () => ipcRenderer.invoke('can-convert'),
  deactivateLicense: () => ipcRenderer.invoke('deactivate-license'),
  resetTrial: () => ipcRenderer.invoke('reset-trial'),
  generateLicenseKey: () => ipcRenderer.invoke('generate-license-key')
});
