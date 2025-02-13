//started 2-12 finished 2-12

import { AbstractModal } from '../../../src/views/AbstractModal';
import { UI_Elements } from '../../../src/utils/enums';

//mock getElementbyId calls
const mockModalContainer = { style: { display: 'none' } } as HTMLElement;
const mockModalContent = {} as HTMLElement;
const mockRootDiv = {} as HTMLElement; // Needed for AbstractView

describe('AbstractModal', () => {
    let modal: AbstractModal;

    beforeEach(() => {
        //mock getElementnyId
        document.getElementById = jest.fn((id) => {
            if (id === UI_Elements.modalContainer) return mockModalContainer;
            if (id === UI_Elements.modalContent) return mockModalContent;
            if (id === 'rootDiv') return mockRootDiv; // For AbstractView
            return null;
        });

        modal = new AbstractModal(document);
    });

    it('should open the modal (set display to flex)', () => {
        modal.openModal();
        expect(mockModalContainer.style.display).toBe('flex');
    });

    it('should close the modal (set display to none)', () => {
        //becasue its protected
        (modal as any).closeModal(); 
        expect(mockModalContainer.style.display).toBe('none');
    });
});
