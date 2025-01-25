import { CaseModel } from '../../models/CaseModel';
import { AbstractAnalyzer } from './AbstractAnalyzer';

export class PredictionAnalyzerStrategy extends AbstractAnalyzer {
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
