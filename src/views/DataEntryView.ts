// DataEntryView.ts

import { PageController } from '../controllers/PageController';
import {
    UI_Elements,
    Affinity,
    Sex,
    ThirdMolar,
    AuricularArea,
    PubicSymphysis,
    SternalEnd,
} from '../utils/enums';
import { AbstractView } from './AbstractView';

export class DataEntryView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    //specialized method to load content with specific data entry page requirements
    public override render(htmlContent: string): void {
        //console.log('Rendering content in DataEntryView');
        this.contentDiv.innerHTML = htmlContent;
        //console.log('HTML content loaded:', this.contentDiv.innerHTML); // Check the content

        const auricularAreaL = document.getElementById(
            UI_Elements.auricularAreaL,
        ) as HTMLInputElement;

        if (!auricularAreaL) {
            console.error('caseInput not found!');
        }

        const auricularAreaR = document.getElementById(
            UI_Elements.auricularAreaR,
        ) as HTMLInputElement;

        if (!auricularAreaR) {
            console.error('caseInput not found!');
        }

        const pubicSymphysisL = document.getElementById(
            UI_Elements.pubicSymphysisL,
        ) as HTMLInputElement;

        if (!pubicSymphysisL) {
            console.error('caseInput not found!');
        }

        const pubicSymphysisR = document.getElementById(
            UI_Elements.pubicSymphysisR,
        ) as HTMLInputElement;

        if (!pubicSymphysisR) {
            console.error('caseInput not found!');
        }

        const fourthRibL = document.getElementById(
            UI_Elements.fourthRibL,
        ) as HTMLInputElement;

        if (!fourthRibL) {
            console.error('caseInput not found!');
        }

        const fourthRibR = document.getElementById(
            UI_Elements.fourthRibR,
        ) as HTMLInputElement;

        if (!fourthRibR) {
            console.error('caseInput not found!');
        }

        const thirdMolarTL = document.getElementById(
            UI_Elements.thirdMolarTL,
        ) as HTMLInputElement;

        if (!thirdMolarTL) {
            console.error('thirdMolarTL not found!');
        }

        const thirdMolarTR = document.getElementById(
            UI_Elements.thirdMolarTR,
        ) as HTMLInputElement;

        if (!thirdMolarTR) {
            console.error('thirdMolarTR not found!');
        }

        const thirdMolarBL = document.getElementById(
            UI_Elements.thirdMolarBL,
        ) as HTMLInputElement;

        if (!thirdMolarBL) {
            console.error('thirdMolarBL not found!');
        }

        const thirdMolarBR = document.getElementById(
            UI_Elements.thirdMolarBR,
        ) as HTMLInputElement;

        if (!thirdMolarBR) {
            console.error('thirdMolarBR not found!');
        }

        const notes = document.getElementById(
            UI_Elements.notes,
        ) as HTMLInputElement;

        if (!notes) {
            console.error('notes not found!');
        }

        if (
            auricularAreaL &&
            auricularAreaR &&
            pubicSymphysisL &&
            pubicSymphysisR &&
            fourthRibL &&
            fourthRibR &&
            thirdMolarTL &&
            thirdMolarTR &&
            thirdMolarBL &&
            thirdMolarBR &&
            notes
        ) {
            console.log('elements present');

            auricularAreaL.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseAuricularArea(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.auricularAreaL,
                    value,
                );
            });

            auricularAreaR.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseAuricularArea(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.auricularAreaR,
                    value,
                );
            });

            pubicSymphysisL.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parsePubicSymphysis(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.pubicSymphysisL,
                    value,
                );
            });

            pubicSymphysisR.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parsePubicSymphysis(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.pubicSymphysisR,
                    value,
                );
            });

            fourthRibL.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseFourthRib(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.fourthRibL,
                    value,
                );
            });

            fourthRibR.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseFourthRib(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.fourthRibR,
                    value,
                );
            });

            thirdMolarTL.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseThirdMolar(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.thirdMolarTL,
                    value,
                );
            });

            thirdMolarTR.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseThirdMolar(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.thirdMolarTR,
                    value,
                );
            });

            thirdMolarBL.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseThirdMolar(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.thirdMolarBL,
                    value,
                );
            });

            thirdMolarBR.addEventListener('input', (event) => {
                const target = event.target as HTMLSelectElement;
                const value = this.parseThirdMolar(target.value);
                PageController.getInstance().editCase(
                    UI_Elements.thirdMolarBR,
                    value,
                );
            });

            notes.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                if (!(target.value === ''))
                    PageController.getInstance().editCase(
                        UI_Elements.notes,
                        target.value as string,
                    );
            });
        }
    }

    //specialized method to connect listeners for data entry sidebar content
    public override setSidebarListeners() {
        const caseInput = document.getElementById(
            UI_Elements.dataSideCaseID,
        ) as HTMLInputElement;
        //console.log('caseInput:', caseInput);
        if (!caseInput) {
            console.error('caseInput not found!');
        }

        const sexSelector = document.getElementById(
            UI_Elements.dataSideSex,
        ) as HTMLSelectElement;
        //console.log('sexSelector:', sexSelector);
        if (!sexSelector) {
            console.error('sexSelector not found!');
        }

        const affinitySelector = document.getElementById(
            UI_Elements.dataSideAffinity,
        ) as HTMLSelectElement;
        //console.log('affinitySelector:', affinitySelector);
        if (!affinitySelector) {
            console.error('affinitySelector not found!');
        }

        if (caseInput && sexSelector && affinitySelector) {
            caseInput.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                if (!(target.value === ''))
                    PageController.getInstance().editCase(
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

    private parseThirdMolar(value: string): ThirdMolar {
        switch (value.toLowerCase()) {
            case 'a':
                return 0;
            case 'b':
                return 1;
            case 'c':
                return 2;
            case 'd':
                return 3;
            case 'e':
                return 4;
            case 'f':
                return 5;
            case 'g':
                return 6;
            case 'h':
                return 7;
            case 'unknown':
                return 8;
            default:
                return -1;
        }
    }

    private parseAuricularArea(value: string): AuricularArea {
        switch (value.toLowerCase()) {
            case 'one':
                return 1;
            case 'two':
                return 2;
            case 'three':
                return 3;
            case 'four':
                return 4;
            case 'five':
                return 5;
            case 'six':
                return 6;
            case 'unknown':
                return 7;
            default:
                return -1;
        }
    }

    private parsePubicSymphysis(value: string): PubicSymphysis {
        switch (value.toLowerCase()) {
            case 'one':
                return 1;
            case 'two':
                return 2;
            case 'three':
                return 3;
            case 'four':
                return 4;
            case 'five':
                return 5;
            case 'six':
                return 6;
            case 'seven':
                return 7;
            case 'unknown':
                return 8;
            default:
                return -1;
        }
    }

    private parseFourthRib(value: string): SternalEnd {
        switch (value.toLowerCase()) {
            case 'one':
                return 1;
            case 'two':
                return 2;
            case 'three':
                return 3;
            case 'four':
                return 4;
            case 'five':
                return 5;
            case 'six':
                return 6;
            case 'seven':
                return 7;
            case 'unknown':
                return 8;
            default:
                return -1;
        }
    }
}
