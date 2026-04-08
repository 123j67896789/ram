const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('carbon', {
  getProxyConfig: () => ipcRenderer.invoke('proxy:get'),
  setProxyConfig: (proxyRules) => ipcRenderer.invoke('proxy:set', proxyRules),
  onProxyChanged: (handler) => {
    const listener = (_event, value) => handler(value);
    ipcRenderer.on('proxy:changed', listener);
    return () => ipcRenderer.removeListener('proxy:changed', listener);
  }
});
