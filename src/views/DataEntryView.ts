// DataEntryView.ts

import { PageController } from '../controllers/PageController';
import { UI_Elements, Affinity, Sex } from '../utils/enums';
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

    //specialized method to connect listeners for data entry sidebar content
    public override setSidebarListeners() {
        const caseInput = document.getElementById(
            UI_Elements.dataSideCaseID,
        ) as HTMLInputElement;
        console.log('caseInput:', caseInput);
        if (!caseInput) {
            console.error('caseInput not found!');
        }

        const sexSelector = document.getElementById(
            UI_Elements.dataSideSex,
        ) as HTMLSelectElement;
        console.log('sexSelector:', sexSelector);
        if (!sexSelector) {
            console.error('sexSelector not found!');
        }

        const affinitySelector = document.getElementById(
            UI_Elements.dataSideAffinity,
        ) as HTMLSelectElement;
        console.log('affinitySelector:', affinitySelector);
        if (!affinitySelector) {
            console.error('affinitySelector not found!');
        }

        if (caseInput && sexSelector && affinitySelector) {
            caseInput.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                if (!(target.value === '')) PageController.getInstance().editCase(
                    UI_Elements.dataSideCaseID,
                    target.value as string,
                );
            });

            sexSelector.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseSex(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.dataSideSex,
                    value,
                );
            });

            affinitySelector.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseAffinity(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.dataSideAffinity,
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
