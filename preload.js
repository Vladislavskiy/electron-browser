const { channel } = require('diagnostics_channel');
const {contextBridge, ipcRenderer} = require('electron');
const os = require('os');

contextBridge.exposeInMainWorld('electron', {
    homeDir: () => os.homedir(),
    kek: (e) => console.log(e),
})

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(args)),
})