import { CaseModel } from '../../models/CaseModel';
import { Affinity, Analyzers, Sex } from '../enums';
import { AnalyzerStrategyIF } from './AnalyzerStrategyIF';

export abstract class AbstractAnalyzer implements AnalyzerStrategyIF {
    // store values for analysis modifications
    protected sex: Sex;
    protected affinity: Affinity;

    public constructor(sex: Sex, affinity: Affinity) {
        this.sex = sex;
        this.affinity = affinity;
    }

    /**
     * Specialized children must implement their own analysis.
     * @param _case The case to analyze.
     * @returns The analysis results as an object.
     */
    abstract executeAnalysis(_case: CaseModel): {};

    /**
     * Modifies the sex value for the analysis.
     * @param sex The new sex value.
     */
    public modifySex(sex: Sex): void {
        this.sex = sex;
    }

    /**
     * Modifies the population affinity value for the analysis.
     * @param affinity The new population affinity value.
     */
    public modifyAffinity(affinity: Affinity): void {
        this.affinity = affinity;
    }

    public abstract getStrategy(): Analyzers;
}
