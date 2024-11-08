import { AbstractView } from './AbstractView';

export class CreateCaseView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    //specialized method to load content with specific create case page requirements
    public override render(htmlContent: string): void {
        console.log('loaded from CaseCreationView');
        this.contentDiv.innerHTML = htmlContent;
    }
}
