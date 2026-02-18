const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + '/preload.js'
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Restart Spooler
ipcMain.handle('restart-spooler', async () => {
  return new Promise((resolve, reject) => {
    exec('net stop spooler && net start spooler', (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
});

// Ping Gateway
ipcMain.handle('ping-gateway', async () => {
  return new Promise((resolve, reject) => {
    exec('ipconfig | findstr /i "Default Gateway"', (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
});
