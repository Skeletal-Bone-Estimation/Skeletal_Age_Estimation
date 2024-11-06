// DataEntryView.ts

import { AbstractView } from "./AbstractView";

export class DataEntryView extends AbstractView {
    constructor(document : Document)
    {
        super(document);
    }

    //specialized method to load content with specific data entry page requirements
    public override render(htmlContent: string): void {
        console.log('loaded from DataEntryView');
        this.contentDiv.innerHTML = htmlContent;
    }
}