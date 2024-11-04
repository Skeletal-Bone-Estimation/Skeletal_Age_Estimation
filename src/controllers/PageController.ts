// src/controllers/PageController.ts
import * as fs from 'fs';
import * as path from 'path';

export class PageController {
    private contentDiv: HTMLElement;

    constructor() {
        this.contentDiv = document.getElementById('rootDiv')!;
        this.initEventListeners();
    }

    private initEventListeners(): void {
        document.getElementById('homeBtn')!.addEventListener('click', () => this.loadPage('home'));
        document.getElementById('createBtn')!.addEventListener('click', () => this.loadPage('create'));
    }

    private async loadPageContent(page: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, '../../templates/', `${page}.html`);
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    public async loadPage(page: string): Promise<void> {
        try {
            const content = await this.loadPageContent(page);
            this.contentDiv.innerHTML = content;
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }
}
