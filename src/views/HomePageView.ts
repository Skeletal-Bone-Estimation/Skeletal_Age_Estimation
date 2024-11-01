//HomePageView.ts
import {BrowserWindow} from 'electron';
import * as path from 'path';

const indexHTML = path.join(__dirname, '../../templates/index.html')


function loadHomePage(mainWindow: BrowserWindow){
    mainWindow.loadFile(indexHTML);
}
export{
    loadHomePage
}