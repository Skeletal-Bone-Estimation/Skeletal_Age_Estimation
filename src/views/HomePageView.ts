//HomePageView.ts

import { PageController } from '../controllers/PageController';
import { Pages } from '../utils/enums';
import { AbstractView } from './AbstractView';

export class HomePageView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    //specialized method to load content with specific home page requirements
    public override render(htmlContent: string): void {
        console.log('loaded from HomePageView');
        this.contentDiv.innerHTML = htmlContent;

        document
            .getElementById('homeCreate')!
            .addEventListener('click', () =>
                PageController.getInstance().navigateTo(Pages.Create),
            );

        document
            .getElementById('homeLoad')!
            .addEventListener('click', () =>
                document.getElementById('loadCase')!.click(),
            );
    }
}
