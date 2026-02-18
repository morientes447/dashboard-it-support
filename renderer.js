const output = document.getElementById('output');

async function restartSpooler() {
  output.textContent = "Restarting spooler...";
  try {
    const result = await window.api.restartSpooler();
    output.textContent = result;
  } catch (err) {
    output.textContent = err;
  }
}

async function pingGateway() {
  output.textContent = "Checking gateway...";
  try {
    const result = await window.api.pingGateway();
    output.textContent = result;
  } catch (err) {
    output.textContent = err;
  }
}
