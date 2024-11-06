import { CaseModel } from "../models/CaseModel";
import { AbstractBuilder } from "./AbstractBuilder";

export class CaseBuilder extends AbstractBuilder {
    private caseModel : CaseModel = new CaseModel;

    constructor() {
        super();
        this.reset()
    }

    private reset() {
        this.caseModel = new CaseModel()
    }

    public make() : CaseModel {
        //build steps
        return this.caseModel
    }

}