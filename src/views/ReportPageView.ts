import { PageController } from '../controllers/PageController';
import { DataController } from '../controllers/DataController';
import { AbstractView } from './AbstractView';
import { CaseModel } from '../models/CaseModel';
import { ReportModel } from '../models/ReportModel';
import { Observers, Pages, Side, SideBar, UI_Elements } from '../utils/enums';
import { NullReportModel } from '../models/NullReportModel';

export class ReportPageView extends AbstractView {
    private elements: HTMLElement[];

    constructor(document: Document) {
        super(document);
        this.elements = [];
    }

    //override render method for specialized view
    public override render(htmlContent: string): void {
        this.contentDiv.innerHTML = htmlContent;
        this.loadElements();
        this.initEventListeners();
        const report = DataController.getInstance().openReport;

        //debugging
        // console.log(
        //     'All reports:',
        //     (DataController.getInstance().openCase as CaseModel)
        //         .generatedReports,
        // );
        // console.log('Open Report:', DataController.getInstance().openReport);
        // console.log(
        //     'Most recent report:',
        //     (DataController.getInstance().openCase as CaseModel)
        //         .mostRecentReport,
        // );

        // call load report method with the most recent report
        if (report instanceof ReportModel) {
            this.loadReport(report as ReportModel);
            //console.log('Report data loaded');
        } else {
            console.error('No report found.');

            //TODO: display an error message popup

            PageController.getInstance().navigateTo(
                Pages.DataEntry,
                SideBar.dataBar,
            );
        }
    }

    //override initEventListeners method for view specific listeners
    protected override initEventListeners(): void {
        //report archive  button
        this.elements[0].addEventListener('click', async () => {
            //open modal window and fill with content
            const pageController = PageController.getInstance();
            await pageController.loadModal();
        });

        //back to data entry button
        this.elements[1].addEventListener('click', () => {
            PageController.getInstance().navigateTo(
                Pages.DataEntry,
                SideBar.dataBar,
            );
        });

        //download report as docx
        this.elements[2].addEventListener(
            'click',
            async () =>
                await PageController.getInstance().exportReport(Pages.Report),
        );
    }

    //load elements from the html document into the elements array
    private loadElements(): void {
        this.elements = [
            document.getElementById(
                UI_Elements.reportArchiveButton,
            ) as HTMLElement,
            document.getElementById(
                UI_Elements.backtoDataEntryButton,
            ) as HTMLElement,
            document.getElementById(UI_Elements.downloadButton) as HTMLElement,
        ];
    }

    //load the report data into the report page
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
            report.getPubicSymphysisRange(Side.L),
            report.getPubicSymphysisRange(Side.R),
        );

        // Display the auricular surface range
        this.displayDataSection(
            'auricularData',
            'Auricular Surface',
            report.getAuricularSurface(Side.L),
            report.getAuricularSurface(Side.R),
            report.getAuricularSurfaceRange(Side.L),
            report.getAuricularSurfaceRange(Side.R),
        );

        // Display the sternal end range
        this.displayDataSection(
            'sternalData',
            'Sternal End',
            report.getSternalEnd(Side.L),
            report.getSternalEnd(Side.R),
            report.getSternalEndRange(Side.L),
            report.getSternalEndRange(Side.R),
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
        leftRange: { min: number; max: number },
        rightRange: { min: number; max: number },
    ): void {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element ${elementId} not found!`);
            return;
        }

        element.innerHTML = `
            <strong>${sectionTitle}:</strong>
            <p>Left: ${leftValue}</p>
            <p>95% Confidence Range: ${leftRange.min} - ${leftRange.max}</p>
            <p>Right: ${rightValue}</p>
            <p>95% Confidence Range: ${rightRange.min} - ${rightRange.max}</p>
        `;
    }

    // Temporary function for formatting third molar results
    private formatThirdMolar(value: number): string {
        if (value === 0) return 'Under 18.';
        if (value === 18) return '18 or Older';
        return 'Unknown';
    }

    // Placeholder for summarized range calculation
    private calculateSummarizedRange(report: ReportModel): string {
        // TODO: Implement logic for computing the overall summarized range
        return 'To Be Determined';
    }
}
