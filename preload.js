const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  restartSpooler: () => ipcRenderer.invoke('restart-spooler'),
  pingGateway: () => ipcRenderer.invoke('ping-gateway')
});
