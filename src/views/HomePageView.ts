// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { PageController } from '../controllers/PageController';
import { Pages, SideBar } from '../utils/enums';
import { AbstractView } from './AbstractView';

export class HomePageView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    /**
     * Specialized method to load content with specific home page requirements.
     * @param htmlContent The HTML content to render.
     */
    public override render(htmlContent: string): void {
        //console.log('loaded from HomePageView');
        (
            document.getElementById('topBarButtons') as HTMLElement
        ).style.display = 'none';
        this.contentDiv.innerHTML = htmlContent;
        this.initEventListeners();
        this.setSidebarListeners();
    }

    /**
     * Initialize event listeners for the home page.
     */
    protected override initEventListeners(): void {
        document
            .getElementById('homeCreate')!
            .addEventListener(
                'click',
                async () =>
                    await PageController.getInstance().navigateTo(
                        Pages.Create,
                        SideBar.createBar,
                    ),
            );

        document
            .getElementById('homeLoad')!
            .addEventListener('click', () =>
                document.getElementById('loadCase')!.click(),
            );
    }
}
