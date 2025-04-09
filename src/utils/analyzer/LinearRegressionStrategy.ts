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

        var inputData: {} = this.prepareData(_case);
        var results: {} = {};

        await fetch(`http://localhost:${this.getPort()}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model_type: 'linreg',
                model_name: 'svr_model',
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

    private prepareData(_case: CaseModel): {} {
        // Prepare the input data for the prediction model
        return {
            sex: _case.sex.valueOf(),
            psL: _case.pubicSymphysisL.valueOf(),
            psR: _case.pubicSymphysisR.valueOf(),
            aaL: _case.auricularAreaL.valueOf(),
            aaR: _case.auricularAreaR.valueOf(),
            frL: _case.fourthRibL.valueOf(),
            frR: _case.fourthRibR.valueOf(),
        };
    }

    private formatResults(results: any): {} {
        // Format the results of the prediction model
        return {};
    }

    public getStrategy(): Analyzers {
        return Analyzers.LinReg;
    }
}
