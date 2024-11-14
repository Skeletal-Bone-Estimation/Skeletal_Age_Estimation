import { PageController } from '../controllers/PageController';
import { UI_Elements } from '../utils/enums';
import { AbstractView } from './AbstractView';

export class CreateCaseView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    //specialized method to load content with specific create case page requirements
    public override render(htmlContent: string): void {
        //console.log('loaded from CaseCreationView');
        this.contentDiv.innerHTML = htmlContent;
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

                PageController.getInstance().createCase(
                    caseID,
                    sex,
                    populationAffinity,
                );
            });
    }
}
