//DataController.ts

import { dir } from 'console';
import { AbstractCaseModel } from '../models/AbstractCaseModel';
import { Affinity, CaseModel, Sex, ThirdMolar } from '../models/CaseModel';
import { NullCaseModel } from '../models/NullCaseModel';
import { ReportModel } from '../models/ReportModel';
import { BuildDirector } from '../utils/builder/BuildDirector';
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

    public createCase(
        caseID: string,
        sex: Sex,
        affinity: Affinity,
        thirdMolar: ThirdMolar,
        pubic: { [key: string]: number },
        auricular: { [key: string]: number },
        fourthRib: { [key: string]: number },
    ) {
        var director = new BuildDirector();

        director.caseBuilder.setCaseID(caseID);
        director.caseBuilder.setSex(sex);
        director.caseBuilder.setPopulationAffinity(affinity);
        director.caseBuilder.setThirdMolar(thirdMolar);
        director.caseBuilder.setPubicSymphysis(pubic);
        director.caseBuilder.setAuricularEdge(auricular);
        director.caseBuilder.setFourthRib(fourthRib);

        this._openCase = director.makeCase();
    }
}
