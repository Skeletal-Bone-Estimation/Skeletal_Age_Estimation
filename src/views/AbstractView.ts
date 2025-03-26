// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

export abstract class AbstractView {
    public contentDiv: HTMLElement; // Reference to content field of the rootDiv
    // public for now for testing

    constructor(document: Document) {
        this.contentDiv = document.getElementById('rootDiv')!; // Get the rootDiv element from the DOM
    }

    /**
     * Default method to load content into the rootDiv.
     * @param htmlContent The HTML content to render.
     */
    public render(htmlContent: string): void {
        //console.log('loaded from AbstractView');
        this.contentDiv.innerHTML = htmlContent; // Set the innerHTML of the contentDiv
    }

    /**
     * Initialize event listeners.
     * This method can be overridden by subclasses.
     */
    protected initEventListeners(): void {}

    /**
     * Placeholder method for setting sidebar listeners.
     * This method can be overridden by subclasses.
     */
    protected setSidebarListeners(): void {
        // Placeholder method for setting sidebar listeners, can be overridden
    }
}

// Create a concrete subclass for testing purposes
class ConcreteView extends AbstractView {
    constructor(document: Document) {
        super(document); // Call the parent constructor to initialize contentDiv
    }

    // You can override render if you need specialized rendering for this concrete class
    public render(htmlContent: string): void {
        super.render(htmlContent); // Use the base class render method or extend it
    }
}

export { ConcreteView };
