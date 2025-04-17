// electron.d.ts
declare global {
    interface Window {
        electronAPI: {
            selectFolder: () => Promise<string | null>;
        };
    }
}

export {};
