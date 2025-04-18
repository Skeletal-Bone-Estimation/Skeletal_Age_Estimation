import { ReportManagerObserver } from '../../src/classes/observers/ReportManagerObserver';
import { DataController } from '../../src/controllers/DataController';
import { Observers } from '../../src/enums';

jest.mock('../../src/controllers/DataController', () => ({
    DataController: {
        getInstance: jest.fn().mockReturnValue({
            setMostRecentReport: jest.fn(),
            openReport: null, // Initially no report is open
        }),
    },
}));

describe('Integration: ReportManagerObserver', () => {
    let observer: ReportManagerObserver;
    let dataController: any;

    beforeEach(() => {
        observer = new ReportManagerObserver();
        dataController = DataController.getInstance(); // Mocked instance of DataController
    });

    it('should call setMostRecentReport when the setMostRecentReport observer type is passed to update()', () => {
        const setMostRecentReportSpy = jest.spyOn(dataController, 'setMostRecentReport');
        const report = 'reportID1';

        observer.update(Observers.setMostRecentReport, report);

        expect(setMostRecentReportSpy).toHaveBeenCalledWith(report);
    });

    it('should call setSelectedReport when the setSelectedReport observer type is passed to update()', () => {
        const setSelectedReportSpy = jest.spyOn(observer as any, 'setSelectedReport');
        const reportID = 'reportID2';

        observer.update(Observers.setSelectedReport, reportID);

        expect(setSelectedReportSpy).toHaveBeenCalledWith(reportID);
    });

    it('should not call any method when an unrecognized observer type is passed to update()', () => {
        const setMostRecentReportSpy = jest.spyOn(dataController, 'setMostRecentReport');
        const setSelectedReportSpy = jest.spyOn(observer as any, 'setSelectedReport');
        
        observer.update(Observers.someOtherObserver, 'someData');

        expect(setMostRecentReportSpy).not.toHaveBeenCalled();
        expect(setSelectedReportSpy).not.toHaveBeenCalled();
    });

    it('should update the openReport field in DataController when setSelectedReport is triggered', () => {
        const reportID = 'reportID3';

        observer.update(Observers.setSelectedReport, reportID);

        expect(dataController.openReport).toBe(reportID);
    });
});
