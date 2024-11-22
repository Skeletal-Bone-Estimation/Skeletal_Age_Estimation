//HomePageView.ts

import { PageController } from '../controllers/PageController';
import { Pages, SideBar } from '../utils/enums';
import { AbstractView } from './AbstractView';

export class HomePageView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    //specialized method to load content with specific home page requirements
    public override render(htmlContent: string): void {
        //console.log('loaded from HomePageView');
        this.contentDiv.innerHTML = htmlContent;
        this.initEventListeners();
        this.setSidebarListeners();
    }

    protected override initEventListeners(): void {
        document
            .getElementById('homeCreate')!
            .addEventListener('click', () =>
                PageController.getInstance().navigateTo(Pages.Create, SideBar.createBar),
            );

        document
            .getElementById('homeLoad')!
            .addEventListener('click', () =>
                document.getElementById('loadCase')!.click(),
            );
    }
}
