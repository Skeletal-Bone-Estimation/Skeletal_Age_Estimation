import { CaseModel } from '../../models/CaseModel';
import { Analyzers } from '../enums';
import { AbstractAnalyzer } from './AbstractAnalyzer';

export class LinearRegressionStrategy extends AbstractAnalyzer {
    /**
     * Executes the prediction analysis on the given case.
     * @param _case The case to analyze.
     * @returns The analysis results as an object.
     */
    async executeAnalysis(_case: CaseModel): Promise<{}> {
        // TODO: Prediction analysis logic

        var inputData: number[] = this.prepareData(_case);
        var results: {} = {};

        await fetch('http://localhost:6195/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model_type: 'linreg',
                model_name: 'linreg',
                input_data: inputData,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Prediction result:', data);
                results = this.formatResults(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        return results;
    }

    private prepareData(_case: CaseModel): number[] {
        // Prepare the input data for the prediction model
        return [];
    }

    private formatResults(results: any): {} {
        // Format the results of the prediction model
        return {};
    }

    public getStrategy(): Analyzers {
        return Analyzers.LinReg;
    }
}
