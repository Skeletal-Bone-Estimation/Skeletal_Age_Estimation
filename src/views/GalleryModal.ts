import { AbstractModal } from './AbstractModal';
import { PageController } from '../controllers/PageController';
import { Modals, Observers } from '../utils/enums';
import { DataController } from '../controllers/DataController';
import { CaseModel } from '../models/CaseModel';

export class GalleryModal extends AbstractModal {
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
        //close by clickign outside
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
     * opens the modal gallery
     * @param title title of gallery
     * @param images string array
     */
    public openGallery(title: string, images: string[]): void {
        //clear
        this.modalContent.innerHTML = '';

        //heading
        const heading = document.createElement('h2');
        heading.innerText = title;
        heading.className = 'modalHeader';
        this.modalContent.appendChild(heading);

        //image container
        const imagesContainer = document.createElement('div');
        imagesContainer.style.display = 'flex';
        imagesContainer.style.flexWrap = 'wrap';
        imagesContainer.style.justifyContent = 'center';
        imagesContainer.style.gap = '10px';

        images.forEach((imgStr, index) => {
            //each image has a wrapper and delete btn
            const imgWrapper = document.createElement('div');
            imgWrapper.style.position = 'relative';

            const imgElem = document.createElement('img');
            //ensure prefix
            if (!imgStr.startsWith('data:')) {
                imgStr = 'data:image/jpeg;base64,' + imgStr;
            }
            imgElem.src = imgStr;
            imgElem.alt = title;
            imgElem.style.width = '150px';
            imgElem.style.height = '150px';
            imgElem.style.objectFit = 'cover';

            //clickign opens photomodal for picture
            imgElem.addEventListener('click', () => {
                PageController.getInstance().loadModal(Modals.Photo, '', {
                    image: imgStr,
                });
            });

            //delete btn
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.style.position = 'absolute';
            deleteButton.style.top = '5px';
            deleteButton.style.right = '5px';
            deleteButton.style.background = 'rgb(99, 21, 21)';
            deleteButton.style.color = '#fff';
            deleteButton.style.border = 'none';
            deleteButton.style.borderRadius = '50%';
            deleteButton.style.width = '24px';
            deleteButton.style.height = '24px';
            deleteButton.style.cursor = 'pointer';

            //trigger deletion
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteImageFromCase(title, index);
            });

            imgWrapper.appendChild(imgElem);
            imgWrapper.appendChild(deleteButton);
            imagesContainer.appendChild(imgWrapper);
        });
        this.modalContent.appendChild(imagesContainer);

        //btn panel
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'reportModalButtons'; //reuse from reportarchivemodal

        const closeButton = document.createElement('button');
        closeButton.id = 'closeModal';
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => this.closeModal());
        buttonContainer.appendChild(closeButton);

        this.modalContent.appendChild(buttonContainer);

        this.openModal();
    }

    /**
     * deletes an image from the current case model and re-renders the gallery
     * @param galleryTitle specific featyure gallery
     * @param index the index of the image to delete
     */
    private deleteImageFromCase(galleryTitle: string, index: number): void {
        const dc = DataController.getInstance();
        const currentCase = dc.loadedCases[
            dc.findCaseIndex(dc.openCaseID)
        ] as CaseModel;

        //determine array and delete at index
        if (galleryTitle === 'Auricular Images') {
            currentCase.auricularSurfaceImages.splice(index, 1);
        } else if (galleryTitle === 'Pubic Images') {
            currentCase.pubicSymphysisImages.splice(index, 1);
        } else if (galleryTitle === 'Sternal Images') {
            currentCase.fourthRibImages.splice(index, 1);
        } else if (galleryTitle === 'Molar Images') {
            currentCase.thirdMolarImages.splice(index, 1);
        }

        console.log('After deletion, case images:', {
            auricular: currentCase.auricularSurfaceImages,
            pubic: currentCase.pubicSymphysisImages,
            sternal: currentCase.fourthRibImages,
            molar: currentCase.thirdMolarImages,
        });

        //notify autosave observer
        //currentCase.notify(Observers.autosave);

        //reload gallery
        this.openGallery(
            galleryTitle,
            this.getUpdatedImagesArray(currentCase, galleryTitle),
        );

        // Log the state after re-rendering.
        console.log('openCaseID after deletion:', dc.openCaseID);
        console.log(
            'loadedCases length after deletion:',
            dc.loadedCases.length,
        );
    }

    /**
     * refresh gallery without deleted pic
     */
    private getUpdatedImagesArray(
        currentCase: CaseModel,
        galleryTitle: string,
    ): string[] {
        if (galleryTitle === 'Auricular Images') {
            return currentCase.auricularSurfaceImages;
        } else if (galleryTitle === 'Pubic Images') {
            return currentCase.pubicSymphysisImages;
        } else if (galleryTitle === 'Sternal Images') {
            return currentCase.fourthRibImages;
        } else if (galleryTitle === 'Molar Images') {
            return currentCase.thirdMolarImages;
        }
        return [];
    }

    public openModal(): void {
        this.modalContainer.style.display = 'flex';
    }

    public closeModal(): void {
        this.modalContainer.style.display = 'none';
        this.modalContent.innerHTML = '';
    }
}
