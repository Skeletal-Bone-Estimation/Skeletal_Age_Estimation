export abstract class AbstractView {
    protected contentDiv: HTMLElement; //reference to content field of the rootDiv

    constructor(document: Document) {
        this.contentDiv = document.getElementById('rootDiv')!;
    }

    // Default method to load content into the rootDiv
    public render(htmlContent: string): void {
        //console.log('loaded from AbstractView');
        this.contentDiv.innerHTML = htmlContent;
    }

    public setSidebarListeners(): void {}
}

// Create a concrete subclass for testing purposes
class ConcreteView extends AbstractView {
    constructor(document: Document) {
        super(document); // Call the parent constructor
    }
}
