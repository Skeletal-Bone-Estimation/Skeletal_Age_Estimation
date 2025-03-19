import { PageController } from '../controllers/PageController';
import { DataController } from '../controllers/DataController';
import { AbstractView } from './AbstractView';
import { CaseModel } from '../models/CaseModel';
import { ReportModel } from '../models/ReportModel';
import { Modals, Pages, Side, SideBar, UI_Elements } from '../utils/enums';
import { AbstractReportModel } from '../models/AbstractReportModel';
import { updateRangeBar } from '../utils/charts/ageRangeChart';
import { NullReportModel } from '../models/NullReportModel';

export class ReportPageView extends AbstractView {
    private elements: HTMLElement[];
    private ninetyConfidenceInfo: number[];

    constructor(document: Document) {
        super(document);
        this.elements = [];
        this.ninetyConfidenceInfo = [];
    }

    /**
     * Override render method for specialized view.
     * @param htmlContent The HTML content to render.
     */
    public override render(htmlContent: string): void {
        (
            document.getElementById('topBarButtons') as HTMLElement
        ).style.display = 'flex';
        this.contentDiv.innerHTML = htmlContent;
        this.loadElements();
        this.initEventListeners();
        const dc = DataController.getInstance();
        const report = dc.openReport;
        const _case: CaseModel = dc.loadedCases[
            dc.findCaseIndex(dc.openCaseID)
        ] as CaseModel;

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
        if (!(report instanceof NullReportModel)) {
            const idx = DataController.getInstance().findReportIndex(report);
            if (idx === -1) {
                console.error('Report not found.');
                return;
            }
            this.loadReport(_case.generatedReports[idx] as ReportModel);
            //console.log('Report data loaded');
        } else {
            console.error('No report found.');
        }
    }

