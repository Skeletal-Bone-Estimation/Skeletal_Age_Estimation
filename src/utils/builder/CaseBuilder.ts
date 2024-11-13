import { CaseModel } from '../../models/CaseModel';
import { ReportModel } from '../../models/ReportModel';
import { CaseBuilderIF } from './CaseBuilderIF';

// Concrete builder for CaseModel
export class CaseBuilder implements CaseBuilderIF {
    private _caseID: string;
    private _populationAffinity: number;
    private _sex: number;
    private _thirdMolarTL: number;
    private _thirdMolarTR: number;
    private _thirdMolarBL: number;
    private _thirdMolarBR: number;
    private _pubicSymphysis: { [key: string]: number };
    private _auricularEdge: { [key: string]: number };
    private _fourthRib: { [key: string]: number };
    private _generatedReports: { [key: number]: ReportModel };

    constructor() {
        this._caseID = '';
        this._populationAffinity = 0;
        this._sex = 0;
        this._thirdMolarTL = 0;
        this._thirdMolarTR = 0;
        this._thirdMolarBL = 0;
        this._thirdMolarBR = 0;
        this._pubicSymphysis = {};
        this._auricularEdge = {};
        this._fourthRib = {};
        this._generatedReports = {};
    }

    public setCaseID(caseID: string): CaseBuilderIF {
        this._caseID = caseID;
        return this;
    }

    public setPopulationAffinity(populationAffinity: number): CaseBuilderIF {
        this._populationAffinity = populationAffinity;
        return this;
    }

    public setSex(sex: number): CaseBuilderIF {
        this._sex = sex;
        return this;
    }

    public setThirdMolarTL(thirdMolarTL: number): CaseBuilderIF {
        this._thirdMolarTL = thirdMolarTL;
        return this;
    }

    public setThirdMolarTR(thirdMolarTR: number): CaseBuilderIF {
        this._thirdMolarTR = thirdMolarTR;
        return this;
    }

    public setThirdMolarBL(thirdMolarBL: number): CaseBuilderIF {
        this._thirdMolarBL = thirdMolarBL;
        return this;
    }

    public setThirdMolarBR(thirdMolarBR: number): CaseBuilderIF {
        this._thirdMolarBR = thirdMolarBR;
        return this;
    }

    public setPubicSymphysis(pubicSymphysis: {
        [key: string]: number;
    }): CaseBuilderIF {
        this._pubicSymphysis = pubicSymphysis;
        return this;
    }
    public setAuricularEdge(auricularEdge: {
        [key: string]: number;
    }): CaseBuilderIF {
        this._auricularEdge = auricularEdge;
        return this;
    }
    public setFourthRib(fourthRib: { [key: string]: number }): CaseBuilderIF {
        this._fourthRib = fourthRib;
        return this;
    }
    public setReportsGenerated(generatedReports: {
        [key: number]: ReportModel;
    }): CaseBuilderIF {
        this._generatedReports = generatedReports;
        return this;
    }

    public build(): CaseModel {
        return new CaseModel(
            this._caseID,
            this._populationAffinity,
            this._sex,
            this._thirdMolarTL,
            this._thirdMolarTR,
            this._thirdMolarBL,
            this._thirdMolarBR,
            this._pubicSymphysis,
            this._auricularEdge,
            this._fourthRib,
            this._generatedReports,
        );
    }
}
