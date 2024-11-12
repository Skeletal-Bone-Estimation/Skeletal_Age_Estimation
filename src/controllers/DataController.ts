//DataController.ts
import { existsSync, rmSync } from 'fs';
import { AbstractCaseModel } from '../models/AbstractCaseModel';
import { CaseModel } from '../models/CaseModel';
import { NullCaseModel } from '../models/NullCaseModel';
import { ReportModel } from '../models/ReportModel';
import { Sex, Affinity, ThirdMolar, CaseElement } from '../utils/enums';
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

    //retreives the instance of the PAgeController singleton
    public static getInstance(): DataController {
        if (!this.instance) this.instance = new DataController();
        return this.instance;
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
    public getReport(id: number): ReportModel {
        return (this.openCase as CaseModel).generatedReports[id];
    }

    //retreives the list of ReportModels stored by the currently opened case
    private getReports(): { [id: number]: ReportModel } {
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
            case CaseElement.thirdMolar:
                obj.thirdMolar = content as ThirdMolar;
                break;
            case CaseElement.pubicSymphysis:
                obj.pubicSymphysis = content as {
                    [key: string]: number;
                };
                break;
            case CaseElement.auricularEdge:
                obj.auricularEdge = content as {
                    [key: string]: number;
                };
                break;
            case CaseElement.fourthRib:
                obj.fourthRib = content as {
                    [key: string]: number;
                };
                break;
            default:
                throw new Error(
                    'Invalid CaseElement passed to DataController.editCase(...)',
                );
        }

        this.openCase.notify(); //autosave
        if (element === CaseElement.caseID) rmSync(`save_data/${oldName}.xml`); //deletes the file under the old case id
    }

    //TODO: pull data from data entry screen into case model
    public extractData(id: string): { [key: string]: number } {
        throw new Error(
            'temporary method to stand in for pulling data from the GUI until the function is complete',
        );
    }
}
