//HomePageView.ts
import { AbstractView } from "./AbstractView";
export class HomePageView extends AbstractView {

    constructor(content : string, path : string, document : Document){
        super(content, path, document);
    }

    override render(): void {
        if (this.rootDiv) this.rootDiv.innerHTML = this.content;
    }

}