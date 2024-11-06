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
    private _caseID: string = '';
    private _populationAffinity: Affinity = Affinity.Unknown;
    private _sex: Sex = Sex.Unknown;
    private _thirdMolar: ThirdMolar = ThirdMolar.Unknown;
    private _pubicSymphysis: { [key: string]: number; } = {};
    private _auricularEdge: { [key: string]: number; } = {};
    private _fourthRib: { [key: string]: number; } = {};
    private _generatedReports: ReportModel[] = [];

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

    public get generatedReports(): ReportModel[] {
        return this._generatedReports;
    }

    public set generatedReports(value: ReportModel[]) {
        this._generatedReports = value;
    }

    public updateDictEntry(dict : {[key : string] : number}, field : string, value : number) : void {
        dict[field] = value;
    }

    public addReport(report : ReportModel) : void {
        this.generatedReports.push(report);
    }

    public removeReport(report : ReportModel) : boolean {
        const index = this.generatedReports.indexOf(report)
        if (index !== -1) this.generatedReports.splice(index, 1);
        return this.generatedReports.indexOf(report) == -1;
    }
}