// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
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
    Analyzers,
    Observers,
} from '../utils/enums';
import { Pages, SideBar } from '../utils/enums';
import { AbstractView } from './AbstractView';
import { AnalysisContext } from '../utils/analyzer/AnalysisContext';
import { DataController } from '../controllers/DataController';
import { ReportModel } from '../models/ReportModel';

export class DataEntryView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    /**
     * Specialized method to load content with specific data entry page requirements.
     * @param htmlContent The HTML content to render.
     */
    public override render(htmlContent: string): void {
        this.contentDiv.innerHTML = htmlContent;
        this.initEventListeners();
        this.setSidebarListeners();
        this.autoLoadCaseData();
    }

    /**
     * Automatically load case data into the form fields.
     */
    public autoLoadCaseData() {
        const dc = DataController.getInstance();
        var _case: CaseModel = dc.loadedCases[
            dc.findCaseIndex(dc.openCaseID)
        ] as CaseModel;
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
            console.error('auricularAreaL not found!');
        }

        const auricularAreaR = document.getElementById(
            UI_Elements.auricularAreaR,
        ) as HTMLInputElement;

        if (!auricularAreaR) {
            console.error('auricularAreaR not found!');
        }

        const pubicSymphysisL = document.getElementById(
            UI_Elements.pubicSymphysisL,
        ) as HTMLInputElement;

        if (!pubicSymphysisL) {
            console.error('publicSymphysisL not found!');
        }

        const pubicSymphysisR = document.getElementById(
            UI_Elements.pubicSymphysisR,
        ) as HTMLInputElement;

        if (!pubicSymphysisR) {
            console.error('publicSymphysisR not found!');
        }

        const fourthRibL = document.getElementById(
            UI_Elements.fourthRibL,
        ) as HTMLInputElement;

        if (!fourthRibL) {
            console.error('fourthRibL not found!');
        }

        const fourthRibR = document.getElementById(
            UI_Elements.fourthRibR,
        ) as HTMLInputElement;

        if (!fourthRibR) {
            console.error('fourthRibR not found!');
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
        auricularAreaL.value = this.parseAuricularAreaToString(
            _case.auricularAreaL,
        );
        auricularAreaR.value = this.parseAuricularAreaToString(
            _case.auricularAreaR,
        );
        pubicSymphysisL.value = this.parsePublicSymphysisToString(
            _case.pubicSymphysisL,
        );
        pubicSymphysisR.value = this.parsePublicSymphysisToString(
            _case.pubicSymphysisR,
        );
        fourthRibL.value = this.parseFourthRibToString(_case.fourthRibL);
        fourthRibR.value = this.parseFourthRibToString(_case.fourthRibR);
        thirdMolarTL.value = this.parseThirdMolarToString(_case.thirdMolarTL);
        thirdMolarTR.value = this.parseThirdMolarToString(_case.thirdMolarTR);
        thirdMolarBL.value = this.parseThirdMolarToString(_case.thirdMolarBL);
        thirdMolarBR.value = this.parseThirdMolarToString(_case.thirdMolarBR);
        notes.value = _case.notes;
    }

    /**
     * Initialize event listeners for the data entry page.
     */
    protected override initEventListeners() {
        const auricularAreaL = document.getElementById(
            UI_Elements.auricularAreaL,
        ) as HTMLInputElement;

        if (!auricularAreaL) {
            console.error('auricularAreaL not found!');
        }

        const auricularAreaR = document.getElementById(
            UI_Elements.auricularAreaR,
        ) as HTMLInputElement;

        if (!auricularAreaR) {
            console.error('auricularAreaR not found!');
        }

        const pubicSymphysisL = document.getElementById(
            UI_Elements.pubicSymphysisL,
        ) as HTMLInputElement;

        if (!pubicSymphysisL) {
            console.error('publicSymphysisL not found!');
        }

        const pubicSymphysisR = document.getElementById(
            UI_Elements.pubicSymphysisR,
        ) as HTMLInputElement;

        if (!pubicSymphysisR) {
            console.error('pubicSymphysisR not found!');
        }

        const fourthRibL = document.getElementById(
            UI_Elements.fourthRibL,
        ) as HTMLInputElement;

        if (!fourthRibL) {
            console.error('fourthRibL not found!');
        }

        const fourthRibR = document.getElementById(
            UI_Elements.fourthRibR,
        ) as HTMLInputElement;

        if (!fourthRibR) {
            console.error('fourthRibR not found!');
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

        const analyzeButton = document.getElementById(
            UI_Elements.analyzeButton,
        ) as HTMLButtonElement;

        const guideButton = document.getElementById(
            UI_Elements.guideButton,
        ) as HTMLButtonElement;

        if (!analyzeButton) {
            console.error('analyzeButton not found!');
        }

        if (!guideButton) {
            console.error('guideButton not found');
        }

        const mostRecentReportButton = document.getElementById(
            UI_Elements.mostRecentReportButton,
        ) as HTMLButtonElement;
        if (!mostRecentReportButton)
            console.error('most recent report button not found');

        const analysisSelector = document.getElementById(
            UI_Elements.analysisSelector,
        ) as HTMLButtonElement;
        if (!analysisSelector) console.error('analysis selector not found');

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
            notes &&
            analyzeButton &&
            guideButton &&
            analysisSelector &&
            mostRecentReportButton
        ) {
            //console.log('elements present');

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

            analyzeButton.addEventListener('click', (event) => {
                const dc = DataController.getInstance();
                var _case: CaseModel = dc.loadedCases[
                    dc.findCaseIndex(dc.openCaseID)
                ] as CaseModel;
                const target = event.target as HTMLButtonElement;
                const sex = this.parseSex(target.value);
                const affinity = this.parseAffinity(target.value);
                AnalysisContext.getInstance(sex, affinity).analyze(
                    _case,
                    Analyzers.Default,
                );
                PageController.getInstance().navigateTo(
                    Pages.Report,
                    SideBar.createBar,
                );

                // var report =
                //     DataController.getInstance().getMostRecentReport() as ReportModel;
                // console.log('Generated Report: ', report);
            });

            guideButton.addEventListener('click', (event) => {
                window.open(
                    './assets/guidelines/Scoring Guidelines for Skeletal Bone Age Estimation.pdf',
                    '_blank',
                );
            });

            mostRecentReportButton.addEventListener('click', () => {
                const dc = DataController.getInstance();
                (
                    dc.loadedCases[dc.findCaseIndex(dc.openCaseID)] as CaseModel
                ).notify(
                    Observers.setSelectedReport,
                    (
                        dc.loadedCases[
                            dc.findCaseIndex(dc.openCaseID)
                        ] as CaseModel
                    ).generatedReports[dc.getMostRecentReportIdx()].id,
                );
                PageController.getInstance().navigateTo(
                    Pages.Report,
                    SideBar.dataBar,
                );
            });

            analysisSelector.addEventListener('change', () => {
                const dc = DataController.getInstance();
                const _case = dc.loadedCases[
                    dc.findCaseIndex(dc.openCaseID)
                ] as CaseModel;
                switch (analysisSelector.value) {
                    case 'default':
                        AnalysisContext.getInstance(
                            _case.sex,
                            _case.populationAffinity,
                        ).setStrategy(Analyzers.Default);
                        //console.log('Default analysis selected');
                        break;
                    case 'image':
                        AnalysisContext.getInstance(
                            _case.sex,
                            _case.populationAffinity,
                        ).setStrategy(Analyzers.Image);
                        //console.log('Image analysis selected');
                        break;
                    case 'prediction':
                        AnalysisContext.getInstance(
                            _case.sex,
                            _case.populationAffinity,
                        ).setStrategy(Analyzers.Prediction);
                        //console.log('Regression analysis selected');
                        break;
                    default:
                        console.error('invalid analyzer selected');
                }
            });
        }
    }

    /**
     * Specialized method to connect listeners for data entry sidebar content.
     */
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

    /**
     * Parse a string value to an Affinity enum.
     * @param value The string value to parse.
     * @returns The corresponding Affinity enum value.
     */
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

    /**
     * Convert an Affinity enum value to a string.
     * @param value The Affinity enum value to convert.
     * @returns The corresponding string value.
     */
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

    /**
     * Parse a string value to a Sex enum.
     * @param value The string value to parse.
     * @returns The corresponding Sex enum value.
     */
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

    /**
     * Convert a Sex enum value to a string.
     * @param value The Sex enum value to convert.
     * @returns The corresponding string value.
     */
    private parseSexToString(value: Sex): string {
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

    /**
     * Parse a string value to a ThirdMolar enum.
     * @param value The string value to parse.
     * @returns The corresponding ThirdMolar enum value.
     */
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

    /**
     * Convert a ThirdMolar enum value to a string.
     * @param value The ThirdMolar enum value to convert.
     * @returns The corresponding string value.
     */
    private parseThirdMolarToString(value: ThirdMolar): string {
        switch (value) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
            case 3:
                return 'D';
            case 4:
                return 'E';
            case 5:
                return 'F';
            case 6:
                return 'G';
            case 7:
                return 'H';
            case 8:
                return 'Unknown';
            default:
                return 'Error';
        }
    }

    /**
     * Parse a string value to an AuricularArea enum.
     * @param value The string value to parse.
     * @returns The corresponding AuricularArea enum value.
     */
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

    /**
     * Convert an AuricularArea enum value to a string.
     * @param value The AuricularArea enum value to convert.
     * @returns The corresponding string value.
     */
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

    /**
     * Parse a string value to a PubicSymphysis enum.
     * @param value The string value to parse.
     * @returns The corresponding PubicSymphysis enum value.
     */
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

    /**
     * Convert a PubicSymphysis enum value to a string.
     * @param value The PubicSymphysis enum value to convert.
     * @returns The corresponding string value.
     */
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
                return 'unknown';
            default:
                return 'error';
        }
    }

    /**
     * Parse a string value to a SternalEnd enum.
     * @param value The string value to parse.
     * @returns The corresponding SternalEnd enum value.
     */
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

    /**
     * Convert a SternalEnd enum value to a string.
     * @param value The SternalEnd enum value to convert.
     * @returns The corresponding string value.
     */
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
                return 'unknown';
            default:
                return 'error';
        }
    }
}
