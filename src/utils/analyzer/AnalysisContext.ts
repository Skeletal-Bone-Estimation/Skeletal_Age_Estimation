import { Affinity, Analyzers, Sex } from "../enums";
import { AnalyzerStrategyIF } from "./AnalyzerStrategyIF";
import { DefaultAnalyzerStrategy } from "./DefaulAnalyzerStrategy";
import { ImageAnalyzerStrategy } from "./ImageAnalyzerStrategy";
import { PredictionAnalyzerStrategy } from "./PredictionAnalyzerStrategy";

export class AnalysisContext {

    private static instance: AnalysisContext;
    private analyzers: { [key: string]: AnalyzerStrategyIF};
    private currentStrategy: AnalyzerStrategyIF;

    private constructor(sex: Sex, affinity: Affinity) {
        this.analyzers = {
            "default": new DefaultAnalyzerStrategy(sex, affinity),
            "imageAnalysis": new ImageAnalyzerStrategy(sex, affinity),
            "predictionAnalysis": new PredictionAnalyzerStrategy(sex, affinity)
        };

        this.currentStrategy = this.analyzers[Analyzers.Default]; // Default strategy
    }

    public static getInstance(sex: Sex, affinity: Affinity): AnalysisContext {
        if (!AnalysisContext.instance) {
            AnalysisContext.instance = new AnalysisContext(sex, affinity);
        }
        return AnalysisContext.instance;
    }

    public setStrategy(strategy: Analyzers): void {
        this.currentStrategy = this.analyzers[strategy];
    }

    public setSex(sex: Sex): void {
        this.currentStrategy.modifySex(sex);
    }

    public setAffinity(affinity: Affinity): void {
        this.currentStrategy.modifyAffinity(affinity);
    }

    // return type will change once the report model generation is complete
    // we may need an intermediary data structure to hold the results 
    // of the data before the report is generated
    public analyze() : void {
        this.currentStrategy.executeAnalysis();
    }
}