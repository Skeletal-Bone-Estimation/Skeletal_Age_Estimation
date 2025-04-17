import { CaseModel } from '../../models/CaseModel';
import { Affinity, Analyzers, Sex } from '../enums';

export interface AnalyzerStrategyIF {
    /**
     * Executes the analysis on the given case.
     * @param _case The case to analyze.
     * @returns The analysis results as a dictionary object.
     */
    executeAnalysis(_case: CaseModel): {};

    /**
     * Modifies the sex value for the analysis.
     * @param value The new sex value.
     */
    modifySex(value: Sex): void;

    /**
     * Modifies the population affinity value for the analysis.
     * @param value The new population affinity value.
     */
    modifyAffinity(value: Affinity): void;

    /**
     * Retrieves the strategy name.
     * @returns The strategy name.
     */
    getStrategy(): Analyzers;
}
