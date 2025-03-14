// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { PageController } from '../controllers/PageController';
import { Pages, SideBar, UI_Elements } from '../utils/enums';
import { AbstractView } from './AbstractView';
import { XML_Controller } from '../controllers/XML_Controller';
import { CaseModel } from '../models/CaseModel';
import { DataController } from '../controllers/DataController';

export class CreateCaseView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    /**
     * Specialized method to load content with specific case creation page requirements.
     * @param htmlContent The HTML content to render.
     */
    public override render(htmlContent: string): void {
        //console.log('loaded from CaseCreationView);
        //console.log('Rendering CreateCaseView'); // Debugging line
        this.contentDiv.innerHTML = htmlContent;
        this.initEventListeners();
        this.setSidebarListeners();
    }

    /**
     * Initialize event listeners for the case creation page.
     */
    protected override initEventListeners(): void {
        document
            .getElementById(UI_Elements.createStartCase)!
            .addEventListener('click', () => {
                var caseIDinput = document.getElementById(
                    'case',
                ) as HTMLInputElement;
                var sexSelect = document.getElementById(
                    'sex',
                ) as HTMLSelectElement;
                var populationAffinitySelect = document.getElementById(
                    'race',
                ) as HTMLSelectElement;

                var caseID = caseIDinput.value.trim();
                var sex = parseInt(sexSelect.value);
                var populationAffinity = parseInt(
                    populationAffinitySelect.value,
                );

                //console.log({ caseID, sex, populationAffinity }); // Debugging line

                PageController.getInstance().createCase(
                    caseID,
                    sex,
                    populationAffinity,
                );
                const dc = DataController.getInstance();
                XML_Controller.getInstance().saveAsFile(
                    dc.loadedCases[
                        dc.findCaseIndex(dc.openCaseID)
                    ] as CaseModel,
                    `save_data/${DataController.getInstance().openCaseID}.xml`,
                );

                PageController.getInstance().navigateTo(
                    Pages.DataEntry,
                    SideBar.dataBar,
                );
            });
    }
}
