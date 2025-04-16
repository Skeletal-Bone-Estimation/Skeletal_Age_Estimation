import { DataController } from '../../controllers/DataController';
import { CaseModel } from '../../models/CaseModel';
import { Autonumberer } from '../Autonumberer';
import { Affinity, Analyzers, Observers, Sex } from '../enums';
import { AnalyzerStrategyIF } from './AnalyzerStrategyIF';
import { DefaultAnalyzerStrategy } from './DefaultAnalyzerStrategy';
import { LinearRegressionStrategy } from './LinearRegressionStrategy';

// singleton context object to manage different analysis strategies
export class AnalysisContext {
    private static instance: AnalysisContext;
    private analyzers: { [key: string]: AnalyzerStrategyIF };
    private currentStrategy: AnalyzerStrategyIF | null;

    private constructor(sex: Sex, affinity: Affinity) {
        //initialize new strategies within this dictionary
        this.analyzers = {
            linreg: new LinearRegressionStrategy(sex, affinity),
        };

        this.currentStrategy = null; // Default strategy
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
    public setStrategy(strategy: Analyzers | null): void {
        if (strategy) this.currentStrategy = this.analyzers[strategy];
        else this.currentStrategy = strategy;
    }

    /**
     * Sets the sex value for the current strategy.
     * @param sex The sex value to set.
     */
    public setSex(sex: Sex): void {
        if (this.currentStrategy) this.currentStrategy.modifySex(sex);
    }

    /**
     * Sets the population affinity value for the current strategy.
     * @param affinity The population affinity value to set.
     */
    public setAffinity(affinity: Affinity): void {
        if (this.currentStrategy) this.currentStrategy.modifyAffinity(affinity);
    }

    public getStrategy(): Analyzers | null {
        return this.currentStrategy ? this.currentStrategy.getStrategy() : null;
    }

    /**
     * Analyzes the given case using the specified strategy.
     * @param _case The case to analyze.
     * @param strategy The strategy to use for analysis.
     */
    public async analyze(_case: CaseModel): Promise<void> {
        const dc = DataController.getInstance();
        this.setSex(_case.sex);
        this.setAffinity(_case.populationAffinity);

        var defaultAnalysis = new DefaultAnalyzerStrategy(
            _case.sex,
            _case.populationAffinity,
        );
        var results: {} = await defaultAnalysis.executeAnalysis(_case); // execute analysis

        var ML_Result: number | null = null;

        if (this.currentStrategy != null) {
            switch (this.currentStrategy.getStrategy()) {
                case Analyzers.LinReg:
                    console.log('Using linear regression strategy');
                    ML_Result = await (
                        this.currentStrategy as LinearRegressionStrategy
                    ).executeAnalysis(_case);
                    break;
            }
        }
        console.log('ML Result:', ML_Result);
        var report = dc.createReport(results, ML_Result);

        _case.addReport(report);
        _case.notify(Observers.setMostRecentReport, report.id); // set most recent report
        _case.notify(Observers.setSelectedReport, report.id); // set selected report
        _case.notify(Observers.autosave); // autosave
        Autonumberer.getInstance().updateExistingValues();
        console.log('Report created:', report);
    }
}
