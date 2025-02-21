//started 2-12 finished 2-12
import { AbstractModal } from '../../../src/views/AbstractModal';
import { UI_Elements } from '../../../src/utils/enums';
//for integration tests
import { fireEvent, screen } from '@testing-library/dom';

//mock getElementById calls
const mockModalContainer = document.createElement('div');
mockModalContainer.style.display = 'none';
mockModalContainer.id = UI_Elements.modalContainer;

const mockModalContent = document.createElement('div');
mockModalContent.id = UI_Elements.modalContent;

const mockRootDiv = document.createElement('div');
mockRootDiv.id = 'rootDiv';

describe('AbstractModal', () => {
    let modal: AbstractModal;

    beforeEach(() => {
        //attack to doc body
        document.body.appendChild(mockModalContainer);
        document.body.appendChild(mockModalContent);
        document.body.appendChild(mockRootDiv);

        modal = new AbstractModal(document);
    });

    afterEach(() => {
        //clean dom after
        document.body.innerHTML = '';
    });

    //UNIT TESTS
    it('should open the modal (set display to flex)', () => {
        modal.openModal();
        expect(mockModalContainer.style.display).toBe('flex');
    });

    it('should close the modal (set display to none)', () => {
        (modal as any).closeModal(); // Access protected method
        expect(mockModalContainer.style.display).toBe('none');
    });

    //INTEGRATION TESTS
    it('should open the modal when triggered by a user action', () => {
        //simulate modal opening by button click
        const openButton = document.createElement('button');
        openButton.textContent = 'Open Modal';
        openButton.addEventListener('click', () => modal.openModal());
        document.body.appendChild(openButton);

        fireEvent.click(openButton);
        expect(mockModalContainer.style.display).toBe('flex');
    });

    it('should close the modal when triggered by a user action', () => {
        //simulate modal closing by button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close Modal';
        closeButton.addEventListener('click', () => (modal as any).closeModal());
        document.body.appendChild(closeButton);

        //open
        modal.openModal();
        expect(mockModalContainer.style.display).toBe('flex');

        //close
        fireEvent.click(closeButton);
        expect(mockModalContainer.style.display).toBe('none');
    });
});
