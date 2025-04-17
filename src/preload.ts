// preload.ts
const { ipcRenderer } = require('electron');

window.electronAPI = {
    selectFolder: () => ipcRenderer.invoke('dialog:openFolder'),
};
