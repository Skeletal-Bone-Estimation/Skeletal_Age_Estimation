// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { ReportModel } from '../../models/ReportModel';

export class ReportBuilder {
    constructor() {}

    //TODO: setup builder
    public build(): ReportModel {
        return new ReportModel(-1);
    }

    public buildFrom(content: string | null): ReportModel {
        //parse content and build from
        return new ReportModel(-1);
    }
}
