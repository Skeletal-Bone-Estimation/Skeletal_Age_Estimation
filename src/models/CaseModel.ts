import { Affinity, Sex, ThirdMolar } from '../utils/enums';
import { AutosaveObserver } from '../utils/observer/AutosaveObserver';
import { ObserverIF } from '../utils/observer/ObserverIF';
import { AbstractCaseModel } from './AbstractCaseModel';
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
    protected _pubicSymphysis: { [key: string]: number };
    protected _auricularEdge: { [key: string]: number };
    protected _fourthRib: { [key: string]: number };
    protected _generatedReports: { [id: number]: ReportModel };
    protected observers: ObserverIF[];

    constructor(
        caseID: string,
        populationAffinity: Affinity,
        sex: Sex,
        thirdMolarTL: ThirdMolar,
        thirdMolarTR: ThirdMolar,
        thirdMolarBL: ThirdMolar,
        thirdMolarBR: ThirdMolar,
        pubicSymphysis: { [key: string]: number },
        auricularEdge: { [key: string]: number },
        fourthRib: { [key: string]: number },
        generatedReports: { [key: number]: ReportModel },
    ) {
        super();
        this._caseID = caseID;
        this._populationAffinity = populationAffinity;
        this._sex = sex;
        this._thirdMolarTL = thirdMolarTL;
        this._thirdMolarTR = thirdMolarTR;
        this._thirdMolarBL = thirdMolarBL;
        this._thirdMolarBR = thirdMolarBR;
        this._pubicSymphysis = pubicSymphysis;
        this._auricularEdge = auricularEdge;
        this._fourthRib = fourthRib;
        this._generatedReports = generatedReports;
        this.observers = [];
        this.attach(new AutosaveObserver());
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

    public get pubicSymphysis(): { [key: string]: number } {
        return this._pubicSymphysis;
    }

    public set pubicSymphysis(data: { [key: string]: number }) {
        this._pubicSymphysis = data;
    }

    public get auricularEdge(): { [key: string]: number } {
        return this._auricularEdge;
    }

    public set auricularEdge(data: { [key: string]: number }) {
        this.auricularEdge = data;
    }

    public get fourthRib(): { [key: string]: number } {
        return this._fourthRib;
    }

    public set fourthRib(data: { [key: string]: number }) {
        this.fourthRib = data;
    }

    public get generatedReports(): { [id: number]: ReportModel } {
        return this._generatedReports;
    }

    public set generatedReports(value: ReportModel[]) {
        this._generatedReports = value;
    }

    public updateDictEntry(
        dict: { [key: string]: number },
        field: string,
        value: number,
    ): void {
        dict[field] = value;
    }

    public addReport(report: ReportModel): void {
        this._generatedReports[report.id] = report;
    }

    public removeReport(report: ReportModel): void {
        delete this._generatedReports[report.id];
    }
}
