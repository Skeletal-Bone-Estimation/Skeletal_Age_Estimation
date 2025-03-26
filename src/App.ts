// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

//App.ts
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';

const DEV: boolean = true;

const DEFAULT_WIDTH: number = 1200;
const DEFAULT_HEIGHT: number = 760;

let pythonServer: ChildProcessWithoutNullStreams;

function createWindow(): void {
    const mainWindow = new BrowserWindow({
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (DEV) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else mainWindow.loadFile('./templates/index.html');

    mainWindow.on('ready-to-show', () => mainWindow.show());
}

function startServer(): void {
    pythonServer = spawn('pipenv', ['run', 'python', 'server.py'], {
        cwd: './src/ml',
        shell: true,
    });

    pythonServer.stdout.on('data', (data) => {
        console.log(`Python server: ${data}`);
    });

    // pythonServer.stderr.on('data', (data) => {
    //     console.error(`Python server error: ${data}`);
    // });
}

function startup(): void {
    startServer(); //run server as a child process
    createWindow(); //show frontend
}

ipcMain.handle('dialog:openFolder', (): string | null => {
    const result: string[] | undefined = dialog.showOpenDialogSync({
        properties: ['openDirectory'],
    });

    if (!result || result.length === 0) {
        return null;
    }
    return result[0]; //return the selected folder path
});

app.on('ready', startup);

app.on('window-all-closed', () => {
    //kills process when all windows are closed on windows/linux
    if (process.platform !== 'darwin') app.quit();
    if (pythonServer) pythonServer.kill();
});

app.on('activate', () => {
    //opens a window on Mac if process is running but no windows are open
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('before-quit', () => {
    if (pythonServer) pythonServer.kill();
});
