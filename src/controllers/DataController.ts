//DataController.ts

import { CaseModel } from "../models/CaseModel";
import { NullCaseModel } from "../models/NullCaseModel";
import { ReportModel } from "../models/ReportModel";
import { XML_Controller } from "./XML_Controller";

export class DataController {
    private static instance : DataController;
    private xmlController : XML_Controller = XML_Controller.getInstance();
    private _loadedCases: CaseModel[];
    private _openCase: CaseModel;

    private constructor() {
        this._loadedCases = [];
        this._openCase = new NullCaseModel()
    }

    public static getInstance() : DataController {
        if (!this.instance) this.instance = new DataController();
        return this.instance;
    }

    public get loadedCases(): CaseModel[] {
        return this._loadedCases;
    }

    public get openCase(): CaseModel {
        return this._openCase;
    }

    public getReport(id : number) : ReportModel {
        return this.openCase.generatedReports[id]
    }

    private getReports(): { [id: number]: ReportModel } {
        return this._openCase.generatedReports;
    }

    public addCase(newCase : CaseModel) : void {
        this._loadedCases.push(newCase);
    }

    public deleteCase(selectedCase : CaseModel) : void {
        const index = this._loadedCases.indexOf(selectedCase);
        this._loadedCases.splice(index, 1);
    }

    public loadCase(event : Event) : void {
        this.xmlController.loadFile(event)
        //const loadedCase : CaseModel = this.xmlController.parseSingleFile();
        //this.addCase(loadedCase);
        //this._openCase = loadedCase;
    }

    public loadCollection(event : Event) : void {
        this.xmlController.loadCollection(event);
        const loadedCases : CaseModel[] = this.xmlController.parseCollection();
        this._loadedCases = loadedCases;
    }
}