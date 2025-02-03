import { DataController } from '../controllers/DataController';
import { PageController } from '../controllers/PageController';
import { AbstractReportModel } from '../models/AbstractReportModel';
import { CaseModel } from '../models/CaseModel';
import { NullReportModel } from '../models/NullReportModel';
import { ReportModel } from '../models/ReportModel';
import { Observers, Pages, SideBar, UI_Elements } from '../utils/enums';
import { AbstractModal } from './AbstractModal';

export class ReportModal extends AbstractModal {
    private selectedReportID: string;

    constructor(document: Document) {
        super(document);
        this.selectedReportID = '';
    }

    public override async render(htmlContent: string): Promise<void> {
        this.modalContent.innerHTML = htmlContent;
        await this.fillReportList();
        this.initEventListeners();
    }

    public override async openModal(): Promise<void> {
        this.modalContainer.style.display = 'flex';
    }

    protected override initEventListeners(): void {
        //view selected report button
        document
            .getElementById(UI_Elements.viewReportButton)
            ?.addEventListener('click', () => {
                const list = document.getElementById(
                    UI_Elements.reportArchiveList,
                ) as HTMLElement;
                if (
                    list.innerHTML != 'No cases loaded.' &&
                    list.innerHTML != 'No reports loaded in any case.' &&
                    list.innerHTML != ''
                ) {
                    const openCase = DataController.getInstance()
                        .openCase as CaseModel;
                    const report =
                        openCase.generatedReports[this.selectedReportID];
                    if (report instanceof NullReportModel) {
                        console.error('Null report selected.');
                        PageController.getInstance().navigateTo(
                            Pages.DataEntry,
                            SideBar.dataBar,
                        );
                        return;
                    }
                    openCase.notify(Observers.setSelectedReport, report);
                    PageController.getInstance().unloadModal();
                    PageController.getInstance().loadReport(
                        report as ReportModel,
                    );
                    this.closeModal();
                }
            });

        //close modal button
        document
            .getElementById(UI_Elements.closeModalButton)
            ?.addEventListener('click', () => this.closeModal());
    }

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

        const _case = dataController.openCase as CaseModel;

        Object.keys(_case.generatedReports).forEach((report) => {
            const element = document.createElement('li');
            element.textContent = `Report: ${report}`;
            element.addEventListener('click', () => {
                //select element
                const selected = document.querySelector('.selected');
                if (selected) selected.classList.remove('selected');
                element.classList.add('selected');

                //save attribute for later
                this.selectedReportID = report;
            });
            list.appendChild(element);
        });

        if (list.innerHTML == '') list.innerHTML = 'No reports loaded.';
    }
}
