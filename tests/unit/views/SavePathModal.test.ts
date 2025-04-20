//NEW TEST SUITE NEEDED IN TEST SUITE WITH ERRORMODAL
/*Started April 16
Total Tests:3
Unit:3
Integration:
System?:
*/

// __tests__/SavePathModal.test.ts
import { SavePathModal } from '../../../src/views/SavePathModal';
import { DataController } from '../../../src/controllers/DataController';
import { CaseElement } from '../../../src/utils/enums';

describe('SavePathModal', () => {
  let modal: SavePathModal;
  let container: HTMLElement;
  let content: HTMLElement;
  let header: HTMLElement;
  let msg: HTMLElement;
  let selectBtn: HTMLElement;
  let acceptBtn: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modalContainer" style="display:flex"></div>
      <div id="modalContent"></div>
      <h1 id="savePathHeader"></h1>
      <p id="savePathModalMsg"></p>
      <button id="selectSavePathBtn"></button>
      <button id="acceptNewSavePath" style="display:none"></button>
    `;
    container = document.getElementById('modalContainer')!;
    content   = document.getElementById('modalContent')!;
    header    = document.getElementById('savePathHeader')!;
    msg       = document.getElementById('savePathModalMsg')!;
    selectBtn = document.getElementById('selectSavePathBtn')!;
    acceptBtn = document.getElementById('acceptNewSavePath')!;

    modal = new SavePathModal(document);
    // register the listeners (render would do this in reality)
    modal['initEventListeners']();
    // spy on closeModal
    jest.spyOn(modal as any, 'closeModal').mockImplementation(() => {
      container.style.display = 'none';
    });
  });

  test('displayPath updates the modal with new path and shows accept button', () => {
    modal.displayPath('/new/path');
    expect((modal as any).savePath).toBe('/new/path');
    expect(msg.innerHTML).toBe('New Path: /new/path');
    expect(header.style.color).toBe('var(--div-color-2)');
    expect(header.innerHTML).toBe('New Save Path');
    expect(acceptBtn.style.display).toBe('flex');
    expect(acceptBtn.innerHTML).toBe('Accept');
  });

  test('clicking selectSavePathBtn calls electronAPI.selectFolder and updates modal', async () => {
    (window as any).electronAPI = {
      selectFolder: jest.fn().mockResolvedValue('/selected/path'),
    };
    selectBtn.click();
    // allow promise to resolve
    await Promise.resolve();
    expect((modal as any).savePath).toBe('/selected/path');
    expect(msg.innerHTML).toBe('New Path: /selected/path');
    expect(acceptBtn.style.display).toBe('flex');
  });

  test('clicking acceptNewSavePath calls DataController.editCase and closes modal', () => {
    // pre‑set savePath
    (modal as any).savePath = '/accepted/path';
    const editSpy = jest.spyOn(DataController.getInstance(), 'editCase');
    acceptBtn.click();
    expect(editSpy).toHaveBeenCalledWith(CaseElement.savePath, '/accepted/path');
    expect(container.style.display).toBe('none');
    expect((modal as any).closeModal).toHaveBeenCalled();
  });
});
