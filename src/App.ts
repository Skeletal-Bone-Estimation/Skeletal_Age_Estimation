//App.ts
import {app, BrowserWindow} from 'electron';

const DEFAULT_WIDTH: number = 1200;
const DEFAULT_HEIGHT: number = 760;

function createWindow(): void {
    const mainWindow = new BrowserWindow({
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        webPreferences: {
            preload: __dirname + '\\preload.js',
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('./templates/index.html');
    mainWindow.on('ready-to-show', () => mainWindow.show());

    mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    //kills process when all windows are closed on windows/linux
    if (process.platform !== 'darwin') app.quit(); 
});

app.on('activate', () => {
    //opens a window on Mac if process is running but no windows are open
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
});