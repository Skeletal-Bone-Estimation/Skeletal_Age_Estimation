import { CaseModel } from '../../models/CaseModel';
import { Affinity, Analyzers, Sex } from '../enums';
import { AnalyzerStrategyIF } from './AnalyzerStrategyIF';
import fs from 'fs';

export abstract class AbstractAnalyzer implements AnalyzerStrategyIF {
    // store values for analysis modifications
    protected sex: Sex;
    protected affinity: Affinity;

    public constructor(sex: Sex, affinity: Affinity) {
        this.sex = sex;
        this.affinity = affinity;
    }

    /**
     * Specialized children must implement their own analysis.
     * @param _case The case to analyze.
     * @returns The analysis results as an object.
     */
    abstract executeAnalysis(_case: CaseModel): {};

    /**
     * Modifies the sex value for the analysis.
     * @param sex The new sex value.
     */
    public modifySex(sex: Sex): void {
        this.sex = sex;
    }

    /**
     * Modifies the population affinity value for the analysis.
     * @param affinity The new population affinity value.
     */
    public modifyAffinity(affinity: Affinity): void {
        this.affinity = affinity;
    }

    protected getPort(): number {
        var portFile = './src/ml/flask_port.json';

        if (!fs.existsSync(portFile)) return -1;

        try {
            const data = fs.readFileSync(portFile, 'utf-8');
            const { port } = JSON.parse(data);
            return port;
        } catch (err) {
            console.error('Error reading port file:', err);
            return -1;
        }
    }

    public abstract getStrategy(): Analyzers;
}
