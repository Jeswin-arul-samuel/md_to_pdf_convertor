const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  checkPandoc: () => ipcRenderer.invoke('check-pandoc'),
  convertToPDF: (data) => ipcRenderer.invoke('convert-to-pdf', data),
  convertToPDFBatch: (data) => ipcRenderer.invoke('convert-to-pdf-batch', data),
  selectCSS: () => ipcRenderer.invoke('select-css'),
  selectMarkdown: () => ipcRenderer.invoke('select-markdown'),
  selectOutputFolder: () => ipcRenderer.invoke('select-output-folder'),
  generatePreview: (data) => ipcRenderer.invoke('generate-preview', data),
  showMessage: (data) => ipcRenderer.invoke('show-message', data)
});
