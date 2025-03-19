import { AbstractModal } from './AbstractModal';

export class GalleryModal extends AbstractModal {
    constructor(document: Document) {
        super(document);
        //if not in dom, create
        if (!document.getElementById('modalContainer')) {
            this.createModalElements(document);
        } else {
            this.modalContainer = document.getElementById(
                'modalContainer',
            ) as HTMLElement;
            this.modalContent = document.getElementById(
                'gallery-modalContent',
            ) as HTMLElement;
        }
        //jsut makes it so modal can be closed by clicking outside of the container
        this.modalContainer.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                this.closeModal();
            }
        });
    }

    private createModalElements(document: Document): void {
        //container div
        const container = document.createElement('div');
        container.id = 'modalContainer';
        container.className = 'gallery-modal'; 
        container.style.display = 'none';
        //content div
        const content = document.createElement('div');
        content.id = 'gallery-modalContent';
        content.className = 'modalContent';
        container.appendChild(content);

        document.body.appendChild(container);
        this.modalContainer = container;
        this.modalContent = content;
    }

    /**
     * opens the modal with a gallery of images.
     * @param title The title to display.
     * @param images Array of image source strings.
     */
    public openGallery(title: string, images: string[]): void {
        //clears just in case
        this.modalContent.innerHTML = '';

        //gives each gallery a heading
        const heading = document.createElement('h2');
        heading.innerText = title;
        this.modalContent.appendChild(heading);

        //container for images
        const imagesContainer = document.createElement('div');
        imagesContainer.style.display = 'flex';
        imagesContainer.style.flexWrap = 'wrap';
        imagesContainer.style.justifyContent = 'center';
        imagesContainer.style.gap = '10px';

        //adds each image
        images.forEach((imgStr) => {
            const imgElem = document.createElement('img');
            //check if missing prefix
            if (!imgStr.startsWith('data:')) {
                imgStr = 'data:image/jpeg;base64,' + imgStr;
            }
            imgElem.src = imgStr;
            imgElem.alt = title;
            imgElem.style.width = '150px';
            imgElem.style.height = '150px';
            imgElem.style.objectFit = 'cover';
            imagesContainer.appendChild(imgElem);
        });
        this.modalContent.appendChild(imagesContainer);

        //closing modal
        const closeButton = document.createElement('span');
        closeButton.className = 'gallery-modal-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => this.closeModal());
        this.modalContent.appendChild(closeButton);

        //opens the modal
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
