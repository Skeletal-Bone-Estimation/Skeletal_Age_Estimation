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
        this.initEventListeners();
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
