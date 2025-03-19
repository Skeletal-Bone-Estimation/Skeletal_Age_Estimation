// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { DataController } from '../../controllers/DataController';
import { XML_Controller } from '../../controllers/XML_Controller';
import { AbstractCaseModel } from '../../models/AbstractCaseModel';
import { CaseModel } from '../../models/CaseModel';
import { Observers } from '../enums';
import { ObserverIF } from './ObserverIF';

export class AutosaveObserver implements ObserverIF {
    constructor() {}

    /**
     * Executes the appropriate method based on the observer notified.
     * @param arg The observer type.
     * @param data The data to be processed.
     */
    public update(arg: Observers, data: any = null): void {
        if (arg != Observers.autosave) return;
        this.autosave();
    }

    /**
     * Autosaves the current case when triggered.
     */
    private autosave(): void {
        //console.log('autosaving');
        const dc = DataController.getInstance();
        const openCase: AbstractCaseModel =
            dc.loadedCases[dc.findCaseIndex(dc.openCaseID)];
        const filename: string = (openCase as CaseModel).caseID;
        XML_Controller.getInstance().saveAsFile(
            openCase as CaseModel,
            `${openCase.savePath}/${filename}.xml`,
        );
    }
}
