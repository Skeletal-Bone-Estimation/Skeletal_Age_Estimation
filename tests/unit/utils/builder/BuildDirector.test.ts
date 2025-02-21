import { BuildDirector, ReportType } from '../../../../src/utils/builder/BuildDirector';
import { CaseBuilder } from '../../../../src/utils/builder/CaseBuilder';
import { ReportBuilder } from '../../../../src/utils/builder/ReportBuilder'; 
import { CaseModel } from '../../../../src/models/CaseModel';
import { AbstractReportModel } from '../../../../src/models/AbstractReportModel';

jest.mock('../../../../src/utils/builder/CaseBuilder') // Mock CaseBuilder
jest.mock('../../../../src/utils/builder/ReportBuilder'); // Mock ReportBuilder


  

describe('BuildDirector', () => {
    let buildDirector: BuildDirector;
    let mockCaseBuilder: jest.Mocked<CaseBuilder>;
    let mockReportBuilder: jest.Mocked<ReportBuilder>;

    beforeEach(() => {
        mockCaseBuilder = new CaseBuilder() as jest.Mocked<CaseBuilder>;
        mockReportBuilder = new ReportBuilder() as jest.Mocked<ReportBuilder>;
        
        mockCaseBuilder = {
            build: jest.fn().mockReturnValue(new CaseModel('test', 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, '', [])),
        } as unknown as jest.Mocked<CaseBuilder>;

        buildDirector = new BuildDirector();
        buildDirector.caseBuilder = mockCaseBuilder;
        buildDirector.reportBuilder = mockReportBuilder;
    });

    test('should create an instance of BuildDirector', () => {
        expect(buildDirector).toBeDefined();
    });

    test('makeCase should return a CaseModel instance', () => {
        const caseModel = buildDirector.makeCase();
        expect(mockCaseBuilder.build).toHaveBeenCalled();
        expect(caseModel).toBeInstanceOf(CaseModel);
    });
});
