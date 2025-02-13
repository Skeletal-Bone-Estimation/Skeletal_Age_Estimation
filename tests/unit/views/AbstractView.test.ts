import { AbstractView } from '../../../src/views/AbstractView';

class ConcreteView extends AbstractView {
    constructor(document: Document) {
        super(document); // Call the parent constructor
    }
}

describe('AbstractView (via ConcreteView)', () => {
    let mockRootDiv: HTMLElement;
    let concreteView: ConcreteView;

    beforeEach(() => {
        // Create and mock rootDiv in the DOM
        mockRootDiv = document.createElement('div');
        mockRootDiv.id = 'rootDiv';
        document.body.appendChild(mockRootDiv); // Append to the document body

        // Ensure `document.getElementById` returns the correct element
        jest.spyOn(document, 'getElementById').mockImplementation((id: string) => {
            if (id === 'rootDiv') return mockRootDiv;
            return null;
        });

        // Create an instance of ConcreteView with the real document
        concreteView = new ConcreteView(document);
    });

    afterEach(() => {
        // Clean up after each test
        document.body.removeChild(mockRootDiv);
        jest.restoreAllMocks(); // Reset any mocks
    });

    it('should initialize contentDiv to reference rootDiv', () => {
        expect(concreteView.contentDiv).toBe(mockRootDiv);
    });

    it('should update the innerHTML of the rootDiv when render is called', () => {
        // Define the HTML content to render
        const htmlContent = '<p>Hello, World!</p>';

        // Call the render method
        concreteView.render(htmlContent);

        // Assert that the innerHTML of rootDiv is updated
        expect(mockRootDiv.innerHTML).toBe(htmlContent);
    });

    it('should call the placeholder method setSidebarListeners without errors', () => {
        expect(() => {
            (concreteView as any).setSidebarListeners();
        }).not.toThrow();
    });

    it('should call the placeholder method initEventListeners without errors', () => {
        expect(() => {
            (concreteView as any).initEventListeners();
        }).not.toThrow();
    });
});
