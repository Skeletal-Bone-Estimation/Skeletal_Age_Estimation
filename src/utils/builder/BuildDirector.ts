// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { AbstractReportModel } from '../../models/AbstractReportModel';
import { CaseModel } from '../../models/CaseModel';
import { CaseBuilder } from './CaseBuilder';
import { ReportBuilder } from './ReportBuilder';

export enum ReportType {
    Case,
    Report,
}

//TODO: abstract so that the instance variables can be private and this class has a purpose
export class BuildDirector {
    public caseBuilder: CaseBuilder;
    public reportBuilder: ReportBuilder;

    constructor() {
        this.caseBuilder = new CaseBuilder();
        this.reportBuilder = new ReportBuilder();
    }

    public makeCase(): CaseModel {
        return this.caseBuilder.build();
    }

    public makeReport(results: {}): AbstractReportModel {
        return this.reportBuilder.build(results);
    }

    public makeReportFrom(id: string, content: any): AbstractReportModel {
        return this.reportBuilder.buildFrom(id, content);
    }
}
