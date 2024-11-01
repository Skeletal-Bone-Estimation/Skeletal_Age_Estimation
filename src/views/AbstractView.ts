//AbstractView.ts
export abstract class AbstractView{

    protected content : string;
    private path: string;
    protected rootDiv : HTMLElement | null;

    constructor(content : string, path : string, document: Document) {
        this.content = content;
        this.path = path;
        this.rootDiv = document.getElementById('rootDiv') as HTMLElement;
    }

    render(): void {
        if ( this.rootDiv) this.rootDiv.innerHTML = this.content;
    }
}