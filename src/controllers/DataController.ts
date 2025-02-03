// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

//DataController.ts
import { rmSync } from 'fs';
import { AbstractCaseModel } from '../models/AbstractCaseModel';
import { CaseModel } from '../models/CaseModel';
import { NullCaseModel } from '../models/NullCaseModel';
import {
    Sex,
    Affinity,
    ThirdMolar,
    CaseElement,
    PubicSymphysis,
    SternalEnd,
    AuricularArea,
    Observers,
} from '../utils/enums';
import { BuildDirector } from '../utils/builder/BuildDirector';
import { XML_Controller } from './XML_Controller';
import { NullReportModel } from '../models/NullReportModel';
import { AbstractReportModel } from '../models/AbstractReportModel';

export class DataController {
    private static instance: DataController;
    private xmlController: XML_Controller = XML_Controller.getInstance();
    private _loadedCases: CaseModel[];
    private _openCase: AbstractCaseModel;
    private _openReport: AbstractReportModel;

    private constructor() {
        this._loadedCases = [];
        this._openCase = new NullCaseModel();
        this._openReport = new NullReportModel();
    }

    //retreives the instance of the PAgeController singleton
    public static getInstance(): DataController {
        if (!this.instance) this.instance = new DataController();
        return this.instance;
    }

    public get openReport(): AbstractReportModel {
        return this._openReport;
    }

    public set openReport(report: AbstractReportModel) {
        this._openReport = report;
    }

    //retreives the reference to the list of currently opened CaseModel objects
    public get loadedCases(): CaseModel[] {
        return this._loadedCases;
    }

    //retreives the reference to the currently opened CaseModel object
    public get openCase(): AbstractCaseModel {
        return this._openCase;
    }

    //retreives the ReportModel of the currently opened case based on the id parameter
    public getReport(id: string): AbstractReportModel {
        return (this.openCase as CaseModel).generatedReports[id];
    }

    public getNumReports(): number {
        var sum: number = 0;
        this._loadedCases.forEach(
            (_case) => (sum += Object.entries(_case.generatedReports).length),
        );
        return sum;
    }

    //retreives the list of ReportModels stored by the currently opened case
    public getReports(): { [id: string]: AbstractReportModel } {
        return (this._openCase as CaseModel).generatedReports;
    }

    //adds a case to the list of opened cases
    public addCase(newCase: CaseModel): void {
        this._loadedCases.push(newCase);
    }

    //removes a case from the list of opened cases
    public deleteCase(selectedCase: CaseModel): void {
        const index = this._loadedCases.indexOf(selectedCase);
        this._loadedCases.splice(index, 1);
    }

    //delegates to the xml controller to handle loading a file from xml and stores a refernece to the loaded object
    public loadCaseFromFile(event: Event): void {
        this.xmlController.loadFile(event, () => {
            //callback function executed within the implementation of XML_Controller.loadFile(...)
            const loadedCase: AbstractCaseModel =
                this.xmlController.parseSingleFile();
            this.addCase(loadedCase as CaseModel);
            this._openCase = loadedCase;
        });
    }

    //delegates to XML_Controller to handle parsing the collection and stores a reference to the resulting list
    public loadCollectionFromFile(event: Event): void {
        this.xmlController.loadCollection(event);
        const loadedCases: CaseModel[] = this.xmlController.parseCollection();
        this._loadedCases = loadedCases;
    }

