import { CaseModel } from '../../models/CaseModel';
import { ReportModel } from '../../models/ReportModel';
import { AuricularArea, PubicSymphysis, SternalEnd } from '../enums';
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
    private _pubicSymphysisL: number;
    private _pubicSymphysisR: number;
    private _auricularAreaL: number;
    private _auricularAreaR: number;
    private _fourthRibL: number;
    private _fourthRibR: number;
    private _generatedReports: { [key: number]: ReportModel };

    constructor() {
        this._caseID = '';
        this._populationAffinity = 0;
        this._sex = 0;
        this._thirdMolarTL = 0;
        this._thirdMolarTR = 0;
        this._thirdMolarBL = 0;
        this._thirdMolarBR = 0;
        this._pubicSymphysisL = 1;
        this._pubicSymphysisR = 1;
        this._auricularAreaL = 1;
        this._auricularAreaR = 1;
        this._fourthRibL = 1;
        this._fourthRibR = 1;
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

    public setPubicSymphysisL(pubicSymphysisL: number): CaseBuilderIF {
        this._pubicSymphysisL = pubicSymphysisL;
        return this;
    }

    public setPubicSymphysisR(pubicSymphysisR: number): CaseBuilderIF {
        this._pubicSymphysisR = pubicSymphysisR;
        return this;
    }

    public setAuricularAreaL(auricularAreaL: number): CaseBuilderIF {
        this._auricularAreaL = auricularAreaL;
        return this;
    }

    public setAuricularAreaR(auricularAreaR: number): CaseBuilderIF {
        this._auricularAreaR = auricularAreaR;
        return this;
    }

    public setFourthRibL(fourthRibL: number): CaseBuilderIF {
        this._fourthRibL = fourthRibL;
        return this;
    }

    public setFourthRibR(fourthRibR: number): CaseBuilderIF {
        this._fourthRibR = fourthRibR;
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
            this._pubicSymphysisL,
            this._pubicSymphysisR,
            this._auricularAreaL,
            this._auricularAreaR,
            this._fourthRibL,
            this._fourthRibR,
            this._generatedReports,
        );
    }
}
