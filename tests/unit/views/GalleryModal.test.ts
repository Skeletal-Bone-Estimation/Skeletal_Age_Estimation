//NEW TEST SUITE NEEDED
/*Started April 16
Total Tests:3
Unit:3
Integration:
System?:
*/

// __tests__/GalleryModal.test.ts
import { GalleryModal } from '../../../src/views/GalleryModal';
import { PageController } from '../../../src/controllers/PageController';

describe('GalleryModal', () => {
  let modal: GalleryModal;
  let container: HTMLElement;
  let content: HTMLElement;

  beforeEach(() => {
    // start with no modalContainer in DOM
    document.body.innerHTML = `<div id="other"></div>`;
    modal = new GalleryModal(document);

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

  test('openGallery renders title, images, close button, and opens modal', () => {
    // spy on openModal to ensure it's called
    const openSpy = jest.spyOn(modal, 'openModal');
    modal.openGallery('My Gallery', ['AAA', 'data:BBB']);

    // image wrappers
    const imgs = content.querySelectorAll('img');
    expect(imgs).toHaveLength(2);
    // first one prefixed
    expect(imgs[0].src).toMatch(/^data:image\/jpeg;base64,AAA/);
    // second left intact
    expect(imgs[1].src).toBe('data:BBB');

    // close button present
    const closeBtn = content.querySelector('button#closeModal')!;
    expect(closeBtn.textContent).toBe('Close');

    // modal opened
    expect(openSpy).toHaveBeenCalled();
    expect(container.style.display).toBe('flex');
  });

  test('openModal shows and closeModal hides & clears content', () => {
    // populate content to test clearing
    content.innerHTML = '<p>x</p>';
    modal.openModal();
    expect(container.style.display).toBe('flex');

    modal.closeModal();
    expect(container.style.display).toBe('none');
    expect(content.innerHTML).toBe('');
  });
});
