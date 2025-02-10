import { DataController } from '../../controllers/DataController';
import { AbstractReportModel } from '../../models/AbstractReportModel';
import { Observers } from '../enums';
import { ObserverIF } from './ObserverIF';

export class ReportManagerObserver implements ObserverIF {
    /**
     * Executes the appropriate method based on the observer notified.
     * @param arg The observer type.
     * @param data The data to be processed.
     */
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

    /**
     * Sets the most recent report in the data controller.
     * @param report The report to set as the most recent.
     */
    private setMostRecentReport(report: AbstractReportModel): void {
        DataController.getInstance().setMostRecentReport(report);
    }

    /**
     * Sets the selected report in the data controller.
     * @param report The report to set as the selected report.
     */
    private setSelectedReport(report: AbstractReportModel): void {
        DataController.getInstance().openReport = report;
    }
}
