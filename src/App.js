//App.ts
import {app, BrowserWindow} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

//import {loadHomePage} from './views/HomePageView'

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 760;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        webPreferences: {
            preload: path.join(__dirname, 'Preload.js') 
        }
    });

    mainWindow.loadFile(path.join('./', 'templates', 'index.html'));
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