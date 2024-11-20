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
        
        // Create an instance of ConcreteView with the real document
        concreteView = new ConcreteView(document);
    });

    afterEach(() => {
        // Clean up after each test
        document.body.removeChild(mockRootDiv);
    });

    it('should update the innerHTML of the rootDiv when render is called', () => {
        // Define the HTML content to render
        const htmlContent = '<p>Hello, World!</p>';
        
        // Call the render method
        concreteView.render(htmlContent);
        
        // Assert that the innerHTML of rootDiv is updated
        expect(mockRootDiv.innerHTML).toBe(htmlContent);
    });

    it('should set up the sidebar listeners (empty method)', () => {
        // Just call the method, it doesn't do anything in this case, but we check it doesn't throw errors
        expect(() => {
            concreteView.setSidebarListeners();
        }).not.toThrow();
    });
});
