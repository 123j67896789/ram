const frame = document.getElementById('webFrame');
const urlInput = document.getElementById('urlInput');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const refreshBtn = document.getElementById('refreshBtn');
const goBtn = document.getElementById('goBtn');

const proxyInput = document.getElementById('proxyInput');
const applyProxyBtn = document.getElementById('applyProxyBtn');
const proxyStatus = document.getElementById('proxyStatus');

const historyStack = ['https://example.com'];
let historyIndex = 0;

function normalizeUrl(value) {
  if (!value) return 'https://example.com';
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function openUrl(value, pushHistory = true) {
  const target = normalizeUrl(value);
  frame.src = target;
  urlInput.value = target;

  if (pushHistory) {
    historyStack.splice(historyIndex + 1);
    historyStack.push(target);
    historyIndex = historyStack.length - 1;
  }
}

goBtn.addEventListener('click', () => openUrl(urlInput.value));

urlInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    openUrl(urlInput.value);
  }
});

backBtn.addEventListener('click', () => {
  if (historyIndex > 0) {
    historyIndex -= 1;
    openUrl(historyStack[historyIndex], false);
  }
});

forwardBtn.addEventListener('click', () => {
  if (historyIndex < historyStack.length - 1) {
    historyIndex += 1;
    openUrl(historyStack[historyIndex], false);
  }
});

refreshBtn.addEventListener('click', () => {
  frame.src = historyStack[historyIndex];
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'l') {
    event.preventDefault();
    urlInput.focus();
    urlInput.select();
  }
});

async function bootProxyState() {
  const proxyState = await window.carbon.getProxyConfig();
  proxyStatus.textContent = `Proxy: ${proxyState}`;
}

applyProxyBtn.addEventListener('click', async () => {
  const rule = proxyInput.value.trim() || 'direct://';
  await window.carbon.setProxyConfig(rule);
  proxyStatus.textContent = `Proxy: ${rule}`;
});

window.carbon.onProxyChanged((rule) => {
  proxyStatus.textContent = `Proxy: ${rule}`;
});

bootProxyState();
