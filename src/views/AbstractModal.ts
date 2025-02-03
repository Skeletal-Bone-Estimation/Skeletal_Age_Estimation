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

    public openModal(): void {
        // Create a container div to hold the modal if it doesn't exist
        this.modalContainer.style.display = 'flex';
    }

    protected closeModal(): void {
        //close modal
        this.modalContainer.style.display = 'none';
    }
}
