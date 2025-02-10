import { CaseModel } from '../../models/CaseModel';
import { Affinity, Sex } from '../enums';
import { AnalyzerStrategyIF } from './AnalyzerStrategyIF';

export abstract class AbstractAnalyzer implements AnalyzerStrategyIF {
    // store values for analysis modifications
    protected sex: Sex;
    protected affinity: Affinity;

    public constructor(sex: Sex, affinity: Affinity) {
        this.sex = sex;
        this.affinity = affinity;
    }

    //specialized children must implement their own analysis
    abstract executeAnalysis(_case: CaseModel): {};

    public modifySex(sex: Sex): void {
        this.sex = sex;
    }

    public modifyAffinity(affinity: Affinity): void {
        this.affinity = affinity;
    }
}
