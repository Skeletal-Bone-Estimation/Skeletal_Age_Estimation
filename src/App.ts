//App.ts
import {app, BrowserWindow} from 'electron';
import {createWindow} from './views/HomePageView'

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    //kills process when all windows are closed on windows/linux
    if (process.platform !== 'darwin') app.quit(); 
});

app.on('activate', () => {
    //opens a window on Mac if process is running but no windows are open
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})