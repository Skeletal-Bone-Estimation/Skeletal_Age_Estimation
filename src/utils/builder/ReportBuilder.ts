import { AbstractReportModel } from '../../models/AbstractReportModel';
import { NullReportModel } from '../../models/NullReportModel';
import { ReportModel } from '../../models/ReportModel';
import { Autonumberer } from '../Autonumberer';

export class ReportBuilder {
    constructor() {}

    public build(content: {}): AbstractReportModel {
        if (
            content === null ||
            content === undefined ||
            Object.keys(content).length === 0
        ) {
            return new NullReportModel();
        }

        return new ReportModel(
            Autonumberer.getInstance().generateNext() as string,
            content,
        );
    }

    public buildFrom(id: string, results: Element): AbstractReportModel {
        const loadedResults: { [key: string]: { [key: string]: number } } =
            this.buildResultDictionary(results);
        return new ReportModel(id, loadedResults);
    }

    public buildResultDictionary(results: Element): {
        [key: string]: { [key: string]: number };
    } {
        const extractValue = (
            tag: string,
            defaultValue: number = -1,
        ): number => {
            const element = results?.getElementsByTagName(tag)[0];
            return element ? Number(element.textContent) : defaultValue;
        };

        return {
            pubicSymphysis: {
                L: extractValue('L'),
                L_min: extractValue('L_min'),
                L_max: extractValue('L_max'),
                R: extractValue('R'),
                R_min: extractValue('R_min'),
                R_max: extractValue('R_max'),
            },
            sternalEnd: {
                L: extractValue('L'),
                L_min: extractValue('L_min'),
                L_max: extractValue('L_max'),
                R: extractValue('R'),
                R_min: extractValue('R_min'),
                R_max: extractValue('R_max'),
            },
            auricularSurface: {
                L: extractValue('L'),
                L_min: extractValue('L_min'),
                L_max: extractValue('L_max'),
                R: extractValue('R'),
                R_min: extractValue('R_min'),
                R_max: extractValue('R_max'),
            },
            thirdMolar: {
                TL: extractValue('TL'),
                TR: extractValue('TR'),
                BL: extractValue('BL'),
                BR: extractValue('BR'),
            },
        };
    }
}
