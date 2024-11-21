import { PageController } from '../controllers/PageController';
import { Pages, SideBar, UI_Elements } from '../utils/enums';
import { AbstractView } from './AbstractView';
import { XML_Controller } from '../controllers/XML_Controller';
import { CaseModel } from '../models/CaseModel';
import { DataController } from '../controllers/DataController';

export class CreateCaseView extends AbstractView {
    constructor(document: Document) {
        super(document);
        this.contentDiv = document.getElementById('content') as HTMLElement;
    }

    public override render(htmlContent: string): void {
        console.log('Rendering CreateCaseView'); // Debugging line
        this.contentDiv.innerHTML = htmlContent;
        const startCaseButton = document.getElementById(UI_Elements.createStartCase);
        if (startCaseButton) {
            console.log('Button found and event listener attached!');
            startCaseButton.addEventListener('click', () => {
                console.log('Button clicked!'); // Debugging line
    
                var caseIDinput = document.getElementById('case') as HTMLInputElement;
                var sexSelect = document.getElementById('sex') as HTMLSelectElement;
                var populationAffinitySelect = document.getElementById('race') as HTMLSelectElement;
    
                var caseID = caseIDinput.value.trim();
                var sex = parseInt(sexSelect.value);
                var populationAffinity = parseInt(populationAffinitySelect.value);
    
                console.log({ caseID, sex, populationAffinity }); // Debugging line
    
                PageController.getInstance().createCase(caseID, sex, populationAffinity);
                XML_Controller.getInstance().saveAsFile(
                    DataController.getInstance().openCase as CaseModel,
                    `save_data/${(DataController.getInstance().openCase as CaseModel).caseID}.xml`
                );
                PageController.getInstance().navigateTo(Pages.DataEntry);
                PageController.getInstance().loadSideBarContent(SideBar.dataBar);
            });
        } else {
            console.error('Create case button not found!');
        }
    }
}
