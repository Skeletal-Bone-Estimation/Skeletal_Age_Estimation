//DataController.ts
import { AbstractCaseModel } from '../models/AbstractCaseModel';
import { CaseModel } from '../models/CaseModel';
import { NullCaseModel } from '../models/NullCaseModel';
import { ReportModel } from '../models/ReportModel';
import { Sex, Affinity, ThirdMolar } from '../utils/enums';
import { XML_Controller } from './XML_Controller';

export class DataController {
    private static instance: DataController;
    private xmlController: XML_Controller = XML_Controller.getInstance();
    private _loadedCases: CaseModel[];
    private _openCase: AbstractCaseModel;

    private constructor() {
        this._loadedCases = [];
        this._openCase = new NullCaseModel();
    }

    public static getInstance(): DataController {
        if (!this.instance) this.instance = new DataController();
        return this.instance;
    }

    public get loadedCases(): CaseModel[] {
        return this._loadedCases;
    }

    public get openCase(): AbstractCaseModel {
        return this._openCase;
    }

    public getReport(id: number): ReportModel {
        return (this.openCase as CaseModel).generatedReports[id];
    }

    private getReports(): { [id: number]: ReportModel } {
        return (this._openCase as CaseModel).generatedReports;
    }

    public addCase(newCase: CaseModel): void {
        this._loadedCases.push(newCase);
    }

    public deleteCase(selectedCase: CaseModel): void {
        const index = this._loadedCases.indexOf(selectedCase);
        this._loadedCases.splice(index, 1);
    }

    public loadCase(event: Event): void {
        this.xmlController.loadFile(event, () => {
            const loadedCase: AbstractCaseModel =
                this.xmlController.parseSingleFile();
            this.addCase(loadedCase as CaseModel);
            this._openCase = loadedCase;
        });
    }

    public loadCollection(event: Event): void {
        this.xmlController.loadCollection(event);
        const loadedCases: CaseModel[] = this.xmlController.parseCollection();
        this._loadedCases = loadedCases;
    }

    public editCaseID(newID: string): void {
        if (this._openCase instanceof CaseModel) return;
        (this._openCase as CaseModel).caseID = newID;
        this.openCase.notify(); //autosave
    }

    public editSex(newSex: Sex): void {
        if (this._openCase instanceof CaseModel) return;
        (this._openCase as CaseModel).sex = newSex;
        this.openCase.notify(); //autosave
    }

    public editPopulationAffinity(newAffinity: Affinity): void {
        if (this._openCase instanceof CaseModel) return;
        (this._openCase as CaseModel).populationAffinity = newAffinity;
        this.openCase.notify(); //autosave
    }

    public editThirdMolar(newPhase: ThirdMolar): void {
        if (this._openCase instanceof CaseModel) return;
        (this._openCase as CaseModel).thirdMolar = newPhase;
        this.openCase.notify(); //autosave
    }

    public editPubicSymphysis(data: { [key: string]: number }): void {
        if (this._openCase instanceof CaseModel) return;
        (this._openCase as CaseModel).pubicSymphysis = data;
        this.openCase.notify(); //autosave
    }

    public editAuricularEdge(data: { [key: string]: number }): void {
        if (this._openCase instanceof CaseModel) return;
        (this._openCase as CaseModel).auricularEdge = data;
        this.openCase.notify(); //autosave
    }

    public editFourthRib(data: { [key: string]: number }): void {
        if (this._openCase instanceof CaseModel) return;
        (this._openCase as CaseModel).fourthRib = data;
        this.openCase.notify(); //autosave
    }

    public extractData(id: string): { [key: string]: number } {
        throw new Error(
            'temporary method to stand in for pulling data from the GUI until the function is complete',
        );
    }
}
