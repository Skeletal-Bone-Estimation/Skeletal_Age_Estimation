import { CaseModel } from '../../models/CaseModel';
import { NullCaseModel } from '../../models/NullCaseModel';
import { CaseBuilder } from './CaseBuilder';

export enum ReportType {
    Case,
    Report,
}

export class BuildDirector {
    public caseBuilder: CaseBuilder;
    //private reportBuilder : AbstractBuilder

    constructor() {
        this.caseBuilder = new CaseBuilder();
        //this.reportBuilder = new this.reportBuilder();
    }

    public make(type: ReportType): CaseModel | NullCaseModel {
        if (type == ReportType.Case) return this.caseBuilder.build();
        //else if (type == ReportType.Report) return this.reportBuilder.build();
        else {
            console.error(`Error building ${type}`);
            return new NullCaseModel();
        }
    }
}
