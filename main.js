const path = require('path');
const { app, BrowserWindow, ipcMain, session, shell } = require('electron');

const DEFAULT_PROXY = process.env.CARBON_PROXY_RULE || 'direct://';

function buildWindow() {
  const win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 980,
    minHeight: 680,
    backgroundColor: '#090909',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: false,
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  return win;
}

async function applyPrivacyDefaults() {
  app.commandLine.appendSwitch('disable-background-networking');
  app.commandLine.appendSwitch('disable-sync');
  app.commandLine.appendSwitch('disable-features', 'AutofillServerCommunication,OptimizationGuideModelDownloading');
  app.commandLine.appendSwitch('force-webrtc-ip-handling-policy', 'disable_non_proxied_udp');

  const ses = session.defaultSession;
  ses.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
  ses.setPermissionCheckHandler(() => false);

  await ses.clearAuthCache();
  await ses.clearHostResolverCache();
  await ses.setProxy({ proxyRules: DEFAULT_PROXY, proxyBypassRules: '<-loopback>' });
}

app.whenReady().then(async () => {
  await applyPrivacyDefaults();
  const win = buildWindow();

  ipcMain.handle('proxy:get', async () => {
    const cfg = await session.defaultSession.resolveProxy('https://example.com');
    return cfg;
  });

  ipcMain.handle('proxy:set', async (_event, proxyRules) => {
    await session.defaultSession.setProxy({
      proxyRules: proxyRules || 'direct://',
      proxyBypassRules: '<-loopback>'
    });

    if (win && !win.isDestroyed()) {
      win.webContents.send('proxy:changed', proxyRules || 'direct://');
    }

    return true;
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      buildWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
