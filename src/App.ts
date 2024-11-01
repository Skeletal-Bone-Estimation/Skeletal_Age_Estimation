//App.ts
import {app, BrowserWindow} from 'electron';
import {loadHomePage} from './views/HomePageView'

const DEFAULT_WIDTH: number = 1200;
const DEFAULT_HEIGHT: number = 760;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    loadHomePage(mainWindow);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    //kills process when all windows are closed on windows/linux
    if (process.platform !== 'darwin') app.quit(); 
});

app.on('activate', () => {
    //opens a window on Mac if process is running but no windows are open
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})