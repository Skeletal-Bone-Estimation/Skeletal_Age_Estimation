// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { DataController } from '../../controllers/DataController';
import { XML_Controller } from '../../controllers/XML_Controller';
import { AbstractCaseModel } from '../../models/AbstractCaseModel';
import { CaseModel } from '../../models/CaseModel';
import { Observers } from '../enums';
import { ObserverIF } from './ObserverIF';

export class AutosaveObserver implements ObserverIF {
    constructor() {}

    // executes the appropriate method based on the observer notified
    public update(arg: Observers, data: any = null): void {
        if (arg != Observers.autosave) return;
        this.autosave();
    }

    //autosaves the current case when triggered
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
