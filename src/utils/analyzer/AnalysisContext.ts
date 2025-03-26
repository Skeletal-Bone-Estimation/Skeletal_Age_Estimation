import { DataController } from '../../controllers/DataController';
import { PageController } from '../../controllers/PageController';
import { CaseModel } from '../../models/CaseModel';
import { Autonumberer } from '../Autonumberer';
import { Affinity, Analyzers, Observers, Pages, Sex } from '../enums';
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

    /**
     * Retrieves the singleton instance of the AnalysisContext class.
     * @param sex The sex to initialize the strategies with.
     * @param affinity The population affinity to initialize the strategies with.
     * @returns The singleton instance.
     */
    public static getInstance(sex: Sex, affinity: Affinity): AnalysisContext {
        if (!AnalysisContext.instance)
            AnalysisContext.instance = new AnalysisContext(sex, affinity);
        return AnalysisContext.instance;
    }

    /**
     * Sets the current analysis strategy.
     * @param strategy The strategy to set.
     */
    public setStrategy(strategy: Analyzers): void {
        this.currentStrategy = this.analyzers[strategy];
    }

    /**
     * Sets the sex value for the current strategy.
     * @param sex The sex value to set.
     */
    public setSex(sex: Sex): void {
        this.currentStrategy.modifySex(sex);
    }

    /**
     * Sets the population affinity value for the current strategy.
     * @param affinity The population affinity value to set.
     */
    public setAffinity(affinity: Affinity): void {
        this.currentStrategy.modifyAffinity(affinity);
    }

    /**
     * Analyzes the given case using the specified strategy.
     * @param _case The case to analyze.
     * @param strategy The strategy to use for analysis.
     */
    public analyze(_case: CaseModel, strategy: Analyzers): void {
        this.setSex(_case.sex);
        this.setAffinity(_case.populationAffinity);
        this.setStrategy(strategy);

        var results: {} = this.currentStrategy.executeAnalysis(_case);
        var report = DataController.getInstance().createReport(results);
        _case.addReport(report);
        _case.notify(Observers.setMostRecentReport, report.id); // set most recent report
        _case.notify(Observers.setSelectedReport, report.id); // set selected report
        _case.notify(Observers.autosave); // autosave
        Autonumberer.getInstance().updateExistingValues();
    }
}
