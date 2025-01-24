import { ReportModel } from '../../models/ReportModel';
import { Autonumberer } from '../Autonumberer';

export class ReportBuilder {
    constructor() {}

    public build(content: {}): ReportModel {
        return new ReportModel(
            Autonumberer.getInstance().generateNext() as string,
            content,
        );
    }
}
