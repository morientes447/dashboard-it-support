const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  restartSpooler: () => ipcRenderer.invoke('restart-spooler'),
  pingGateway: () => ipcRenderer.invoke('ping-gateway')
});

contextBridge.exposeInMainWorld("electronAPI", {

  restartSpooler: () => ipcRenderer.invoke("restartSpooler"),

  clearPrintQueue: () => ipcRenderer.invoke("clearPrintQueue"),

  openPrinters: () => ipcRenderer.invoke("openPrinters")

});
