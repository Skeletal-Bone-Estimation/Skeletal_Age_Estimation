import { CaseModel } from '../../models/CaseModel';
import { Affinity, Sex } from '../enums';
import { AbstractAnalyzer } from './AbstractAnalyzer';

export class ImageAnalyzerStrategy extends AbstractAnalyzer {
    constructor(sex: Sex, affinity: Affinity) {
        super(sex, affinity);
    }

    /**
     * Executes the image analysis on the given case.
     * @param _case The case to analyze.
     * @returns The analysis results as an object.
     */
    executeAnalysis(_case: CaseModel): {} {
        // TODO: Image analysis logic
        // package image data
        // encrypt data
        // send data to cnn model
        // busy waiting until model returns
        // retreive model results
        // package into report

        return {};
    }
}
