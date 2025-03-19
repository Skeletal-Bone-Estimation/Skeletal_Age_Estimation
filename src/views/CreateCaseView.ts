// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { PageController } from '../controllers/PageController';
import { Modals, Pages, SideBar, UI_Elements } from '../utils/enums';
import { AbstractView } from './AbstractView';
import { XML_Controller } from '../controllers/XML_Controller';
import { CaseModel } from '../models/CaseModel';
import { DataController } from '../controllers/DataController';
import { dialog, Dialog, ipcMain, ipcRenderer } from 'electron';

export class CreateCaseView extends AbstractView {
    private savePath: string = '';

    constructor(document: Document) {
        super(document);
    }

    /**
     * Specialized method to load content with specific case creation page requirements.
     * @param htmlContent The HTML content to render.
     */
    public override render(htmlContent: string): void {
        //console.log('loaded from CaseCreationView);
        //console.log('Rendering CreateCaseView'); // Debugging line
        (
            document.getElementById('topBarButtons') as HTMLElement
        ).style.display = 'flex';
        this.contentDiv.innerHTML = htmlContent;
        this.initEventListeners();
        this.setSidebarListeners();
    }

    /**
     * Initialize event listeners for the case creation page.
     */
    protected override initEventListeners(): void {
        document
            .getElementById(UI_Elements.createStartCase)!
            .addEventListener('click', () => {
                var caseIDinput = document.getElementById(
                    'case',
                ) as HTMLInputElement;
                var sexSelect = document.getElementById(
                    'sex',
                ) as HTMLSelectElement;
                var populationAffinitySelect = document.getElementById(
                    'race',
                ) as HTMLSelectElement;

                var caseID = caseIDinput.value.trim();
                var sex = parseInt(sexSelect.value);
                var populationAffinity = parseInt(
                    populationAffinitySelect.value,
                );

                //console.log({ caseID, sex, populationAffinity }); // Debugging line

                PageController.getInstance().createCase(
                    caseID,
                    sex,
                    populationAffinity,
                    this.savePath,
                );
                const dc = DataController.getInstance();
                XML_Controller.getInstance().saveAsFile(
                    dc.loadedCases[
                        dc.findCaseIndex(dc.openCaseID)
                    ] as CaseModel,
                    `${this.savePath}/${DataController.getInstance().openCaseID}.xml`,
                );

                PageController.getInstance().navigateTo(
                    Pages.DataEntry,
                    SideBar.dataBar,
                );
            });

        document
            .getElementById('selectFolderBtn')!
            .addEventListener('click', async () => {
                const path: string | null =
                    await window.electronAPI.selectFolder();
                if (path) {
                    document.getElementById('selectedPath')!.innerHTML = path;
                    document.getElementById('selectFolderBtn')!.innerHTML =
                        'Select New Folder';
                    this.savePath = path;
                } else
                    PageController.getInstance().loadModal(
                        Modals.Error,
                        'A save location must be selected.',
                    );
            });
    }
}
