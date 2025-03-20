import { DataController } from '../controllers/DataController';
import { PageController } from '../controllers/PageController';
import { AbstractReportModel } from '../models/AbstractReportModel';
import { CaseModel } from '../models/CaseModel';
import { NullReportModel } from '../models/NullReportModel';
import { ReportModel } from '../models/ReportModel';
import { Observers, Pages, SideBar, UI_Elements } from '../utils/enums';
import { AbstractModal } from './AbstractModal';

export class CompareModal extends AbstractModal {
    private selectedIdx: number;

    constructor(document: Document) {
        super(document);
        this.selectedIdx = -1;
    }

    /**
     * Override render method to display the modal content.
     * @param htmlContent The HTML content to render.
     */
    public override async render(htmlContent: string): Promise<void> {
        this.modalContent.innerHTML = htmlContent;
        this.initEventListeners();
        await this.fillReportList();
    }

    /**
     * Override method to open the modal.
     */
    public override async openModal(): Promise<void> {
        this.modalContainer.style.display = 'flex';
    }

    /**
     * Initialize event listeners for the modal.
     */
    protected override initEventListeners(): void {
        const dc = DataController.getInstance();
        const pc = PageController.getInstance();

        //view selected report button
        document
            .getElementById(UI_Elements.viewReportCompareButton)
            ?.addEventListener('click', async () => {
                await this.fillReportList();
                const list = document.getElementById(
                    UI_Elements.reportArchiveList,
                ) as HTMLElement;
                if (
                    list.innerHTML != 'No cases loaded.' &&
                    list.innerHTML != 'No reports loaded in any case.' &&
                    list.innerHTML != ''
                ) {
                    const openCase = dc.loadedCases[
                        dc.findCaseIndex(dc.openCaseID)
                    ] as CaseModel;

                    //TODO: check if idx == -1 for errors
                    const report = openCase.generatedReports[this.selectedIdx];

                    if (report instanceof NullReportModel) {
                        console.error('Null report selected.');
                        pc.navigateTo(Pages.DataEntry, SideBar.createBar);
                        return;
                    }

                    openCase.notify(Observers.setSelectedReport, report.id);
                    pc.loadReportCompare(this.selectedIdx);

                    this.closeModal();
                }
            });

        //close modal button
        document
            .getElementById(UI_Elements.closeModalButton)
            ?.addEventListener('click', () => this.closeModal());
    }

    /**
     * Fill the report list with available reports.
     */
    private async fillReportList(): Promise<void> {
        const dataController = DataController.getInstance();
        const list = document.getElementById(
            UI_Elements.reportArchiveList,
        ) as HTMLElement;

        //empty cases return
        if (dataController.loadedCases.length == 0) {
            list.innerHTML = 'No cases loaded.';
            return;
        }

        const dc = DataController.getInstance();
        const _case = dc.loadedCases[
            dc.findCaseIndex(dc.openCaseID)
        ] as CaseModel;
        //console.log('Loaded reports:', _case.generatedReports);

        _case.generatedReports.forEach((report: AbstractReportModel) => {
            const element = document.createElement('li');
            const reportID: string = (report as ReportModel).id;
            element.textContent = `Report: ${reportID}`;
            element.addEventListener('click', () => {
                //select element
                const selected = document.querySelector('.selected');
                if (selected) selected.classList.remove('selected');
                element.classList.add('selected');

                //save attribute for later
                this.selectedIdx = dataController.findReportIndex(reportID);
            });
            list.appendChild(element);
        });

        if (list.innerHTML == '') list.innerHTML = 'No reports loaded.';
    }
}
