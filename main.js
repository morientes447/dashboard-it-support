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

    exec('ipconfig', (error, stdout) => {
      if (error) return reject(error);

      const match = stdout.match(/Default Gateway[ .:]*([\d.]+)/);
      if (!match) return reject("Gateway tidak ditemukan");

      const gateway = match[1];

      exec(`ping ${gateway} -n 4`, (err, pingOutput) => {
        if (err) return reject(err);

        // Ambil nilai Average
        const avgMatch = pingOutput.match(/Average = (\d+)ms/);

        if (!avgMatch) return resolve("Tidak bisa membaca latency.\n\n" + pingOutput);

        const avgLatency = parseInt(avgMatch[1]);

        let status = "";

        if (avgLatency <= 10) {
          status = "🟢 LATENCY KECIL (Normal)";
        } else if (avgLatency <= 50) {
          status = "🟡 LATENCY SEDANG";
        } else {
          status = "🔴 LATENCY BESAR (Possible Network Issue)";
        }

        resolve(
          `Gateway: ${gateway}\n` +
          `Average Latency: ${avgLatency} ms\n` +
          `Status: ${status}\n\n` +
          pingOutput
        );
      });

    });

  });
});
