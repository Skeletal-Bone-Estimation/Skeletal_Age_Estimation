import { DataController } from '../controllers/DataController';
import { PageController } from '../controllers/PageController';
import { CaseModel } from '../models/CaseModel';
import { UI_Elements } from '../utils/enums';
import { AbstractModal } from './AbstractModal';

export class ReportModal extends AbstractModal {
    private selectedCaseID: string;
    private selectedReportID: string;

    constructor(document: Document) {
        super(document);
        this.selectedCaseID = '';
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
                    PageController.getInstance().viewReportFromModal(
                        this.selectedCaseID,
                        this.selectedReportID,
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

        //iterate cases
        dataController.loadedCases.forEach((_case) => {
            var reports = _case.generatedReports;
            list.innerHTML = ''; //clear list

            //iterate reports
            Object.keys(reports).forEach((report) => {
                const element = document.createElement('li');
                element.textContent = `Case: ${(dataController.openCase as CaseModel).caseID} - Report: ${report}`;
                element.addEventListener('click', () => {
                    //select element
                    const selected = document.querySelector('.selected');
                    if (selected) selected.classList.remove('selected');
                    element.classList.add('selected');

                    //save attributes for later
                    this.selectedCaseID = _case.caseID;
                    this.selectedReportID = report;
                });
                list.appendChild(element);
            });
        });

        if (list.innerHTML == '')
            list.innerHTML = 'No reports loaded in any case.';
    }
}
