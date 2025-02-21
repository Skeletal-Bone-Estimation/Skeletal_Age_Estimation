import { CaseModel } from '../../../src/models/CaseModel';
import { AutosaveObserver } from '../../../src/utils/observer/AutosaveObserver';
import {
    Affinity,
    Sex,
    ThirdMolar,
    PubicSymphysis,
    AuricularArea,
    SternalEnd,
    Observers,
} from '../../../src/utils/enums';
import { ReportModel } from '../../../src/models/ReportModel';
import { AbstractReportModel } from '../../../src/models/AbstractReportModel';

// Mock the ReportModel with results argument
jest.mock('../../../src/models/ReportModel', () => {
    return {
        ReportModel: jest.fn().mockImplementation((id: string, results: { [key: string]: { [key: string]: number } }) => ({
            id,
            results: results || {},  // Provide default empty object if results aren't passed
        })),
    };
});

// Mock the AutosaveObserver to track its calls
jest.mock('../../../src/utils/observer/AutosaveObserver', () => {
    const mockAutosaveObserver = jest.fn().mockImplementation(() => ({
        update: jest.fn(), // Mock the update method
    }));
    return {
        AutosaveObserver: mockAutosaveObserver,
    };
});

describe('CaseModel', () => {
    let caseModel: CaseModel;
    const mockResults = {
        pubicSymphysis: {
            L_min: 1,
            L_max: 2,
            R_min: 1,
            R_max: 2,
        },
        auricularSurface: {
            L_min: 3,
            L_max: 4,
            R_min: 3,
            R_max: 4,
        },
        sternalEnd: {
            L_min: 5,
            L_max: 6,
            R_min: 5,
            R_max: 6,
        },
    };
    const mockReport = new ReportModel("1", mockResults);

    beforeEach(() => {
        caseModel = new CaseModel(
            'case-123',
            Affinity.Unknown,
            Sex.Unknown,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            PubicSymphysis.Unknown,
            PubicSymphysis.Unknown,
            AuricularArea.Unknown,
            AuricularArea.Unknown,
            SternalEnd.Unknown,
            SternalEnd.Unknown,
            'Test notes',
            [],
        );
    });
    // done
    it('should initialize with correct values', () => {
        expect(caseModel.caseID).toBe('case-123');
        expect(caseModel.populationAffinity).toBe(Affinity.Unknown);
        expect(caseModel.sex).toBe(Sex.Unknown);
        expect(caseModel.thirdMolarTL).toBe(ThirdMolar.Unknown);
        expect(caseModel.thirdMolarTR).toBe(ThirdMolar.Unknown);
        expect(caseModel.thirdMolarBL).toBe(ThirdMolar.Unknown);
        expect(caseModel.thirdMolarBR).toBe(ThirdMolar.Unknown);
        expect(caseModel.pubicSymphysisL).toBe(PubicSymphysis.Unknown);
        expect(caseModel.pubicSymphysisR).toBe(PubicSymphysis.Unknown);
        expect(caseModel.auricularAreaL).toBe(AuricularArea.Unknown);
        expect(caseModel.auricularAreaR).toBe(AuricularArea.Unknown);
        expect(caseModel.fourthRibL).toBe(SternalEnd.Unknown);
        expect(caseModel.fourthRibR).toBe(SternalEnd.Unknown);
        expect(caseModel.notes).toBe('Test notes');
    });
    // done
    it('should add a report correctly', () => {
        caseModel.addReport(mockReport);
        expect(caseModel.generatedReports).toContain(mockReport);
    });
    // done
    /*
    it('should remove a report correctly', () => {
        caseModel.addReport(mockReport);
    
        // Find the report by ID
        const reportToRemove = caseModel.generatedReports.find(r => r.id === "1");
    
        // Ensure the report is found before removing it
        if (reportToRemove) {
            console.log('Removing Report:', reportToRemove);
            caseModel.removeReport(reportToRemove);  // Only call removeReport if the report exists
        } else {
            console.error('Report to remove not found');
        }
    
        // Verify that the report was removed
        expect(caseModel.generatedReports.some(r => r.id === "1")).toBe(false);
    });
    */
    // done
    it('should update caseID', () => {
        caseModel.caseID = 'new-case-id';
        expect(caseModel.caseID).toBe('new-case-id');
    });
    // done
    it('should update notes', () => {
        caseModel.notes = 'Updated notes';
        expect(caseModel.notes).toBe('Updated notes');
    });
    // done
    it('should update populationAffinity', () => {
        caseModel.populationAffinity = Affinity.Black;
        expect(caseModel.populationAffinity).toBe(Affinity.Black);
    });
    //done
    it('should update sex', () => {
        caseModel.sex = Sex.Female;
        expect(caseModel.sex).toBe(Sex.Female);
    });
    // done
    it('should handle undefined generatedReports', () => {
        const newCaseModel = new CaseModel(
            'case-124',
            Affinity.Black,
            Sex.Male,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            PubicSymphysis.Unknown,
            PubicSymphysis.Unknown,
            AuricularArea.Unknown,
            AuricularArea.Unknown,
            SternalEnd.Unknown,
            SternalEnd.Unknown,
            'Test notes',
            [],
        );
        expect(newCaseModel.generatedReports).toEqual([]);
    });
    // done
    /*
    it('should attach an AutosaveObserver', () => {
        const autosaveObserverMock = jest.fn();  // Create the mock before the test
        jest.mock('../../../src/utils/observer/AutosaveObserver', () => ({
            AutosaveObserver: autosaveObserverMock,
        }));
        
        caseModel = new CaseModel(
            'case-123',
            Affinity.Unknown,
            Sex.Unknown,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            ThirdMolar.Unknown,
            PubicSymphysis.Unknown,
            PubicSymphysis.Unknown,
            AuricularArea.Unknown,
            AuricularArea.Unknown,
            SternalEnd.Unknown,
            SternalEnd.Unknown,
            'Test notes',
            [],
        );
    
        // Only check if it is called once
        expect(autosaveObserverMock).toHaveBeenCalledTimes(1);  // Expect only one call
        expect(autosaveObserverMock).toHaveBeenCalledWith(expect.any(Object));  // Ensure it is called with an object
    });
    // done
    it('should notify the observer on changes', () => {
        // Simulate a change in the caseModel that triggers the observer
        const observer = new AutosaveObserver();
        const updateSpy = jest.spyOn(observer, 'update');

        // Change a value that should trigger the observer
        caseModel.notes = 'Updated notes';
        caseModel.observers[0].update(Observers.autosave, { notes: caseModel.notes });
        // Manually triggering the observer update for this test

        expect(updateSpy).toHaveBeenCalledTimes(1); // Ensure the update method is called
    });
    */
});
