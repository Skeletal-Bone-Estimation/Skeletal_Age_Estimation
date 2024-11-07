import { Affinity, CaseModel, Sex, ThirdMolar } from "../../models/CaseModel";
import { ReportModel } from "../../models/ReportModel";

export class CaseBuilder {
    private caseModel : CaseModel = new CaseModel;
    private _caseID : string = '';
    private _populationAffinity : Affinity = Affinity.Unknown;
    private _sex : Sex = Sex.Unknown;
    private _thirdMolar : ThirdMolar = ThirdMolar.Unknown;
    private _pubicSymphysis : { [key : string] : number; } = {};
    private _auricularEdge : { [key : string] : number; } = {};
    private _fourthRib : { [key : string] : number; } = {};
    private _generatedReports : ReportModel[] = [];

    constructor() {
        this.reset()
    }

    private reset() {
        this.caseModel = new CaseModel()
    }

    //pulled from id input
    public set caseID(value: string) {
        this._caseID = value;
    }

    //pulled from population affinity selector
    public set populationAffinity(value: Affinity) {
        this._populationAffinity = value;
    }

    //pulled from sex selector
    public set sex(value: Sex) {
        this._sex = value;
    }

    //pulled from third molar entry field
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

    public set generatedReports(value: ReportModel[]) {
        this._generatedReports = value;
    }

    //called to insert the data fopr each bone mrker into the case
    public setDict(store : { [key : string] : number}, newDict : { [key : string] : number; }) {
        Object.entries(newDict).forEach(([key, value]) => {
            store[key] = value;
        });
    }

    public make() : CaseModel {
        return this.caseModel
    }

}