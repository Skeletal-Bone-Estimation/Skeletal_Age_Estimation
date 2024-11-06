export abstract class AbstractView {
    protected contentDiv: HTMLElement; //reference to content field of the rootDiv

    constructor(document : Document) {
        this.contentDiv = document.getElementById('rootDiv')!;
    }

    //default method to load content into the rootDiv
    public render(htmlContent: string): void {
        console.log('loaded from AbstractView');
        this.contentDiv.innerHTML = htmlContent;
    }
}