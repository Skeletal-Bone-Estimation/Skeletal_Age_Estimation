import { Affinity, CaseModel, Sex, ThirdMolar } from "./CaseModel";

export class NullCaseModel extends CaseModel {
    constructor() {
        super();
        this._caseID = 'Null Case';
        this._populationAffinity = Affinity.Unknown;
        this._sex= Sex.Unknown;
        this._thirdMolar = ThirdMolar.Unknown;
        this. _pubicSymphysis = {};
        this._auricularEdge = {};
        this._fourthRib = {};
        this._generatedReports = {};
    }
    
}