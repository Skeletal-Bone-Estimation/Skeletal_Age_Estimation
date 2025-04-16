import { PageController } from '../controllers/PageController';
import { UI_Elements } from '../utils/enums';
import { AbstractModal } from './AbstractModal';

export class ErrorModal extends AbstractModal {
    constructor(document: Document) {
        super(document);
    }

    public override async render(htmlContent: string): Promise<void> {
        this.modalContent.innerHTML = '';
        this.modalContent.innerHTML = htmlContent;
        this.initEventListeners();
    }

    public displayError(errorMessage: string): void {
        (document.getElementById('errorModalMsg') as HTMLElement).innerHTML =
            errorMessage;
    }

    protected override initEventListeners(): void {
        document
            .getElementById(UI_Elements.closeErrorModal)
            ?.addEventListener('click', () => {
                this.closeModal();
            });
    }
}
