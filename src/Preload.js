// preload.ts
import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
    getDocument: () => document
});
