import { DataController } from '../../controllers/DataController';
import { PageController } from '../../controllers/PageController';
import { CaseModel } from '../../models/CaseModel';
import { Autonumberer } from '../Autonumberer';
import { Affinity, Analyzers, Pages, Sex } from '../enums';
import { AnalyzerStrategyIF } from './AnalyzerStrategyIF';
import { DefaultAnalyzerStrategy } from './DefaultAnalyzerStrategy';
import { ImageAnalyzerStrategy } from './ImageAnalyzerStrategy';
import { PredictionAnalyzerStrategy } from './PredictionAnalyzerStrategy';

// singleton context object to manage different analysis strategies
export class AnalysisContext {
    private static instance: AnalysisContext;
    private analyzers: { [key: string]: AnalyzerStrategyIF };
    private currentStrategy: AnalyzerStrategyIF;

    private constructor(sex: Sex, affinity: Affinity) {
        //initialize new strategies within this dictionary
        this.analyzers = {
            default: new DefaultAnalyzerStrategy(sex, affinity),
            imageAnalysis: new ImageAnalyzerStrategy(sex, affinity),
            predictionAnalysis: new PredictionAnalyzerStrategy(sex, affinity),
        };

        this.currentStrategy = this.analyzers[Analyzers.Default]; // Default strategy
    }

    public static getInstance(sex: Sex, affinity: Affinity): AnalysisContext {
        if (!AnalysisContext.instance)
            AnalysisContext.instance = new AnalysisContext(sex, affinity);
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

    public analyze(_case: CaseModel, strategy: Analyzers): void {
        this.setSex(_case.sex);
        this.setAffinity(_case.populationAffinity);
        this.setStrategy(strategy);

        var results: {} = this.currentStrategy.executeAnalysis(_case);
        var report = DataController.getInstance().createReport(results);
        _case.addReport(report);
        Autonumberer.getInstance().updateExistingValues();
        (DataController.getInstance().openCase as CaseModel).mostRecentReport =
            report;
    }
}
