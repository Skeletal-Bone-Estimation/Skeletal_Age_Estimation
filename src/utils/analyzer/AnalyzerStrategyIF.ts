import { Affinity, Sex } from "../enums";

//publicly exposed methods for all analyzer strategies
export interface AnalyzerStrategyIF {

    executeAnalysis(): void;
    modifySex(value: Sex): void;
    modifyAffinity(value: Affinity): void;

}