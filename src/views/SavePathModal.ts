import { DataController } from '../controllers/DataController';
import { CaseElement } from '../utils/enums';
import { AbstractModal } from './AbstractModal';

export class SavePathModal extends AbstractModal {
    private savePath: string = '';

    constructor(document: Document) {
        super(document);
    }

    public override async render(htmlContent: string): Promise<void> {
        this.modalContent.innerHTML = htmlContent;
        document.getElementById('savePathHeader')!.style.color = '#c0392b';
        this.initEventListeners();
    }

    public displayPath(currentPath: string) {
        this.savePath = currentPath;
        document.getElementById('savePathModalMsg')!.innerHTML =
            `New Path: ${currentPath}`;
        document.getElementById('savePathHeader')!.style.color =
            'var(--div-color-2)';
        document.getElementById('savePathHeader')!.innerHTML = 'New Save Path';
        document.getElementById('acceptNewSavePath')!.style.display = 'flex';
        document.getElementById('acceptNewSavePath')!.innerHTML = 'Accept';
    }

    protected override initEventListeners(): void {
        document
            .getElementById('selectSavePathBtn')!
            .addEventListener('click', async () => {
                const newPath = await window.electronAPI.selectFolder();
                if (newPath) {
                    this.savePath = newPath;
                    document.getElementById('savePathModalMsg')!.innerHTML =
                        `New Path: ${this.savePath}`;
                    document.getElementById(
                        'acceptNewSavePath',
                    )!.style.display = 'flex';
                }
            });

        document
            .getElementById('acceptNewSavePath')!
            .addEventListener('click', () => {
                const dc = DataController.getInstance();
                dc.editCase(CaseElement.savePath, this.savePath);
                this.closeModal();
            });
    }
}
