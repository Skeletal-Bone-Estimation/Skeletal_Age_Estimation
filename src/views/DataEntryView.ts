// DataEntryView.ts

import { PageController, UI_Elements } from '../controllers/PageController';
import { Affinity, Sex } from '../models/CaseModel';
import { AbstractView } from './AbstractView';

export class DataEntryView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    //specialized method to load content with specific data entry page requirements
    public override render(htmlContent: string): void {
        console.log('Rendering content in DataEntryView');
        this.contentDiv.innerHTML = htmlContent;
        console.log('HTML content loaded:', this.contentDiv.innerHTML); // Check the content
    }

    public override setSidebarListeners() {
        const caseInput = document.getElementById(
            UI_Elements.caseID,
        ) as HTMLInputElement;
        console.log('caseInput:', caseInput);
        if (!caseInput) {
            console.error('caseInput not found!');
        }

        const sexSelector = document.getElementById(
            UI_Elements.sex,
        ) as HTMLSelectElement;
        console.log('sexSelector:', sexSelector);
        if (!sexSelector) {
            console.error('sexSelector not found!');
        }

        const affinitySelector = document.getElementById(
            UI_Elements.affinity,
        ) as HTMLSelectElement;
        console.log('affinitySelector:', affinitySelector);
        if (!affinitySelector) {
            console.error('affinitySelector not found!');
        }

        if (caseInput && sexSelector && affinitySelector) {
            caseInput.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                PageController.getInstance().editCase(
                    UI_Elements.caseID,
                    target.value as string,
                );
            });

            sexSelector.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseSex(target.value);
                PageController.getInstance().editCase(UI_Elements.sex, value);
            });

            affinitySelector.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseAffinity(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.affinity,
                    value,
                );
            });
        }
    }

    private parseAffinity(value: string): Affinity {
        switch (value.toLowerCase()) {
            case 'white':
                return 0;
            case 'black':
                return 1;
            case 'unknown':
                return 2;
            default:
                return -1;
        }
    }

    private parseSex(value: string): Sex {
        switch (value.toLowerCase()) {
            case 'male':
                return 0;
            case 'female':
                return 1;
            case 'unknown':
                return 2;
            default:
                return -1;
        }
    }
}
