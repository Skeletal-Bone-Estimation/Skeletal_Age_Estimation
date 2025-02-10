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

    //TODO: return an abstract CaseModel
    /**
     * Builds a CaseModel object.
     * @returns The built CaseModel.
     */
    public makeCase(): CaseModel {
        return this.caseBuilder.build();
    }

    /**
     * Builds a ReportModel object.
     * @param results The results to be included in the report.
     * @returns The built AbstractReportModel.
     */
    public makeReport(results: {}): AbstractReportModel {
        return this.reportBuilder.build(results);
    }

    /**
     * Builds a ReportModel object from a given ID and content.
     * @param id The ID of the report.
     * @param content The XML elements containing the report data.
     * @returns The built AbstractReportModel.
     */
    public makeReportFrom(id: string, content: Element): AbstractReportModel {
        return this.reportBuilder.buildFrom(id, content);
    }
}
