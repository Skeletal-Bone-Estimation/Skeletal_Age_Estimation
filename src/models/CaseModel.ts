// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { DataController } from '../controllers/DataController';
import {
    Affinity,
    AuricularArea,
    PubicSymphysis,
    Sex,
    SternalEnd,
    ThirdMolar,
} from '../utils/enums';
import { AutosaveObserver } from '../utils/observer/AutosaveObserver';
import { ReportManagerObserver } from '../utils/observer/ReportManagerOberver';
import { AbstractCaseModel } from './AbstractCaseModel';
import { AbstractReportModel } from './AbstractReportModel';
import { ReportModel } from './ReportModel';

//CaseModel.ts

export class CaseModel extends AbstractCaseModel {
    protected _caseID: string;
    protected _populationAffinity: Affinity;
    protected _sex: Sex;
    protected _thirdMolarTL: ThirdMolar;
    protected _thirdMolarTR: ThirdMolar;
    protected _thirdMolarBL: ThirdMolar;
    protected _thirdMolarBR: ThirdMolar;
    protected _pubicSymphysisL: PubicSymphysis;
    protected _pubicSymphysisR: PubicSymphysis;
    protected _auricularAreaL: AuricularArea;
    protected _auricularAreaR: AuricularArea;
    protected _fourthRibL: SternalEnd;
    protected _fourthRibR: SternalEnd;
    protected _notes: string;
    protected _generatedReports: { [id: string]: AbstractReportModel };
    private _mostRecentReport: AbstractReportModel;

    constructor(
        caseID: string,
        populationAffinity: Affinity,
        sex: Sex,
        thirdMolarTL: ThirdMolar,
        thirdMolarTR: ThirdMolar,
        thirdMolarBL: ThirdMolar,
        thirdMolarBR: ThirdMolar,
        pubicSymphysisL: PubicSymphysis,
        pubicSymphysisR: PubicSymphysis,
        auricularAreaL: AuricularArea,
        auricularAreaR: AuricularArea,
        fourthRibL: SternalEnd,
        fourthRibR: SternalEnd,
        notes: string,
        generatedReports: { [key: string]: AbstractReportModel },
    ) {
        super();
        this._caseID = caseID;
        this._populationAffinity = populationAffinity;
        this._sex = sex;
        this._thirdMolarTL = thirdMolarTL;
        this._thirdMolarTR = thirdMolarTR;
        this._thirdMolarBL = thirdMolarBL;
        this._thirdMolarBR = thirdMolarBR;
        this._pubicSymphysisL = pubicSymphysisL;
        this._pubicSymphysisR = pubicSymphysisR;
        this._auricularAreaL = auricularAreaL;
        this._auricularAreaR = auricularAreaR;
        this._fourthRibL = fourthRibL;
        this._fourthRibR = fourthRibR;
        this._generatedReports = generatedReports;
        this._notes = notes;
        this.observers = [];
        this._mostRecentReport = DataController.getInstance().createReport({}); //will create a NullReportModel
        this.attach(new AutosaveObserver());
        this.attach(new ReportManagerObserver());
    }

    public get mostRecentReport(): AbstractReportModel {
        return this._mostRecentReport;
    }

    public set mostRecentReport(report: AbstractReportModel) {
        this._mostRecentReport = report;
    }

    public get caseID(): string {
        return this._caseID;
    }

    public set caseID(value: string) {
        this._caseID = value;
    }

    public get populationAffinity(): Affinity {
        return this._populationAffinity;
    }

    public set populationAffinity(value: Affinity) {
        this._populationAffinity = value;
    }

    public get sex(): Sex {
        return this._sex;
    }

    public set sex(value: Sex) {
        this._sex = value;
    }

    public get thirdMolarTL(): ThirdMolar {
        return this._thirdMolarTL;
    }

    public get thirdMolarTR(): ThirdMolar {
        return this._thirdMolarTR;
    }

    public get thirdMolarBL(): ThirdMolar {
        return this._thirdMolarBL;
    }

    public get thirdMolarBR(): ThirdMolar {
        return this._thirdMolarBR;
    }

    public set thirdMolarTL(value: ThirdMolar) {
        this._thirdMolarTL = value;
    }

    public set thirdMolarTR(value: ThirdMolar) {
        this._thirdMolarTR = value;
    }

    public set thirdMolarBL(value: ThirdMolar) {
        this._thirdMolarBL = value;
    }

    public set thirdMolarBR(value: ThirdMolar) {
        this._thirdMolarBR = value;
    }

    public get pubicSymphysisL(): PubicSymphysis {
        return this._pubicSymphysisL;
    }

    public get pubicSymphysisR(): PubicSymphysis {
        return this._pubicSymphysisR;
    }

    public set pubicSymphysisL(value: PubicSymphysis) {
        this._pubicSymphysisL = value;
    }

    public set pubicSymphysisR(value: PubicSymphysis) {
        this._pubicSymphysisR = value;
    }

    public get auricularAreaL(): AuricularArea {
        return this._auricularAreaL;
    }

    public get auricularAreaR(): AuricularArea {
        return this._auricularAreaR;
    }

    public set auricularAreaL(value: AuricularArea) {
        this._auricularAreaL = value;
    }

    public set auricularAreaR(value: AuricularArea) {
        this._auricularAreaR = value;
    }

    public get fourthRibL(): SternalEnd {
        return this._fourthRibL;
    }

    public get fourthRibR(): SternalEnd {
        return this._fourthRibR;
    }

    public set fourthRibL(value: SternalEnd) {
        this._fourthRibL = value;
    }

    public set fourthRibR(value: SternalEnd) {
        this._fourthRibR = value;
    }

    public get notes() {
        return this._notes;
    }

    public set notes(value: string) {
        this._notes = value;
    }

    public get generatedReports(): { [id: string]: AbstractReportModel } {
        return this._generatedReports;
    }

    public set generatedReports(value: { [id: string]: ReportModel }) {
        this._generatedReports = value;
    }

    public addReport(report: AbstractReportModel): void {
        this._generatedReports[report.id] = report;
    }

    public removeReport(report: AbstractReportModel): void {
        delete this._generatedReports[report.id];
    }
}
