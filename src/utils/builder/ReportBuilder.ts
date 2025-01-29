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
}
