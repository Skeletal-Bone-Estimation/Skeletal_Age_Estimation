import { DataController } from '../../controllers/DataController';
import { ReportModel } from '../../models/ReportModel';

export class ReportBuilder {
    constructor() {}

    //TODO: setup builder
    public build(content: {}): ReportModel {
        //parse content and build from
        return new ReportModel(this.autonumber(), content);
    }

    private autonumber() : number {
        return DataController.getInstance().getNumReports() + 1 //TODO: setup proper noncolliding system
    }
}
