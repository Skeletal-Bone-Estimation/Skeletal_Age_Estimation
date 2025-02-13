//startted 2-12 finished 2-12
import { ReportManagerObserver } from '../../../../src/utils/observer/ReportManagerObserver';
import { DataController } from '../../../../src/controllers/DataController';
import { Observers } from '../../../../src/utils/enums';
import { AbstractReportModel } from '../../../../src/models/AbstractReportModel';
import { ReportModel } from '../../../../src/models/ReportModel';
import { NullReportModel } from '../../../../src/models/NullReportModel';

//persistent instance mock
const mockDataControllerInstance = {
    setMostRecentReport: jest.fn(),
    _openReport: new NullReportModel(),
    get openReport() {
        return this._openReport;
    },
    set openReport(report: AbstractReportModel) {
        this._openReport = report;
    },
};

//make sure the dc is always the same instance, was just giving me issues
jest.mock('../../../../src/controllers/DataController', () => {
    return {
        DataController: {
            getInstance: jest.fn(() => mockDataControllerInstance),
        },
    };
});

describe('ReportManagerObserver', () => {
    let observer: ReportManagerObserver;
    let mockReport: ReportModel;
    let mockNullReport: NullReportModel;

    beforeEach(() => {
        observer = new ReportManagerObserver();

        //clear the mocks
        mockDataControllerInstance.setMostRecentReport.mockClear();
        mockDataControllerInstance._openReport = new NullReportModel();

        // Mock an actual report instance
        mockReport = new ReportModel('report1', {
            pubicSymphysis: { L: 5, L_min: 3, L_max: 7, R: 4, R_min: 2, R_max: 6, C: 5, C_min: 3, C_max: 7 },
            sternalEnd: { L: 3, L_min: 2, L_max: 5, R: 4, R_min: 3, R_max: 6, C: 4, C_min: 2, C_max: 6 },
            auricularSurface: { L: 6, L_min: 4, L_max: 8, R: 5, R_min: 3, R_max: 7, C: 5, C_min: 3, C_max: 7 },
            thirdMolar: { TL: 1, TR: 2, BL: 3, BR: 4 },
        });

        mockNullReport = new NullReportModel();
    });

    it('should call setMostRecentReport when Observers.setMostRecentReport is passed', () => {
        observer.update(Observers.setMostRecentReport, mockReport);

        console.log('setMostRecentReport calls:', mockDataControllerInstance.setMostRecentReport.mock.calls);

        expect(mockDataControllerInstance.setMostRecentReport).toHaveBeenCalledWith(mockReport);
    });

    it('should set openReport when Observers.setSelectedReport is passed', () => {
        console.log('Before update:', mockDataControllerInstance.openReport);
        observer.update(Observers.setSelectedReport, mockReport);
        console.log('After update:', mockDataControllerInstance.openReport);

        expect(mockDataControllerInstance.openReport).toBe(mockReport);
    });

    it('should correctly handle a NullReportModel when Observers.setSelectedReport is passed', () => {
        observer.update(Observers.setSelectedReport, mockNullReport);

        expect(mockDataControllerInstance.openReport).toBe(mockNullReport);
    });

    it('should do nothing when an unknown observer type is passed', () => {
        observer.update(99 as Observers, mockReport);

        expect(mockDataControllerInstance.setMostRecentReport).not.toHaveBeenCalled();
        expect(mockDataControllerInstance.openReport).not.toBe(mockReport);
    });
});