    /**
     * Override initEventListeners method for view-specific listeners.
     */
    protected override initEventListeners(): void {
        //report archive  button
        this.elements[0].addEventListener('click', async () => {
            //open modal window and fill with content
            const pageController = PageController.getInstance();
            await pageController.loadModal(Modals.Report);
        });

        //back to data entry button
        this.elements[1].addEventListener('click', () => {
            PageController.getInstance().navigateTo(
                Pages.DataEntry,
                SideBar.dataBar,
            );
        });

        // Button for changing graph to a 90% confidence interval
        this.elements[3].addEventListener('click', () => {
            //console.log(this.ninetyConfidenceInfo);
            this.updateGraphNinety();
            const graphTitle = document.getElementById('graphTitle');
            if (graphTitle) {
                this.updateGraphTitle(
                    graphTitle as HTMLElement,
                    `<strong><i>90% Confidence Interval</i></strong>`,
                );
            } else {
                console.error('Element graphTitle not found!');
            }
        });

        const _case: CaseModel = DataController.getInstance().loadedCases[
            DataController.getInstance().findCaseIndex(
                DataController.getInstance().openCaseID,
            )
        ] as CaseModel;
        const report =
            _case.generatedReports[
                DataController.getInstance().getMostRecentReportIdx()
            ];
        if (report) {
            //download report as docx
            this.elements[2].addEventListener(
                'click',
                async () =>
                    await PageController.getInstance().exportReport(
                        report as ReportModel,
                    ),
            );
            // Button for changing graph to a 95% confidence interval
            this.elements[4].addEventListener('click', () => {
                this.updateGraphNinetyFive(report);
                const graphTitle = document.getElementById('graphTitle');
                if (graphTitle) {
                    this.updateGraphTitle(
                        graphTitle as HTMLElement,
                        `<strong><i>95% Confidence Interval</i></strong>`,
                    );
                } else {
                    console.error('Element graphTitle not found!');
                }
            });

            this.elements[5].addEventListener(
                'click',
                async () =>
                    await PageController.getInstance().printReport(
                        report as ReportModel,
                    ),
            );

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
        document
            .getElementById('compareBtn')!
            .addEventListener(
                'click',
                async () =>
                    await PageController.getInstance().navigateTo(
                        Pages.Compare,
                        SideBar.dataBar,
                    ),
            );
    }

    /**
     * Load elements from the HTML document into the elements array.
     */
    private loadElements(): void {
        this.elements = [
            document.getElementById(
                UI_Elements.reportArchiveButton,
            ) as HTMLElement,
            document.getElementById(
                UI_Elements.backtoDataEntryButton,
            ) as HTMLElement,
            document.getElementById(UI_Elements.downloadButton) as HTMLElement,
            document.getElementById(
                UI_Elements.changeGraphButton90,
            ) as HTMLElement,
            document.getElementById(
                UI_Elements.changeGraphButton95,
            ) as HTMLElement,
            document.getElementById(UI_Elements.printButton) as HTMLElement,
        ];
    }

    /**
     * Load the report data into the report page.
     * @param report The ReportModel to load.
     */
    public loadReport(report: ReportModel): void {
        this.calculateConfidenceIntervals(report);
        const dc = DataController.getInstance();
        // get the current case just so we can get the caseID
        const caseModel = dc.loadedCases[
            dc.findCaseIndex(dc.openCaseID)
        ] as CaseModel;

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
            'pubicSymphysisBar',
            false,
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
            'auricularSurfaceBar',
            false,
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
            'sternalEndBar',
            false,
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
                <p>Actual: ${this.formatThirdMolar(report.getThirdMolar(Side.C))}</p>
            `;
        } else {
            console.error('Element molarData not found!');
        }

        const graphTitle = document.getElementById('graphTitle');
        if (graphTitle) {
            this.updateGraphTitle(
                graphTitle as HTMLElement,
                `<strong><i>95% Confidence Interval</i></strong>`,
            );
        } else {
            console.error('Element graphTitle not found!');
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
        ninetyPercentConfidenceInterval: boolean,
    ): void {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element ${elementId} not found!`);
            return;
        }
        if (ninetyPercentConfidenceInterval) {
            element.innerHTML = `
                <strong>${sectionTitle}:</strong>
                <p>Left: ${leftValue.toFixed(2)}</p>
                <p>90% Confidence Range: ${leftRange.min.toFixed(2)} - ${leftRange.max.toFixed(2)}</p>
                <p>Right: ${rightValue.toFixed(2)}</p>
                <p>90% Confidence Range: ${rightRange.min.toFixed(2)} - ${rightRange.max.toFixed(2)}</p>
                <p>Combined: ${combinedValue.toFixed(2)}</p>
                <p>90% Confidence Range: ${combinedRange.min.toFixed(2)} - ${combinedRange.max.toFixed(2)}</p>
            `;
        } else {
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
     * Public access method for formatThirdMolar.
     * @param value The value to format.
     * @returns The formatted string.
     */
    public accessFormatThirdMolar(value: number): string {
        return this.formatThirdMolar(value);
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
            if (
                Math.min(
                    report.getPubicSymphysisRange(Side.C).min,
                    report.getAuricularSurfaceRange(Side.C).min,
                    report.getSternalEndRange(Side.C).min,
                ) > 18.0
            ) {
                var minAge = Math.min(
                    report.getPubicSymphysisRange(Side.C).min,
                    report.getAuricularSurfaceRange(Side.C).min,
                    report.getSternalEndRange(Side.C).min,
                ).toFixed(2);
            } else {
                var minAge = '18.00';
            }
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
        updateRangeBar(minAgeNum, maxAgeNum, 'ageBar');

        return `${minAge} - ${maxAge}`;
    }

    /**
     * The 90% confidence interval calcutions.
     * @param report The report to calculate the range for.
     * @returns A number array containing the calculated confidence intervals.
     */
    private calculateConfidenceIntervals(report: AbstractReportModel) {
        var standardErrorPubL = this.standardError(
            report.getPubicSymphysisRange(Side.L).max,
            report.getPubicSymphysisRange(Side.L).min,
        );
        var standardErrorPubR = this.standardError(
            report.getPubicSymphysisRange(Side.R).max,
            report.getPubicSymphysisRange(Side.R).min,
        );
        var standardErrorPubC = this.standardError(
            report.getPubicSymphysisRange(Side.C).max,
            report.getPubicSymphysisRange(Side.C).min,
        );
        var standardErrorAurL = this.standardError(
            report.getAuricularSurfaceRange(Side.L).max,
            report.getAuricularSurfaceRange(Side.L).min,
        );
        var standardErrorAurR = this.standardError(
            report.getAuricularSurfaceRange(Side.R).max,
            report.getAuricularSurfaceRange(Side.R).min,
        );
        var standardErrorAurC = this.standardError(
            report.getAuricularSurfaceRange(Side.C).max,
            report.getAuricularSurfaceRange(Side.C).min,
        );
        var standardErrorRibL = this.standardError(
            report.getSternalEndRange(Side.L).max,
            report.getSternalEndRange(Side.L).min,
        );
        var standardErrorRibR = this.standardError(
            report.getSternalEndRange(Side.R).max,
            report.getSternalEndRange(Side.R).min,
        );
        var standardErrorRibC = this.standardError(
            report.getSternalEndRange(Side.C).max,
            report.getSternalEndRange(Side.C).min,
        );

        var ninetyMarginErrorPubL = 1.645 * standardErrorPubL;
        var ninetyMarginErrorPubR = 1.645 * standardErrorPubR;
        var ninetyMarginErrorPubC = 1.645 * standardErrorPubC;
        var ninetyMarginErrorAurL = 1.645 * standardErrorAurL;
        var ninetyMarginErrorAurR = 1.645 * standardErrorAurR;
        var ninetyMarginErrorAurC = 1.645 * standardErrorAurC;
        var ninetyMarginErrorRibL = 1.645 * standardErrorRibL;
        var ninetyMarginErrorRibR = 1.645 * standardErrorRibR;
        var ninetyMarginErrorRibC = 1.645 * standardErrorRibC;

        var meanPubL = this.mean(
            report.getPubicSymphysisRange(Side.L).max,
            report.getPubicSymphysisRange(Side.L).min,
        );
        var meanPubR = this.mean(
            report.getPubicSymphysisRange(Side.R).max,
            report.getPubicSymphysisRange(Side.R).min,
        );
        var meanPubC = this.mean(
            report.getPubicSymphysisRange(Side.C).max,
            report.getPubicSymphysisRange(Side.C).min,
        );
        var meanAurL = this.mean(
            report.getAuricularSurfaceRange(Side.L).max,
            report.getAuricularSurfaceRange(Side.L).min,
        );
        var meanAurR = this.mean(
            report.getAuricularSurfaceRange(Side.R).max,
            report.getAuricularSurfaceRange(Side.R).min,
        );
        var meanAurC = this.mean(
            report.getAuricularSurfaceRange(Side.C).max,
            report.getAuricularSurfaceRange(Side.C).min,
        );
        var meanRibL = this.mean(
            report.getSternalEndRange(Side.L).max,
            report.getSternalEndRange(Side.L).min,
        );
        var meanRibR = this.mean(
            report.getSternalEndRange(Side.R).max,
            report.getSternalEndRange(Side.R).min,
        );
        var meanRibC = this.mean(
            report.getSternalEndRange(Side.C).max,
            report.getSternalEndRange(Side.C).min,
        );

        var minPubL = meanPubL - ninetyMarginErrorPubL;
        var maxPubL = meanPubL + ninetyMarginErrorPubL;
        var minPubR = meanPubR - ninetyMarginErrorPubR;
        var maxPubR = meanPubR + ninetyMarginErrorPubR;
        var minPubC = meanPubC - ninetyMarginErrorPubC;
        var maxPubC = meanPubC + ninetyMarginErrorPubC;
        var minAurL = meanAurL - ninetyMarginErrorAurL;
        var maxAurL = meanAurL + ninetyMarginErrorAurL;
        var minAurR = meanAurR - ninetyMarginErrorAurR;
        var maxAurR = meanAurR + ninetyMarginErrorAurR;
        var minAurC = meanAurC - ninetyMarginErrorAurC;
        var maxAurC = meanAurC + ninetyMarginErrorAurC;
        var minRibL = meanRibL - ninetyMarginErrorRibL;
        var maxRibL = meanRibL + ninetyMarginErrorRibL;
        var minRibR = meanRibR - ninetyMarginErrorRibR;
        var maxRibR = meanRibR + ninetyMarginErrorRibR;
        var minRibC = meanRibC - ninetyMarginErrorRibC;
        var maxRibC = meanRibC + ninetyMarginErrorRibC;

        if ((report as ReportModel).getThirdMolar(Side.C) === 0) {
            var minAgeOverall = Math.min(minPubC, minAurC, minRibC);
        } else {
            if (Math.min(minPubC, minAurC, minRibC) > 18.0) {
                var minAgeOverall = Math.min(minPubC, minAurC, minRibC);
            } else {
                var minAgeOverall = 18.0;
            }
        }

        var maxAgeOverall = Math.max(maxPubC, maxAurC, maxRibC);

        this.ninetyConfidenceInfo = [
            minAgeOverall,
            maxAgeOverall,
            minPubC,
            maxPubC,
            minAurC,
            maxAurC,
            minRibC,
            maxRibC,
            minPubL,
            maxPubL,
            minAurL,
            maxAurL,
            minRibL,
            maxRibL,
            minPubR,
            maxPubR,
            minAurR,
            maxAurR,
            minRibR,
            maxRibR,
            meanPubC,
            meanAurC,
            meanRibC,
            meanPubL,
            meanAurL,
            meanRibL,
            meanPubR,
            meanAurR,
            meanRibR,
        ];
    }

    private standardError(U: number, L: number) {
        var SE = (U - L) / (2 * 1.96);
        return SE;
    }

    private mean(U: number, L: number) {
        var M = (U + L) / 2;
        return M;
    }

    private updateGraphNinety() {
        const summarizedRange = document.getElementById('summarizedRange');
        if (summarizedRange) {
            summarizedRange.textContent = `Summarized Range: ${this.ninetyConfidenceInfo[0].toFixed(2)} - ${this.ninetyConfidenceInfo[1].toFixed(2)}`;
        } else {
            console.error('SummarizedRange not found');
        }
        updateRangeBar(
            this.ninetyConfidenceInfo[0],
            this.ninetyConfidenceInfo[1],
            'ageBar',
        );

        // Display estimated pubic symphysis range
        this.displayDataSection(
            'pubicData',
            'Pubic Symphysis',
            this.ninetyConfidenceInfo[23],
            this.ninetyConfidenceInfo[26],
            this.ninetyConfidenceInfo[20],
            {
                min: this.ninetyConfidenceInfo[8],
                max: this.ninetyConfidenceInfo[9],
            },
            {
                min: this.ninetyConfidenceInfo[14],
                max: this.ninetyConfidenceInfo[15],
            },
            {
                min: this.ninetyConfidenceInfo[2],
                max: this.ninetyConfidenceInfo[3],
            },
            'pubicSymphysisBar',
            true,
        );

        // Display the auricular surface range
        this.displayDataSection(
            'auricularData',
            'Auricular Surface',
            this.ninetyConfidenceInfo[24],
            this.ninetyConfidenceInfo[27],
            this.ninetyConfidenceInfo[21],
            {
                min: this.ninetyConfidenceInfo[10],
                max: this.ninetyConfidenceInfo[11],
            },
            {
                min: this.ninetyConfidenceInfo[16],
                max: this.ninetyConfidenceInfo[17],
            },
            {
                min: this.ninetyConfidenceInfo[4],
                max: this.ninetyConfidenceInfo[5],
            },
            'auricularSurfaceBar',
            true,
        );

        // Display the sternal end range
        this.displayDataSection(
            'sternalData',
            'Sternal End',
            this.ninetyConfidenceInfo[25],
            this.ninetyConfidenceInfo[28],
            this.ninetyConfidenceInfo[22],
            {
                min: this.ninetyConfidenceInfo[12],
                max: this.ninetyConfidenceInfo[13],
            },
            {
                min: this.ninetyConfidenceInfo[18],
                max: this.ninetyConfidenceInfo[19],
            },
            {
                min: this.ninetyConfidenceInfo[6],
                max: this.ninetyConfidenceInfo[7],
            },
            'sternalEndBar',
            true,
        );
    }

    private updateGraphNinetyFive(report: AbstractReportModel) {
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
            'pubicSymphysisBar',
            false,
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
            'auricularSurfaceBar',
            false,
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
            'sternalEndBar',
            false,
        );
    }

    private updateGraphTitle(graphTitle: HTMLElement, title: string) {
        if (graphTitle) {
            graphTitle.innerHTML = title;
        } else {
            console.error('Element graphTitle not found!');
        }
    }
}