    //edits an attribute of the currently opened CaseModel object based on the enumeration parameter
    public editCase(
        element: CaseElement,
        content:
            | string
            | Affinity
            | Sex
            | ThirdMolar
            | PubicSymphysis
            | SternalEnd
            | AuricularArea
            | { [key: string]: number },
    ): void {
        if (!(this._openCase instanceof CaseModel)) return;

        var obj: CaseModel = this.openCase as CaseModel;
        var oldName = obj.caseID;

        switch (element) {
            case CaseElement.caseID:
                obj.caseID = content as string;
                break;
            case CaseElement.sex:
                obj.sex = content as Sex;
                break;
            case CaseElement.affinity:
                obj.populationAffinity = content as Affinity;
                break;
            case CaseElement.thirdMolarTL:
                obj.thirdMolarTL = content as ThirdMolar;
                break;
            case CaseElement.thirdMolarTR:
                obj.thirdMolarTR = content as ThirdMolar;
                break;
            case CaseElement.thirdMolarBL:
                obj.thirdMolarBL = content as ThirdMolar;
                break;
            case CaseElement.thirdMolarBR:
                obj.thirdMolarBR = content as ThirdMolar;
                break;
            case CaseElement.pubicSymphysisL:
                obj.pubicSymphysisL = content as PubicSymphysis;
                break;
            case CaseElement.pubicSymphysisR:
                obj.pubicSymphysisR = content as PubicSymphysis;
                break;
            case CaseElement.auricularAreaL:
                obj.auricularAreaL = content as AuricularArea;
                break;
            case CaseElement.auricularAreaR:
                obj.auricularAreaR = content as AuricularArea;
                break;
            case CaseElement.fourthRibL:
                obj.fourthRibL = content as SternalEnd;
                break;
            case CaseElement.fourthRibR:
                obj.fourthRibR = content as SternalEnd;
                break;
            case CaseElement.notes:
                obj.notes = content as string;
                break;
            default:
                throw new Error(
                    'Invalid CaseElement passed to DataController.editCase(...)',
                );
        }

        this.openCase.notify(Observers.autosave); //autosave
        if (element === CaseElement.caseID) rmSync(`save_data/${oldName}.xml`); //deletes the file under the old case id
    }

    public createCase(
        caseID: string,
        sex: Sex,
        affinity: Affinity,
        thirdMolarTL: ThirdMolar = ThirdMolar.Unknown,
        thirdMolarTR: ThirdMolar = ThirdMolar.Unknown,
        thirdMolarBL: ThirdMolar = ThirdMolar.Unknown,
        thirdMolarBR: ThirdMolar = ThirdMolar.Unknown,
        pubicSymphysisL: PubicSymphysis = PubicSymphysis.Unknown,
        pubicSymphysisR: PubicSymphysis = PubicSymphysis.Unknown,
        auricularAreaL: AuricularArea = AuricularArea.Unknown,
        auricularAreaR: AuricularArea = AuricularArea.Unknown,
        fourthRibL: SternalEnd = SternalEnd.Unknown,
        fourthRibR: SternalEnd = SternalEnd.Unknown,
        notes: string = '',
    ) {
        var director = new BuildDirector();

        director.caseBuilder.setCaseID(caseID);
        director.caseBuilder.setSex(sex);
        director.caseBuilder.setPopulationAffinity(affinity);
        director.caseBuilder.setThirdMolarTL(thirdMolarTL);
        director.caseBuilder.setThirdMolarTR(thirdMolarTR);
        director.caseBuilder.setThirdMolarBL(thirdMolarBL);
        director.caseBuilder.setThirdMolarBR(thirdMolarBR);
        director.caseBuilder.setPubicSymphysisL(pubicSymphysisL);
        director.caseBuilder.setPubicSymphysisR(pubicSymphysisR);
        director.caseBuilder.setAuricularAreaL(auricularAreaL);
        director.caseBuilder.setAuricularAreaR(auricularAreaR);
        director.caseBuilder.setFourthRibL(fourthRibL);
        director.caseBuilder.setFourthRibR(fourthRibR);
        director.caseBuilder.setNotes(notes);

        this._openCase = director.makeCase();
    }

    public createReport(results: {}): AbstractReportModel {
        var director = new BuildDirector();
        return director.makeReport(results);
    }

    public getMostRecentReport(): AbstractReportModel {
        return (this.openCase as CaseModel).mostRecentReport;
    }

    public setMostRecentReport(report: AbstractReportModel): void {
        (this.openCase as CaseModel).mostRecentReport = report;
    }

    public selectReport(reportID: string): void {
        // console.log('Most Recent (DC):', this.getMostRecentReport());
        // console.log('Open Report(DC):', this._openReport);
        Object.keys((this.openCase as CaseModel).generatedReports).forEach(
            (report) => {
                if (report == reportID)
                    this.openCase.notify(
                        Observers.setSelectedReport,
                        this.getReport(report),
                    );
            },
        );
    }
}
