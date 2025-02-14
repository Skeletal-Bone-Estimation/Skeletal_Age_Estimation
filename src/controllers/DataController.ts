// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
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
import { ReportModel } from '../models/ReportModel';

export class DataController {
    private static instance: DataController;
    public xmlController: XML_Controller = XML_Controller.getInstance();
    private _loadedCases: CaseModel[];
    private _openCase: AbstractCaseModel;
    private _openReport: AbstractReportModel;

    private constructor() {
        this._loadedCases = [];
        this._openCase = new NullCaseModel();
        this._openReport = new NullReportModel();
    }

    /**
     * Retrieves the singleton instance from the static DataController object.
     * @returns The singleton instance.
     */
    public static getInstance(): DataController {
        if (!this.instance) this.instance = new DataController();
        return this.instance;
    }

    /**
     * Accessor for the _openReport attribute.
     * @returns The open AbstractReportModel object.
     */
    public get openReport(): AbstractReportModel {
        return this._openReport;
    }

    /**
     * Mutator for the _openReport attribute.
     * @param report The new AbstractReportModel being assigned.
     */
    public set openReport(report: AbstractReportModel) {
        this._openReport = report;
    }

    /**
     * Retrieves the reference to the list of currently opened CaseModel objects.
     * @returns The list of loaded CaseModel objects.
     */
    public get loadedCases(): CaseModel[] {
        return this._loadedCases;
    }

    /**
     * Accessor for the openCase attribute.
     * @returns The _openCase attribute.
     */
    public get openCase(): AbstractCaseModel {
        return this._openCase;
    }

    /**
     * Retrieves the number of reports across all loaded cases.
     * @returns The total number of reports.
     */
    public getNumReports(): number {
        var sum: number = 0;
        this._loadedCases.forEach(
            (_case) => (sum += Object.entries(_case.generatedReports).length),
        );
        return sum;
    }

    /**
     * Retrieves the list of ReportModels stored by the currently opened case.
     * @returns List of AbstractReportModel objects.
     */
    public getReports(): AbstractReportModel[] {
        return (this._openCase as CaseModel).generatedReports;
    }

    /**
     * Adds a case to the list of opened cases.
     * @param newCase The new CaseModel to be added.
     */
    public addCase(newCase: CaseModel): void {
        this._loadedCases.push(newCase);
    }

    /**
     * Removes a case from the list of opened cases.
     * @param selectedCase The CaseModel to be removed.
     */
    public deleteCase(selectedCase: CaseModel): void {
        const index = this._loadedCases.indexOf(selectedCase);
        this._loadedCases.splice(index, 1);
    }

    /**
     * Delegates to the XML controller to handle loading a file from XML and stores a reference to the loaded object.
     * @param event The event triggering the file load.
     */
    public loadCaseFromFile(event: Event): void {
        this.xmlController.loadFile(event, () => {
            //callback function executed within the implementation of XML_Controller.loadFile(...)
            const loadedCase: AbstractCaseModel =
                this.xmlController.parseSingleFile();
            this.addCase(loadedCase as CaseModel);
            this._openCase = loadedCase;
        });
    }

    /**
     * Delegates to XML_Controller to handle parsing the collection and stores a reference to the resulting list.
     * @param event The event triggering the collection load.
     */
    public loadCollectionFromFile(event: Event): void {
        this.xmlController.loadCollection(event);
        const loadedCases: CaseModel[] = this.xmlController.parseCollection();
        this._loadedCases = loadedCases;
    }

    /**
     * Edits an attribute of the currently opened CaseModel object based on the enumeration parameter.
     * @param element The CaseElement to be edited.
     * @param content The new content for the specified element.
     */
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

    /**
     * Creates a new case with the specified attributes.
     * @param caseID The ID of the new case.
     * @param sex The sex of the individual in the case.
     * @param affinity The population affinity of the individual in the case.
     * @param thirdMolarTL The third molar status for the top left.
     * @param thirdMolarTR The third molar status for the top right.
     * @param thirdMolarBL The third molar status for the bottom left.
     * @param thirdMolarBR The third molar status for the bottom right.
     * @param pubicSymphysisL The pubic symphysis status for the left side.
     * @param pubicSymphysisR The pubic symphysis status for the right side.
     * @param auricularAreaL The auricular area status for the left side.
     * @param auricularAreaR The auricular area status for the right side.
     * @param fourthRibL The sternal end status for the left fourth rib.
     * @param fourthRibR The sternal end status for the right fourth rib.
     * @param notes Additional notes for the case.
     */
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
        this.addCase(this._openCase as CaseModel);
    }

    /**
     * Creates a new report with the specified results.
     * @param results The results to be included in the report.
     * @returns The newly created AbstractReportModel.
     */
    public createReport(results: {}): AbstractReportModel {
        var director = new BuildDirector();
        return director.makeReport(results);
    }

    /**
     * Retrieves the most recent report from the currently opened case.
     * @returns The most recent AbstractReportModel.
     */
    public getMostRecentReport(): AbstractReportModel {
        return (this.openCase as CaseModel).mostRecentReport;
    }

    /**
     * Sets the most recent report for the currently opened case.
     * @param report The new most recent AbstractReportModel.
     */
    public setMostRecentReport(report: AbstractReportModel): void {
        (this.openCase as CaseModel).mostRecentReport = report;
    }

    /**
     * Finds the index of a report by its ID.
     * @param id The ID of the report to find.
     * @returns The index of the report, or -1 if not found.
     */
    public findReportIndex(id: string): number {
        var idx = -1;
        const _case: CaseModel = this._openCase as CaseModel;
        for (var i: number = 0; i < _case.generatedReports.length; i++) {
            if ((_case.generatedReports[i] as ReportModel).id == id) {
                idx = i;
                break;
            }
        }
        console.log(`Index of ${id} found at ${idx}`);
        return idx;
    }
}
