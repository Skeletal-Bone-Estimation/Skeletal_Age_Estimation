import { DataController } from '../../controllers/DataController';
import { XML_Controller } from '../../controllers/XML_Controller';
import { AbstractCaseModel } from '../../models/AbstractCaseModel';
import { CaseModel } from '../../models/CaseModel';
import { ObserverIF } from './ObserverIF';

export class AutosaveObserver implements ObserverIF {
    constructor() {}

    public update(): void {
        this.autosave();
    }

    private autosave(): void {
        //console.log('autosaving');
        const openCase: AbstractCaseModel =
            DataController.getInstance().openCase;
        const filename: string = (openCase as CaseModel).caseID;
        XML_Controller.getInstance().saveAsFile(
            openCase as CaseModel,
            `save_data/${filename}.xml`,
        );
    }
}
