import { DataController } from '../../controllers/DataController';
import { AbstractReportModel } from '../../models/AbstractReportModel';
import { Observers } from '../enums';
import { ObserverIF } from './ObserverIF';

export class ReportManagerObserver implements ObserverIF {
    // executes the appropriate method based on the observer notified
    public update(arg: Observers, data: AbstractReportModel): void {
        switch (arg) {
            case Observers.setMostRecentReport:
                this.setMostRecentReport(data);
                break;
            case Observers.setSelectedReport:
                this.setSelectedReport(data);
                break;
            default:
                break;
        }
    }

    // sets the most recent report in the data controller
    private setMostRecentReport(report: AbstractReportModel): void {
        DataController.getInstance().setMostRecentReport(report);
    }

    // sets the selected report in the data controller
    private setSelectedReport(report: AbstractReportModel): void {
        DataController.getInstance().openReport = report;
    }
}
