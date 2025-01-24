import { CaseModel } from '../../models/CaseModel';
import { Affinity, Sex } from '../enums';

//publicly exposed methods for all analyzer strategies
export interface AnalyzerStrategyIF {
    executeAnalysis(_case: CaseModel): {};
    modifySex(value: Sex): void;
    modifyAffinity(value: Affinity): void;
}
