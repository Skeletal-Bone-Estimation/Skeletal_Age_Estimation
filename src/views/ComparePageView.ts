
// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { PageController } from '../controllers/PageController';
import { DataController } from '../controllers/DataController';
import { AbstractView } from './AbstractView';
import { CaseModel } from '../models/CaseModel';
import { ReportModel } from '../models/ReportModel';
import { AbstractReportModel } from '../models/AbstractReportModel';
import { Side, Pages } from '../utils/enums';
import { updateRangeBar } from '../utils/charts/ageRangeChart';
import { NullReportModel } from '../models/NullReportModel';
import { NullCaseModel } from '../models/NullCaseModel';
import { AbstractCaseModel } from '../models/AbstractCaseModel';

//TODO: this is supposed to extend ReportPageView to take advantage of exisitng methods
export class ComparePageView extends AbstractView {
    private storedReport: string | NullReportModel;
    private storedCase: CaseModel;
    private isInitialReportLoaded: boolean = false;

    constructor(document: Document) {
        super(document);
        this.storedReport = new NullReportModel();
        this.storedCase = DataController.getInstance().openCase as CaseModel;
    }

    /**
     * Specialized method to load content with specific home page requirements.
     * @param htmlContent The HTML content to render.
     */
    public override render(htmlContent: string): void {
        this.contentDiv.innerHTML = htmlContent;
        this.initEventListeners();
        this.setSidebarListeners();

        const reportCompare = DataController.getInstance().openReport;
        const _caseCompare: CaseModel = DataController.getInstance()
            .openCase as CaseModel;

        if (this.isInitialReportLoaded == false) {
            const report = DataController.getInstance().openReport;
            const _case: CaseModel = DataController.getInstance()
                .openCase as CaseModel;

            // call load report method with the most recent report
            if (!(report instanceof NullReportModel)) {
                this.storedReport = report;
                this.storedCase = _case;

                this.loadReport(
                    _case.generatedReports[
                        DataController.getInstance().findReportIndex(report)
                    ] as ReportModel,
                );
                //console.log('Report data loaded');
            } else {
                console.error('No report found.');
            }

            this.isInitialReportLoaded = true;
        } else {
            // call load report method with the most recent report
            if (!(reportCompare instanceof NullReportModel)) {
                this.loadReportCompare(
                    _caseCompare.generatedReports[
                        DataController.getInstance().findReportIndex(
                            reportCompare,
                        )
                    ] as ReportModel,
                );
                //console.log('Report data loaded');
            } else {
                console.error('No report found.');
            }

            // call load report method with the most recent report
            if (!(this.storedReport instanceof NullReportModel)) {
                this.loadReport(
                    this.storedCase.generatedReports[
                        DataController.getInstance().findReportIndex(
                            this.storedReport,
                        )
                    ] as ReportModel,
                );
                //console.log('Report data loaded');
            } else {
                console.error('No report found.');
            }
        }
    }

    /**
     * Initialize event listeners for the compare page.
     */
    protected override initEventListeners(): void {
        const dc = DataController.getInstance();

        document
            .getElementById('compareReportChange')!
            .addEventListener('click', async () => {
                const pageController = PageController.getInstance();
                await pageController.loadModalCompare();
            });

        document
            .getElementById('backBtn')!
            .addEventListener('click', async () => {
                this.isInitialReportLoaded = false;
                dc.openReport = this.storedReport;
                await PageController.getInstance().navigateTo(Pages.Report);
            });
    }

