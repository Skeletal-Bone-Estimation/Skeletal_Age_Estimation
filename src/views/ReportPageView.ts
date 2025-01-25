// Edited by: Nicholas Novak, Matthew Szarmach, Matthew Hardenburg, Cassidy Marquis

import { PageController } from '../controllers/PageController';
import { DataController } from '../controllers/DataController';
import { AbstractView } from './AbstractView';
import { ReportModel } from '../models/ReportModel';
import { Side } from '../utils/enums';

export class ReportPageView extends AbstractView {
    constructor(document: Document) {
        super(document);
    }

    public override render(htmlContent: string): void {
        this.contentDiv.innerHTML = htmlContent;

        // call load report method with the most recent report
        const report = DataController.getInstance().getMostRecentReport();
        if (report) {
            this.loadReport(report);
            console.log('Report data loaded');
        } else {
            console.error('No report found.');
        }
    }

    public loadReport(report: ReportModel): void {
        // populate the case title
        const caseTitle = document.getElementById('reportCaseTitle');
        if (!caseTitle) {
            console.error('ReportCaseTitle not found');
        } else {
            caseTitle.textContent = `Case ID: ${report.id}`;
            console.log('Populating reportCaseTitle:', report.id);
        }

        // TODO: Combine available ranges to compute an overall summarized range
        const summarizedRange = document.getElementById('summarizedRange');
        if (!summarizedRange) {
            console.error('SummarizedRange not found');
        } else {
            summarizedRange.textContent = `Summarized Range: This is a placeholder`;
        }

        // display estimated pubic symphysis range
        const pubicData = document.getElementById('pubicData');
        if (!pubicData) {
            console.error('PubicData not found');
        } else {
            pubicData.innerHTML = `
                <strong>Pubic Symphysis:</strong>
                <p>Left: ${report.getPubicSymphysis(Side.L)}</p>
                <p>Right: ${report.getPubicSymphysis(Side.R)}</p>
            `;
        }

        // display the auricular surface range
        const auricularData = document.getElementById('auricularData');
        if (!auricularData) {
            console.error('Element auricularData not found!');
        } else {
            auricularData.innerHTML = `
                <strong>Auricular Surface:</strong>
                <p>Left: ${report.getAuricularSurface(Side.L)}</p>
                <p>Right: ${report.getAuricularSurface(Side.R)}</p>
            `;
        }

        // display the sternal range
        const sternalData = document.getElementById('sternalData');
        if (!sternalData) {
            console.error('Element sternalData not found!');
        } else {
            sternalData.innerHTML = `
                <strong>Sternal End:</strong>
                <p>Left: ${report.getSternalEnd(Side.L)}</p>
                <p>Right: ${report.getSternalEnd(Side.R)}</p>
            `;
        }

        //Display the third molar data
        const molarData = document.getElementById('molarData');
        if (!molarData) {
            console.error('Element molarData not found!');
        } else {
            console.log('populating molars');
            molarData.innerHTML = `
                <strong>Third Molar:</strong>
                <p>Top Left: ${this.formatThirdMolar(report.getThirdMolar(Side.TL))}</p>
                <p>Top Right: ${this.formatThirdMolar(report.getThirdMolar(Side.TR))}</p>
                <p>Bottom Left: ${this.formatThirdMolar(report.getThirdMolar(Side.BL))}</p>
                <p>Bottom Right: ${this.formatThirdMolar(report.getThirdMolar(Side.BR))}</p>
    `;
        }
    }

    //likely temp function for formatting the third molar results
    private formatThirdMolar(value: number): string {
        if (value === 0) return 'Under 18.';
        if (value === 18) return '18 or Older';

        return 'Unknown';
    }

    private calculateSummarizedRange(report: ReportModel): string {
        // TODO : Decide how final overall range should be calculated
        return '0';
    }
}
