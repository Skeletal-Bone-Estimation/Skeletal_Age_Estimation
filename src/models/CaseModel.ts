import { ReportModel } from "./ReportModel";

//CaseModel.ts
export enum Affinity {
    White, Black, Unknown
}

export enum Sex {
    Male, Female, Unknown
}

export enum ThirdMolar {
    A, B, C, D, E, F, G, Unknown
}

export class AbstractModel {}

export class CaseModel {
    protected _caseID: string = '';
    protected _populationAffinity: Affinity = Affinity.Unknown;
    protected _sex: Sex = Sex.Unknown;
    protected _thirdMolar: ThirdMolar = ThirdMolar.Unknown;
    protected _pubicSymphysis: { [key: string]: number; } = {};
    protected _auricularEdge: { [key: string]: number; } = {};
    protected _fourthRib: { [key: string]: number; } = {};
    protected _generatedReports: {[id : number] : ReportModel} = {};

    constructor() {}

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

    public get thirdMolar(): ThirdMolar {
        return this._thirdMolar;
    }

    public set thirdMolar(value: ThirdMolar) {
        this._thirdMolar = value;
    }

    public get pubicSymphysis(): { [key: string]: number; } {
        return this._pubicSymphysis;
    }

    public get auricularEdge(): { [key: string]: number; } {
        return this._auricularEdge;
    }

    public get fourthRib(): { [key: string]: number; } {
        return this._fourthRib;
    }

    public get generatedReports(): { [id: number]: ReportModel } {
        return this._generatedReports;
    }

    public set generatedReports(value: ReportModel[]) {
        this._generatedReports = value;
    }

    public updateDictEntry(dict : {[key : string] : number}, field : string, value : number) : void {
        dict[field] = value;
    }

    public addReport(report : ReportModel) : void {
        this._generatedReports[report.id] = report;
    }

    public removeReport(report : ReportModel) : void {
        delete this._generatedReports[report.id];
    }
}