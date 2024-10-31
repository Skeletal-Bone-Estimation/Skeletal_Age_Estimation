//HomePageView.ts
import {BrowserWindow} from 'electron';
import * as path from 'path';

const DEFAULT_WIDTH: number = 1200;
const DEFAULT_HEIGHT: number = 760;
const indexHTML = path.join(__dirname, '../../templates/index.html')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadFile(indexHTML);
}

export{
    createWindow
}