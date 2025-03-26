import { CaseModel } from '../../models/CaseModel';
import { AbstractAnalyzer } from './AbstractAnalyzer';

export class PredictionAnalyzerStrategy extends AbstractAnalyzer {
    /**
     * Executes the prediction analysis on the given case.
     * @param _case The case to analyze.
     * @returns The analysis results as an object.
     */
    executeAnalysis(_case: CaseModel): {} {
        // TODO: Prediction analysis logic
        // package input data
        // encrypt data
        // send data to classification model
        // busy waiting until model returns
        // retreive model results
        // package into report

        return {};
    }
}
