const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let view;

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Electron',
        width: 1000,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js'),
        }
    });

    mainWindow.webContents.openDevTools();
    
    view = new BrowserView({
        webPreferences: {
            webviewTag: true,
            preload: path.join(__dirname, './browserViewPreload.js'),
        }
    });

    view.webContents.openDevTools();
    
    mainWindow.setBrowserView(view);
    view.setBounds({ x: 0, y: 50, width: 500, height: 300 });
    view.setAutoResize({
        // width: true,
        // height: true,
        horizontal: true,
        // vertical: true,
    })
    // view.webContents.loadURL('https://google.com');

    const startUrl = url.format({
        pathname: path.join(__dirname, './app/build/index.html'),
        protocol: 'file',
    })

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);

ipcMain.on('loadURL', (event, url) => {
    console.log(url);
    view.webContents.loadURL(url);
});

ipcMain.on('selection', (event, selection) => {
    console.log(selection);
})