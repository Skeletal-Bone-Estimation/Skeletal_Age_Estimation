//HomePageView.ts

import { AbstractView } from "./AbstractView";

export class HomePageView extends AbstractView {
    constructor(document : Document)
    {
        super(document);
    }

    //specialized method to load content with specific home page requirements
    public override render(htmlContent: string): void {
        console.log('loaded from HomePageView');
        this.contentDiv.innerHTML = htmlContent;
    }
}