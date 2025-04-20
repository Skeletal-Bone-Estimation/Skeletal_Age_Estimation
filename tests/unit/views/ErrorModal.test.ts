
//NEW TEST SUITE NEEDED - COMBINED WITH SAVEPATHMODAL
/*Started April 16
Total Tests: 3
Unit: 3
Integration:
System?:
*/


// tests/unit/views/ErrorModal.test.ts

import { ErrorModal } from '../../../src/views/ErrorModal';
import { UI_Elements } from '../../../src/utils/enums';

describe('ErrorModal', () => {
  let modal: ErrorModal;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="${UI_Elements.modalContainer}" style="display:none">
        <div id="${UI_Elements.modalContent}"></div>
      </div>
      <div id="errorModalMsg"></div>
      <button id="${UI_Elements.closeErrorModal}"></button>
    `;
    modal = new ErrorModal(document);
  });

  it('opens and then closes the modal container', async () => {
    const container = document.getElementById(UI_Elements.modalContainer) as HTMLElement;

    // Open the modal and verify it is displayed
    await modal.openModal();
    expect(container.style.display).toBe('flex');

    // Click the close button and verify the modal is hidden
    document.getElementById(UI_Elements.closeErrorModal)!.click();
    expect(container.style.display).toBe('none');
  });

  it('render(htmlContent) injects HTML into modalContent', async () => {
    const html = '<p>Error occurred</p>';
    await modal.render(html);
    const content = document.getElementById(UI_Elements.modalContent)!;
    expect(content.innerHTML).toBe(html);
  });

  it('displayError updates the error message element', () => {
    modal.displayError('Fatal error');
    const msg = document.getElementById('errorModalMsg')!;
    expect(msg.innerHTML).toBe('Fatal error');
  });
});
