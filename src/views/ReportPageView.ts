// Edited by: Nicholas Novak, Matthew Szarmach, Matthew Hardenburg, Cassidy Marquis

import { PageController } from '../controllers/PageController';
import { AbstractView } from './AbstractView';

export class ReportPageView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }
    public override render(htmlContent: string): void {
        this.contentDiv.innerHTML = htmlContent;
    }
}
