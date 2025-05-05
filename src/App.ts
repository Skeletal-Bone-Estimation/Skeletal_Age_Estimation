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

    mainWindow.loadFile('./index.html');
    mainWindow.setMenu(null);
    mainWindow.on('ready-to-show', () => mainWindow.show());
}

function startServer(): void {
    if (DEV) {
        pythonServer = spawn('pipenv', ['run', 'python', 'server.py'], {
            cwd: path.join(__dirname, 'src', 'ml'),
            shell: true,
        });
    } else {
        const exe = process.platform === 'win32' ? 'server.exe' : 'server';
        const exePath = app.isPackaged
            ? path.join(process.resourcesPath, exe)
            : path.resolve(__dirname, 'src', 'ml', 'dist', exe);

        console.log('Looking for server at:', exePath);
        if (!fs.existsSync(exePath)) {
            console.error('Cannot find server at', exePath);
            return;
        }

        pythonServer = spawn(exePath, [], {
            cwd: path.dirname(exePath),
            detached: process.platform !== 'win32',
            windowsHide: true,
            env: { ...process.env },
        });
    }

    const logPath = path.join(app.getPath('userData'), 'server.log');
    const logStream = fs.createWriteStream(logPath, { flags: 'a' });
    pythonServer.stdout.pipe(logStream);
    pythonServer.stderr.pipe(logStream);

    pythonServer.on('spawn', () => {
        if (pythonServer && pythonServer.pid)
            console.log('Server process started with PID:', pythonServer.pid);
    });

    pythonServer.on('error', (err) => {
        console.error('Failed to start server process:', err);
    });

    pythonServer.on('exit', (code, signal) => {
        console.error(`Server process exited: code=${code}, signal=${signal}`);
    });
}

function startup(): void {
    startServer();
    createWindow();
}

ipcMain.handle('dialog:openFolder', (): string | null => {
    const result: string[] | undefined = dialog.showOpenDialogSync({
        properties: ['openDirectory'],
    });

    if (!result || result.length === 0) {
        return null;
    }
    return result[0];
});

app.on('ready', startup);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
    if (pythonServer) pythonServer.kill();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('before-quit', () => {
    if (pythonServer) pythonServer.kill();
});

process.on('SIGINT', () => {
    if (pythonServer) pythonServer.kill();
    process.exit();
});

process.on('SIGTERM', () => {
    if (pythonServer) pythonServer.kill();
    process.exit();
});