    /**
     * Load the report data into the compare page.
     * @param report The ReportModel to load.
     */
    public loadReport(report: ReportModel): void {
        // get the current case just so we can get the caseID
        const caseModel = DataController.getInstance().openCase as CaseModel;

        // Populate the case title
        const caseTitle = document.getElementById('reportCaseTitleCompare');
        if (caseTitle) {
            caseTitle.textContent = `Case ID: ${caseModel.caseID}`;
        } else {
            console.error('ReportCaseTitle not found');
        }

        // Summarized range placeholder
        const summarizedRange = document.getElementById('summarizedRangeLeft');
        if (summarizedRange) {
            summarizedRange.textContent = `Summarized Range: ${this.calculateSummarizedRange(report)}`;
        } else {
            console.error('SummarizedRange not found');
        }

        // Display estimated pubic symphysis range
        this.displayDataSection(
            'pubicDataLeft',
            'Pubic Symphysis',
            report.getPubicSymphysis(Side.L),
            report.getPubicSymphysis(Side.R),
            report.getPubicSymphysis(Side.C),
            report.getPubicSymphysisRange(Side.L),
            report.getPubicSymphysisRange(Side.R),
            report.getPubicSymphysisRange(Side.C),
            'pubicSymphysisBarLeft',
        );

        // Display the auricular surface range
        this.displayDataSection(
            'auricularDataLeft',
            'Auricular Surface',
            report.getAuricularSurface(Side.L),
            report.getAuricularSurface(Side.R),
            report.getAuricularSurface(Side.C),
            report.getAuricularSurfaceRange(Side.L),
            report.getAuricularSurfaceRange(Side.R),
            report.getAuricularSurfaceRange(Side.C),
            'auricularSurfaceBarLeft',
        );

        // Display the sternal end range
        this.displayDataSection(
            'sternalDataLeft',
            'Sternal End',
            report.getSternalEnd(Side.L),
            report.getSternalEnd(Side.R),
            report.getSternalEnd(Side.C),
            report.getSternalEndRange(Side.L),
            report.getSternalEndRange(Side.R),
            report.getSternalEndRange(Side.C),
            'sternalEndBarLeft',
        );

        // Display the third molar data
        const molarData = document.getElementById('molarDataLeft');
        if (molarData) {
            molarData.innerHTML = `
                <strong>Third Molar:</strong>
                <p>Top Left: ${this.formatThirdMolar(report.getThirdMolar(Side.TL))}</p>
                <p>Top Right: ${this.formatThirdMolar(report.getThirdMolar(Side.TR))}</p>
                <p>Bottom Left: ${this.formatThirdMolar(report.getThirdMolar(Side.BL))}</p>
                <p>Bottom Right: ${this.formatThirdMolar(report.getThirdMolar(Side.BR))}</p>
            `;
        } else {
            console.error('Element molarData not found!');
        }
    }

    /**
     * Load the report data into the compare page.
     * @param report The ReportModel to load.
     */
    public loadReportCompare(report: ReportModel): void {
        // Summarized range placeholder
        const summarizedRange = document.getElementById('summarizedRangeRight');
        if (summarizedRange) {
            summarizedRange.textContent = `Summarized Range: ${this.calculateSummarizedRangeCompare(report)}`;
        } else {
            console.error('SummarizedRange not found');
        }

        // Display estimated pubic symphysis range
        this.displayDataSection(
            'pubicDataRight',
            'Pubic Symphysis',
            report.getPubicSymphysis(Side.L),
            report.getPubicSymphysis(Side.R),
            report.getPubicSymphysis(Side.C),
            report.getPubicSymphysisRange(Side.L),
            report.getPubicSymphysisRange(Side.R),
            report.getPubicSymphysisRange(Side.C),
            'pubicSymphysisBarRight',
        );

        // Display the auricular surface range
        this.displayDataSection(
            'auricularDataRight',
            'Auricular Surface',
            report.getAuricularSurface(Side.L),
            report.getAuricularSurface(Side.R),
            report.getAuricularSurface(Side.C),
            report.getAuricularSurfaceRange(Side.L),
            report.getAuricularSurfaceRange(Side.R),
            report.getAuricularSurfaceRange(Side.C),
            'auricularSurfaceBarRight',
        );

        // Display the sternal end range
        this.displayDataSection(
            'sternalDataRight',
            'Sternal End',
            report.getSternalEnd(Side.L),
            report.getSternalEnd(Side.R),
            report.getSternalEnd(Side.C),
            report.getSternalEndRange(Side.L),
            report.getSternalEndRange(Side.R),
            report.getSternalEndRange(Side.C),
            'sternalEndBarRight',
        );

        // Display the third molar data
        const molarData = document.getElementById('molarDataRight');
        if (molarData) {
            molarData.innerHTML = `
                <strong>Third Molar:</strong>
                <p>Top Left: ${this.formatThirdMolar(report.getThirdMolar(Side.TL))}</p>
                <p>Top Right: ${this.formatThirdMolar(report.getThirdMolar(Side.TR))}</p>
                <p>Bottom Left: ${this.formatThirdMolar(report.getThirdMolar(Side.BL))}</p>
                <p>Bottom Right: ${this.formatThirdMolar(report.getThirdMolar(Side.BR))}</p>
            `;
        } else {
            console.error('Element molarData not found!');
        }
    }

