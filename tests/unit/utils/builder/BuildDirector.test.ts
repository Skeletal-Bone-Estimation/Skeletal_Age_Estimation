//BuildDirector.test.ts
import { BuildDirector, ReportType } from '../../../../src/utils/builder/BuildDirector';
import { CaseModel } from '../../../../src/models/CaseModel';
import { ReportModel } from '../../../../src/models/ReportModel';
import { CaseBuilder } from '../../../../src/utils/builder/CaseBuilder';
import { ReportBuilder } from '../../../../src/utils/builder/ReportBuilder';
import {
    Affinity,
    Sex,
    ThirdMolar,
    PubicSymphysis,
    AuricularArea,
    SternalEnd,
} from '../../../../src/utils/enums';

jest.mock('../../../../src/utils/builder/CaseBuilder');
jest.mock('../../../../src/utils/builder/ReportBuilder');

describe('BuildDirector', () => {
    let buildDirector: BuildDirector;
    let mockCaseBuilder: jest.Mocked<CaseBuilder>;
    let mockReportBuilder: jest.Mocked<ReportBuilder>;

    beforeEach(() => {
        // Reset the mock builders before each test
        mockCaseBuilder = new CaseBuilder() as jest.Mocked<CaseBuilder>;
        mockReportBuilder = new ReportBuilder() as jest.Mocked<ReportBuilder>;
        buildDirector = new BuildDirector();
        
        // Ensure the mocked builders are used in the director
        buildDirector.caseBuilder = mockCaseBuilder;
        buildDirector.reportBuilder = mockReportBuilder;
    });

    it('should create a case using CaseBuilder', () => {
        const mockCase = new CaseModel(
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
            {},
        );
        mockCaseBuilder.build.mockReturnValue(mockCase);

        const result = buildDirector.makeCase();

        expect(result).toBe(mockCase);
        expect(mockCaseBuilder.build).toHaveBeenCalledTimes(1);
    });

    it('should create a report using ReportBuilder', () => {
        const mockReport = new ReportModel(1);
        const content = 'Sample Report Content';
        mockReportBuilder.buildFrom.mockReturnValue(mockReport);

        const result = buildDirector.makeReportFrom(content);

        expect(result).toBe(mockReport);
        expect(mockReportBuilder.buildFrom).toHaveBeenCalledWith(content);
        expect(mockReportBuilder.buildFrom).toHaveBeenCalledTimes(1);
    });
});
