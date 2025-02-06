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

    //TODO: return an AbstractCaseModel
    //builds a case model object
    public makeCase(): CaseModel {
        return this.caseBuilder.build();
    }

    //builds a report model object
    public makeReport(results: {}): AbstractReportModel {
        return this.reportBuilder.build(results);
    }

    //builds a report model object from a given id and content
    public makeReportFrom(id: string, content: Element): AbstractReportModel {
        return this.reportBuilder.buildFrom(id, content);
    }
}