    /**
     * Helper function to display data sections with ranges.
     * @param elementId The ID of the HTML element to populate.
     * @param sectionTitle The title of the section.
     * @param leftValue The left value to display.
     * @param rightValue The right value to display.
     * @param combinedValue The combined value to display.
     * @param leftRange The range for the left value.
     * @param rightRange The range for the right value.
     * @param combinedRange The range for the combined value.
     */
    private displayDataSection(
        elementId: string,
        sectionTitle: string,
        leftValue: number,
        rightValue: number,
        combinedValue: number,
        leftRange: { min: number; max: number },
        rightRange: { min: number; max: number },
        combinedRange: { min: number; max: number },
        graphId: string,
    ): void {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element ${elementId} not found!`);
            return;
        }

        element.innerHTML = `
            <strong>${sectionTitle}:</strong>
            <p>Left: ${leftValue.toFixed(2)}</p>
            <p>95% Confidence Range: ${leftRange.min.toFixed(2)} - ${leftRange.max.toFixed(2)}</p>
            <p>Right: ${rightValue.toFixed(2)}</p>
            <p>95% Confidence Range: ${rightRange.min.toFixed(2)} - ${rightRange.max.toFixed(2)}</p>
            <p>Combined: ${combinedValue.toFixed(2)}</p>
            <p>95% Confidence Range: ${combinedRange.min.toFixed(2)} - ${combinedRange.max.toFixed(2)}</p>
        `;

        updateRangeBar(combinedRange.min, combinedRange.max, graphId);
    }

    /**
     * Temporary function for formatting third molar results.
     * @param value The value to format.
     * @returns The formatted string.
     */
    private formatThirdMolar(value: number): string {
        if (value === 0) return 'Under 18.';
        if (value === 1) return 'Possibly 18';
        if (value === 2) return 'Likely 18 or Older';
        if (value === 3) return '18 or Older';
        return 'Unknown';
    }

    /**
     * The summarized range calculation.
     * @param report The report to calculate the range for.
     * @returns The summarized range as a string.
     */
    private calculateSummarizedRange(report: AbstractReportModel): string {
        // Get the minimum and maximum age across all ranges
        if ((report as ReportModel).getThirdMolar(Side.C) === 0) {
            var minAge = Math.min(
                report.getPubicSymphysisRange(Side.C).min,
                report.getAuricularSurfaceRange(Side.C).min,
                report.getSternalEndRange(Side.C).min,
            ).toFixed(2);
        } else {
            var minAge = '18.00';
        }
        const maxAge = Math.max(
            report.getPubicSymphysisRange(Side.C).max,
            report.getAuricularSurfaceRange(Side.C).max,
            report.getSternalEndRange(Side.C).max,
        ).toFixed(2);

        // Convert min/max to numbers for updateRangeBar
        const minAgeNum = parseFloat(minAge);
        const maxAgeNum = parseFloat(maxAge);

        // Update the UI range bar (adjust the ID accordingly)
        updateRangeBar(minAgeNum, maxAgeNum, 'ageBarLeft');

        return `${minAge} - ${maxAge}`;
    }

    private calculateSummarizedRangeCompare(
        report: AbstractReportModel,
    ): string {
        // Get the minimum and maximum age across all ranges
        if ((report as ReportModel).getThirdMolar(Side.C) === 0) {
            var minAge = Math.min(
                report.getPubicSymphysisRange(Side.C).min,
                report.getAuricularSurfaceRange(Side.C).min,
                report.getSternalEndRange(Side.C).min,
            ).toFixed(2);
        } else {
            var minAge = '18.00';
        }
        const maxAge = Math.max(
            report.getPubicSymphysisRange(Side.C).max,
            report.getAuricularSurfaceRange(Side.C).max,
            report.getSternalEndRange(Side.C).max,
        ).toFixed(2);

        // Convert min/max to numbers for updateRangeBar
        const minAgeNum = parseFloat(minAge);
        const maxAgeNum = parseFloat(maxAge);

        // Update the UI range bar (adjust the ID accordingly)
        updateRangeBar(minAgeNum, maxAgeNum, 'ageBarRight');

        return `${minAge} - ${maxAge}`;
    }
}

