import { UI_Elements } from '../utils/enums';
import { AbstractView } from './AbstractView';
import { ModalIF } from './ModalIF';

export class AbstractModal extends AbstractView implements ModalIF {
    protected modalContainer: HTMLElement;
    protected modalContent: HTMLElement;

    constructor(document: Document) {
        super(document);
        this.modalContainer = document.getElementById(
            UI_Elements.modalContainer,
        ) as HTMLElement;
        this.modalContent = document.getElementById(
            UI_Elements.modalContent,
        ) as HTMLElement;
    }

    /**
     * Open the modal by displaying the modal container.
     */
    public openModal(): void {
        this.modalContainer.style.display = 'flex';
    }

    /**
     * Close the modal by hiding the modal container.
     */
    protected closeModal(): void {
        this.modalContainer.style.display = 'none';
    }
}
