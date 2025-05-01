// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

//App.ts
import { app, BrowserWindow, ipcMain, dialog, screen } from 'electron';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const DEV: boolean = false;

const DEFAULT_WIDTH: number = 1200;
const DEFAULT_HEIGHT: number = 760;

let pythonServer: ChildProcessWithoutNullStreams;

function createWindow(): void {
    const { width, height } = screen.getPrimaryDisplay()?.workAreaSize || {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    };

    const windowWidth = Math.floor(width * 0.7);
    const windowHeight = Math.floor(height * 0.7);

    const mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('./index.html');
    mainWindow.setMenu(null); //uncomment to remove menu bar
    mainWindow.on('ready-to-show', () => mainWindow.show());
}

function startServer(): void {
    const exe = 'server.exe';
    const exePath = app.isPackaged
        ? path.join(process.resourcesPath, exe)
        : path.resolve(__dirname, 'src', 'ml', 'dist', exe);

    console.log('🔍 Looking for server.exe at:', exe);
    if (!fs.existsSync(exe)) {
        console.error('Cannot find server.exe at', exe);
        return;
    }

    if (DEV) {
        pythonServer = spawn('pipenv', ['run', 'python', 'server.py'], {
            cwd: './src/ml',
            shell: true,
        });
    } else {
        pythonServer = spawn(exe, [], {
            cwd: path.dirname(exe),
            windowsHide: false,
            env: {
                ...process.env,
            },
        });
    }

    pythonServer.on('spawn', () => {
        console.log('server.exe spawned, PID=', pythonServer!.pid);
    });

    pythonServer.on('error', (err) => {
        console.error('Failed to launch server.exe:', err);
        dialog.showErrorBox('Server Launch Error', err.message);
    });

    pythonServer.on('exit', (code, signal) => {
        if (code !== 0) {
            const msg = `server.exe exited early with code=${code} signal=${signal}`;
            console.error(msg);
            dialog.showErrorBox('Server Crashed', msg);
        }
    });

    pythonServer.stdout.on('data', (data) =>
        console.log(`PY ▶ ${data.toString().trim()}`),
    );

    pythonServer.stderr.on('data', (data) =>
        console.error(`PY ✖ ${data.toString().trim()}`),
    );
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
