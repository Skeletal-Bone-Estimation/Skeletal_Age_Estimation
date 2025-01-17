import { Affinity, Sex } from "../enums";

export interface AnalyzerStrategyIF {

    executeAnalysis(): void;
    modifySex(value: Sex): void;
    modifyAffinity(value: Affinity): void;
    
}