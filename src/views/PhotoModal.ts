import { AbstractModal } from './AbstractModal';

export class PhotoModal extends AbstractModal {
    constructor(document: Document) {
        super(document);

        if (!document.getElementById('modalContainer')) {
            this.createModalElements(document);
        } else {
            this.modalContainer = document.getElementById(
                'modalContainer',
            ) as HTMLElement;
            this.modalContent = document.getElementById(
                'modalContent',
            ) as HTMLElement;
        }
        //close by clicking outsdie
        this.modalContainer.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                this.closeModal();
            }
        });
    }

    private createModalElements(document: Document): void {
        const container = document.createElement('div');
        container.id = 'modalContainer';
        container.className = 'modal';
        container.style.display = 'none';

        const content = document.createElement('div');
        content.id = 'modalContent';
        container.appendChild(content);

        document.body.appendChild(container);
        this.modalContainer = container;
        this.modalContent = content;
    }

    /**
     * opens the selected image in its own modal
     * @param image the base64 image string
     */
    public openPhoto(image: string): void {
        //clear
        this.modalContent.innerHTML = '';

        //create and configure
        const imgElem = document.createElement('img');
        //make sure it has prefix
        if (!image.startsWith('data:')) {
            image = 'data:image/jpeg;base64,' + image;
        }
        imgElem.src = image;
        imgElem.alt = 'Photo';
        // max size
        imgElem.style.maxWidth = '80vw';
        imgElem.style.maxHeight = '80vh';
        imgElem.style.display = 'block';
        imgElem.style.margin = '0 auto';
        this.modalContent.appendChild(imgElem);

        //close btn
        const closeButton = document.createElement('button');
        closeButton.id = 'closeModal';
        closeButton.textContent = 'Close';

        closeButton.addEventListener('click', () => this.closeModal());
        this.modalContent.appendChild(closeButton);

        this.openModal();
    }

    public openModal(): void {
        this.modalContainer.style.display = 'flex';
    }

    public closeModal(): void {
        this.modalContainer.style.display = 'none';
        this.modalContent.innerHTML = '';
    }
}
