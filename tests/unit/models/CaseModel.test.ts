//CaseModel.test.ts
import { CaseModel } from '../../../src/models/CaseModel';
import { AutosaveObserver } from '../../../src/utils/observer/AutosaveObserver';
import { Affinity, Sex, ThirdMolar, PubicSymphysis, AuricularArea, SternalEnd } from '../../../src/utils/enums';
import { ReportModel } from '../../../src/models/ReportModel';

// Mock the ReportModel
jest.mock('../../../src/models/ReportModel', () => {
    return {
        ReportModel: jest.fn().mockImplementation((id: number) => ({
            id,
        })),
    };
});



describe('CaseModel', () => {
    let caseModel: CaseModel;
    const mockReport = new ReportModel(1);

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
            {}
        );
    });

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

    it('should add a report correctly', () => {
        caseModel.addReport(mockReport);
        expect(caseModel.generatedReports[1]).toBe(mockReport);
    });

    it('should remove a report correctly', () => {
        caseModel.addReport(mockReport);
        caseModel.removeReport(mockReport);
        expect(caseModel.generatedReports[1]).toBeUndefined();
    });

    it('should update caseID', () => {
        caseModel.caseID = 'new-case-id';
        expect(caseModel.caseID).toBe('new-case-id');
    });

    it('should update notes', () => {
        caseModel.notes = 'Updated notes';
        expect(caseModel.notes).toBe('Updated notes');
    });

    it('should update populationAffinity', () => {
        caseModel.populationAffinity = Affinity.Black;
        expect(caseModel.populationAffinity).toBe(Affinity.Black);
    });

    it('should update sex', () => {
        caseModel.sex = Sex.Female;
        expect(caseModel.sex).toBe(Sex.Female);
    });

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
            {}
        );
        expect(newCaseModel.generatedReports).toEqual({});
    });

    it('should attach an AutosaveObserver', () => {
        // Retrieve the first observer attached
        const observer = caseModel['observers'][0];

        // Verify it's an instance of AutosaveObserver
        expect(observer).toBeInstanceOf(AutosaveObserver);
    });

});
