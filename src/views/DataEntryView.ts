// DataEntryView.ts

import { PageController } from '../controllers/PageController';
import { CaseModel } from '../models/CaseModel';
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
        this.contentDiv.innerHTML = htmlContent;
        this.initEventListeners();
        this.setSidebarListeners();

        // right here

        this.autoLoadCaseData();
        
    }

    public autoLoadCaseData() {
        var _case : CaseModel = PageController.getInstance().getOpenCase();
        const caseID = document.getElementById(
            UI_Elements.dataSideCaseID,
        ) as HTMLInputElement;

        const sex = document.getElementById(
            UI_Elements.dataSideSex,
        ) as HTMLSelectElement;

        const affinity = document.getElementById(
            UI_Elements.dataSideAffinity,
        ) as HTMLSelectElement;

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

        caseID.value = _case.caseID;
        sex.value = this.parseSexToString(_case.sex);
        affinity.value = this.parseAffinitytoString(_case.populationAffinity);
        auricularAreaL.value = this.parseAuricularAreaToString(_case.auricularAreaL);
        auricularAreaR.value = this.parseAuricularAreaToString(_case.auricularAreaR);
        pubicSymphysisL.value = this.parsePublicSymphysisToString(_case.pubicSymphysisL);
        pubicSymphysisR.value = this.parsePublicSymphysisToString(_case.pubicSymphysisR);
        fourthRibL.value = this.parseFourthRibToString(_case.fourthRibL);
        fourthRibR.value = this.parseFourthRibToString(_case.fourthRibR);
        thirdMolarTL.value = this.parseThirdMolarToString(_case.thirdMolarTL);
        thirdMolarTR.value = this.parseThirdMolarToString(_case.thirdMolarTR);
        thirdMolarBL.value = this.parseThirdMolarToString(_case.thirdMolarBL);
        thirdMolarBR.value = this.parseThirdMolarToString(_case.thirdMolarBR);
        notes.value = _case.notes;
    }

    protected override initEventListeners() {
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
    protected override setSidebarListeners() {
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

    private parseAffinitytoString(value: Affinity): string {
        switch (value) {
            case 0:
                return 'white';
            case 1:
                return 'black';
            case 2:
                return 'unknown';
            default:
                return 'error';
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

    private parseSexToString(value: Sex): string  {
        switch (value) {
            case 0:
                return 'male';
            case 1:
                return 'female';
            case 2:
                return 'unknown';
            default:
                return 'error';
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

    private parseThirdMolarToString(value: ThirdMolar): string {
        switch (value) {
            case 0:
                return 'a';
            case 1:
                return 'b';
            case 2:
                return 'c';
            case 3:
                return 'd';
            case 4:
                return 'e';
            case 5:
                return 'f';
            case 6:
                return 'g';
            case 7:
                return 'h';
            case 8:
                return 'unknown';
            default:
                return 'error';
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

    private parseAuricularAreaToString(value: AuricularArea): string {
        switch (value) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            case 4:
                return 'four';
            case 5:
                return 'five';
            case 6:
                return 'six';
            case 7:
                return 'unknown';
            default:
                return 'error';
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

    private parsePublicSymphysisToString(value: PubicSymphysis): string {
        switch (value) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            case 4:
                return 'four';
            case 5:
                return 'five';
            case 6:
                return 'six';
            case 7:
                return 'seven';
            case 8:
                return 'unknown'
            default:
                return 'error';
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

    private parseFourthRibToString(value: SternalEnd): string {
        switch (value) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            case 4:
                return 'four';
            case 5:
                return 'five';
            case 6:
                return 'six';
            case 7:
                return 'seven';
            case 8:
                return 'unknown'
            default:
                return 'error';
        }
    }
}
