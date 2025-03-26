import { DataController } from '../controllers/DataController';
import { PageController } from '../controllers/PageController';
import { Pages, SideBar } from '../utils/enums';

export class CaseItem {
    private caseID: string;

    constructor(caseID: string) {
        this.caseID = caseID;
    }

    public get id(): string {
        return this.caseID;
    }

    public renderCase(): void {
        const caseList: HTMLElement = document.getElementById(
            'caseList',
        ) as HTMLElement;

        const caseDiv = document.createElement('div');
        caseDiv.classList.add('caseItem');

        const caseID_Label = document.createElement('span');
        caseID_Label.textContent = this.caseID;

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('caseButtons');

        const makeActiveBtn = document.createElement('button');

        const activeCaseID = DataController.getInstance().openCaseID;
        //console.log('Active Case:', activeCaseID);

        if (this.caseID === activeCaseID) {
            makeActiveBtn.textContent = 'Active';
            makeActiveBtn.disabled = true;
        } else {
            makeActiveBtn.textContent = 'Select';
            makeActiveBtn.disabled = false;
        }

        makeActiveBtn.addEventListener('click', async () => {
            PageController.getInstance().makeActiveCase(this.caseID);
            makeActiveBtn.textContent = 'Active';
            makeActiveBtn.disabled = true;
            PageController.getInstance().renderCases();
            await PageController.getInstance().navigateTo(
                Pages.DataEntry,
                SideBar.dataBar,
            );
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
            PageController.getInstance().deleteCaseItem(this.caseID);
            PageController.getInstance().renderCases();
        });

        buttonDiv.appendChild(makeActiveBtn);
        buttonDiv.appendChild(deleteBtn);
        caseDiv.appendChild(caseID_Label);
        caseDiv.appendChild(buttonDiv);
        caseList.appendChild(caseDiv);
    }
}
