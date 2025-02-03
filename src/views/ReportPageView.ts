import { PageController } from '../controllers/PageController';
import { DataController } from '../controllers/DataController';
import { AbstractView } from './AbstractView';
import { CaseModel } from '../models/CaseModel';
import { ReportModel } from '../models/ReportModel';
import { Observers, Side, SideBar, UI_Elements } from '../utils/enums';
import { NullReportModel } from '../models/NullReportModel';
import { AbstractReportModel } from '../models/AbstractReportModel';

export class ReportPageView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    public override render(htmlContent: string): void {
        this.contentDiv.innerHTML = htmlContent;
        this.initEventListeners();

        // call load report method with the most recent report
        const report = DataController.getInstance().getMostRecentReport();
        if (report) {
            this.loadReport(report as ReportModel);
            console.log('Report data loaded');
        } else {
            console.error('No report found.');
        }
    }
    protected override initEventListeners(): void {
        const report = DataController.getInstance().getMostRecentReport();
        if (report) {
            document
                .getElementById('downloadBtn')!
                .addEventListener(
                    'click',
                    async () =>
                        await PageController.getInstance().exportReport(
                            report as ReportModel,
                        ),
                );
        }
    }

    public loadReport(report: ReportModel): void {
        // get the current case just so we can get the caseID
        const caseModel = DataController.getInstance().openCase as CaseModel;

        // Populate the case title
        const caseTitle = document.getElementById('reportCaseTitle');
        if (caseTitle) {
            caseTitle.textContent = `Case ID: ${caseModel.caseID}`;
        } else {
            console.error('ReportCaseTitle not found');
        }

        // Summarized range placeholder
        const summarizedRange = document.getElementById('summarizedRange');
        if (summarizedRange) {
            summarizedRange.textContent = `Summarized Range: ${this.calculateSummarizedRange(report)}`;
        } else {
            console.error('SummarizedRange not found');
        }

        // Display estimated pubic symphysis range
        this.displayDataSection(
            'pubicData',
            'Pubic Symphysis',
            report.getPubicSymphysis(Side.L),
            report.getPubicSymphysis(Side.R),
            report.getPubicSymphysis(Side.C),
            report.getPubicSymphysisRange(Side.L),
            report.getPubicSymphysisRange(Side.R),
            report.getPubicSymphysisRange(Side.C),
        );

        // Display the auricular surface range
        this.displayDataSection(
            'auricularData',
            'Auricular Surface',
            report.getAuricularSurface(Side.L),
            report.getAuricularSurface(Side.R),
            report.getAuricularSurface(Side.C),
            report.getAuricularSurfaceRange(Side.L),
            report.getAuricularSurfaceRange(Side.R),
            report.getAuricularSurfaceRange(Side.C),
        );

        // Display the sternal end range
        this.displayDataSection(
            'sternalData',
            'Sternal End',
            report.getSternalEnd(Side.L),
            report.getSternalEnd(Side.R),
            report.getSternalEnd(Side.C),
            report.getSternalEndRange(Side.L),
            report.getSternalEndRange(Side.R),
            report.getSternalEndRange(Side.C),
        );

        // Display the third molar data
        const molarData = document.getElementById('molarData');
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

    // Helper function to display data sections with ranges
    private displayDataSection(
        elementId: string,
        sectionTitle: string,
        leftValue: number,
        rightValue: number,
        combinedValue: number,
        leftRange: { min: number; max: number },
        rightRange: { min: number; max: number },
        combinedRange: { min: number; max: number },
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
    }

    // Temporary function for formatting third molar results
    private formatThirdMolar(value: number): string {
        if (value === 0) return 'Under 18.';
        if (value === 18) return '18 or Older';
        return 'Unknown';
    }

    public accessFormatThirdMolar(value: number): string {
        return this.formatThirdMolar(value);
    }

    // Placeholder for summarized range calculation
    private calculateSummarizedRange(report: AbstractReportModel): string {
        // TODO: Implement logic for computing the overall summarized range
        return `${Math.min(report.getPubicSymphysisRange(Side.C).min, report.getAuricularSurfaceRange(Side.C).min, report.getSternalEndRange(Side.C).min).toFixed(2)} - ${Math.max(report.getPubicSymphysisRange(Side.C).max, report.getAuricularSurfaceRange(Side.C).max, report.getSternalEndRange(Side.C).max).toFixed(2)}`;
    }
}
