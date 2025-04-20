//NEW TEST SUITE NEEDED
/*Started April 16
Total Tests:
Unit:
Integration:
System?:
*/

// __tests__/PhotoModal.test.ts
import { PhotoModal } from '../../../src/views/PhotoModal';

describe('PhotoModal', () => {
  let modal: PhotoModal;
  let container: HTMLElement;
  let content: HTMLElement;

  beforeEach(() => {
    // start with no modalContainer in DOM
    document.body.innerHTML = `<div id="other"></div>`;
    modal = new PhotoModal(document);

    container = document.getElementById('modalContainer')!;
    content   = document.getElementById('modalContent')!;
  });

  test('constructor creates modalContainer and modalContent when absent', () => {
    expect(container).toBeInstanceOf(HTMLElement);
    expect(container.id).toBe('modalContainer');
    expect(container.className).toBe('modal');
    expect(container.style.display).toBe('none');

    expect(content).toBeInstanceOf(HTMLElement);
    expect(content.id).toBe('modalContent');
  });

  test('openPhoto prefixes image without data:, renders img and close button, and opens modal', () => {
    modal.openPhoto('ABC');

    // image element
    const img = content.querySelector('img')!;
    expect(img.src).toMatch(/^data:image\/jpeg;base64,ABC/);
    expect(img.alt).toBe('Photo');
    expect(img.style.maxWidth).toBe('90vw');
    expect(img.style.margin).toBe('0 auto');

    // close button
    const button = content.querySelector('button#closeModal')!;
    expect(button.textContent).toBe('Close');

    // modal opened
    expect(container.style.display).toBe('flex');
  });

  test('closeModal hides modal and clears content', () => {
    // simulate open state with content
    content.innerHTML = '<p>x</p>';
    modal.openModal();
    expect(container.style.display).toBe('flex');

    modal.closeModal();
    expect(container.style.display).toBe('none');
    expect(content.innerHTML).toBe('');
  });
});
