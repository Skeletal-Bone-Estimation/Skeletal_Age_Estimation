import { AbstractModel, CaseModel } from "../../models/CaseModel";
import { ReportModel } from "../../models/ReportModel";
import { AbstractBuilder } from "./AbstractBuilder";
import { CaseBuilder } from "./CaseBuilder";

export enum ReportType {
    Case,
    Report
}

export class BuildDirector {
    private caseBuilder : AbstractBuilder;
    //private reportBuilder : AbstractBuilder

    constructor() {
        this.caseBuilder = new CaseBuilder();
        //this.reportBuilder = new this.reportBuilder();
    }

    public make(type : ReportType) : AbstractModel | null {
        if (type == ReportType.Case) return this.caseBuilder.make();
        //else if (type == ReportType.Report) return this.reportBuilder.make();
        else 
        {
            console.error(`Error building ${type}`);
            return null;
        }
    }
}