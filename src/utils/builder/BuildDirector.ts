// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { CaseModel } from '../../models/CaseModel';
import { NullCaseModel } from '../../models/NullCaseModel';
import { ReportModel } from '../../models/ReportModel';
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

    public makeReport(results: {}): ReportModel {
        return this.reportBuilder.build(results);
    }

    public makeReportFrom(content: string): ReportModel {
        return this.reportBuilder.build(content);
    }
}
