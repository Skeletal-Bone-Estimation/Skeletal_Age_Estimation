import { DataController } from '../../controllers/DataController';
import { CaseModel } from '../../models/CaseModel';
import { Autonumberer } from '../Autonumberer';
import { Affinity, Analyzers, Observers, Sex } from '../enums';
import { AnalyzerStrategyIF } from './AnalyzerStrategyIF';
import { ClassificationStrategy } from './ClassificationStrategy';
import { DefaultAnalyzerStrategy } from './DefaultAnalyzerStrategy';
import { LinearRegressionStrategy } from './LinearRegressionStrategy';

// singleton context object to manage different analysis strategies
export class AnalysisContext {
    private static instance: AnalysisContext;
    private analyzers: { [key: string]: AnalyzerStrategyIF };
    private currentStrategy: AnalyzerStrategyIF;

    private constructor(sex: Sex, affinity: Affinity) {
        //initialize new strategies within this dictionary
        this.analyzers = {
            default: new DefaultAnalyzerStrategy(sex, affinity),
            linreg: new LinearRegressionStrategy(sex, affinity),
            classification: new ClassificationStrategy(sex, affinity),
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
    public async analyze(_case: CaseModel): Promise<void> {
        this.setSex(_case.sex);
        this.setAffinity(_case.populationAffinity);

        switch (this.currentStrategy.getStrategy()) {
            case Analyzers.LinReg:
                console.log('Using linear regression strategy');
                var results: {} = await (
                    this.currentStrategy as LinearRegressionStrategy
                ).executeAnalysis(_case);
                break;
            case Analyzers.Class:
                console.log('Using classification strategy');
                var results: {} = await (
                    this.currentStrategy as LinearRegressionStrategy
                ).executeAnalysis(_case);
                break;
            case Analyzers.Default:
            default:
                console.log('Using default strategy');
                var results: {} =
                    await this.currentStrategy.executeAnalysis(_case);
                break;
        }

        var report = DataController.getInstance().createReport(results);
        _case.addReport(report);
        _case.notify(Observers.setMostRecentReport, report.id); // set most recent report
        _case.notify(Observers.setSelectedReport, report.id); // set selected report
        _case.notify(Observers.autosave); // autosave
        Autonumberer.getInstance().updateExistingValues();
    }
}
