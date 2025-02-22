// AbstractView.test.ts
import { AbstractView } from '../../../src/views/AbstractView';

class ConcreteView extends AbstractView {
  constructor(document: Document) {
    super(document); // Initialize contentDiv from document.getElementById('rootDiv')
  }
}

describe('AbstractView (via ConcreteView)', () => {
  let mockRootDiv: HTMLElement;
  let concreteView: ConcreteView;

  beforeEach(() => {
    // Create a mock rootDiv element
    mockRootDiv = document.createElement('div');
    mockRootDiv.id = 'rootDiv';
    document.body.appendChild(mockRootDiv);

    // Create an instance of ConcreteView using the real document
    concreteView = new ConcreteView(document);
  });

  afterEach(() => {
    // Clean up: remove the mock rootDiv and restore mocks
    document.body.removeChild(mockRootDiv);
    jest.restoreAllMocks();
  });

  it('should update the innerHTML of the rootDiv when render is called', () => {
    const htmlContent = '<p>Hello, World!</p>';
    concreteView.render(htmlContent);
    expect(mockRootDiv.innerHTML).toBe(htmlContent);
  });

  it('should set up sidebar listeners without throwing an error', () => {
    expect(() => {
      // Cast concreteView as any to access the protected method
      (concreteView as any).setSidebarListeners();
    }).not.toThrow();
  });
});
