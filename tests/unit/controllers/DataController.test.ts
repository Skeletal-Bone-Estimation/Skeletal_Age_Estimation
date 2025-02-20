import { DataController } from '../../../src/controllers/DataController';
import { XML_Controller } from '../../../src/controllers/XML_Controller';
import { CaseModel } from '../../../src/models/CaseModel';
import { NullCaseModel } from '../../../src/models/NullCaseModel';
import { AbstractReportModel } from '../../../src/models/AbstractReportModel';
import { NullReportModel } from '../../../src/models/NullReportModel';
import { BuildDirector } from '../../../src/utils/builder/BuildDirector';
import { ReportModel } from '../../../src/models/ReportModel';
import { Affinity, Sex, ThirdMolar, PubicSymphysis, AuricularArea, SternalEnd } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/XML_Controller');
jest.mock('../../../src/utils/builder/BuildDirector', () => {
    const originalModule = jest.requireActual('../../../src/utils/builder/BuildDirector');
    return {
        ...originalModule,
        BuildDirector: jest.fn().mockImplementation(() => ({
            caseBuilder: {
                setCaseID: jest.fn(),
                setSex: jest.fn(),
                setPopulationAffinity: jest.fn(),
                setThirdMolarTL: jest.fn(),
                setThirdMolarTR: jest.fn(),
                setThirdMolarBL: jest.fn(),
                setThirdMolarBR: jest.fn(),
                setPubicSymphysisL: jest.fn(),
                setPubicSymphysisR: jest.fn(),
                setAuricularAreaL: jest.fn(),
                setAuricularAreaR: jest.fn(),
                setFourthRibL: jest.fn(),
                setFourthRibR: jest.fn(),
                setNotes: jest.fn(),
            },
            makeCase: jest.fn().mockReturnValue({
                caseID: '123',
                populationAffinity: Affinity.White,
                sex: Sex.Male,
                thirdMolarTL: ThirdMolar.A,
                thirdMolarTR: ThirdMolar.B,
                thirdMolarBL: ThirdMolar.C,
                thirdMolarBR: ThirdMolar.D,
                pubicSymphysisL: PubicSymphysis.One,
                pubicSymphysisR: PubicSymphysis.Two,
                auricularAreaL: AuricularArea.One,
                auricularAreaR: AuricularArea.Two,
                sternalEndL: SternalEnd.One,
                sternalEndR: SternalEnd.Two,
                notes: 'No additional notes',
                generatedReports: []
            }),
            makeReport: jest.fn().mockReturnValue(new ReportModel('report-001', {})),
        }))
    };
});

jest.mock('../../../src/models/CaseModel', () => ({
    CaseModel: jest.fn().mockImplementation(() => ({
        caseID: '123',
        populationAffinity: Affinity.White,
        sex: Sex.Male,
        thirdMolarTL: ThirdMolar.A,
        thirdMolarTR: ThirdMolar.B,
        thirdMolarBL: ThirdMolar.C,
        thirdMolarBR: ThirdMolar.D,
        pubicSymphysisL: PubicSymphysis.One,
        pubicSymphysisR: PubicSymphysis.Two,
        auricularAreaL: AuricularArea.One,
        auricularAreaR: AuricularArea.Two,
        sternalEndL: SternalEnd.One,
        sternalEndR: SternalEnd.Two,
        notes: 'No additional notes',
        generatedReports: []
    }))
}));

describe('DataController', () => {
    let dataController: DataController;
    let mockXMLController: jest.Mocked<XML_Controller>;
    let mockBuildDirector: jest.Mocked<BuildDirector>;

    beforeEach(() => {
        (XML_Controller.getInstance as jest.Mock).mockReturnValue({
            loadFile: jest.fn(),
            parseSingleFile: jest.fn(),
            loadCollection: jest.fn(),
            parseCollection: jest.fn()
        } as unknown as XML_Controller);
        
        mockXMLController = XML_Controller.getInstance() as jest.Mocked<XML_Controller>;
        
        dataController = DataController.getInstance();
        dataController.xmlController = mockXMLController;
    
        mockBuildDirector = jest.mocked(new BuildDirector(), { shallow: true });
    
        mockBuildDirector.caseBuilder.setCaseID = jest.fn();
        mockBuildDirector.caseBuilder.setSex = jest.fn();
        mockBuildDirector.caseBuilder.setPopulationAffinity = jest.fn();
        mockBuildDirector.caseBuilder.setThirdMolarTL = jest.fn();
        mockBuildDirector.caseBuilder.setThirdMolarTR = jest.fn();
        mockBuildDirector.caseBuilder.setThirdMolarBL = jest.fn();
        mockBuildDirector.caseBuilder.setThirdMolarBR = jest.fn();
        mockBuildDirector.caseBuilder.setPubicSymphysisL = jest.fn();
        mockBuildDirector.caseBuilder.setPubicSymphysisR = jest.fn();
        mockBuildDirector.caseBuilder.setAuricularAreaL = jest.fn();
        mockBuildDirector.caseBuilder.setAuricularAreaR = jest.fn();
        mockBuildDirector.caseBuilder.setFourthRibL = jest.fn();
        mockBuildDirector.caseBuilder.setFourthRibR = jest.fn();
        mockBuildDirector.caseBuilder.setNotes = jest.fn();
    
        mockBuildDirector.makeCase = jest.fn().mockReturnValue(new CaseModel(
            '123', // caseID
            Affinity.White, // populationAffinity
            Sex.Male, // sex
            ThirdMolar.A, // thirdMolarTL
            ThirdMolar.B, // thirdMolarTR
            ThirdMolar.C, // thirdMolarBL
            ThirdMolar.D, // thirdMolarBR
            PubicSymphysis.One, // pubicSymphysisL
            PubicSymphysis.Two, // pubicSymphysisR
            AuricularArea.One, // auricularAreaL
            AuricularArea.Two, // auricularAreaR
            SternalEnd.One, // fourthRibL
            SternalEnd.Two, // fourthRibR
            'No additional notes', // notes
            [] // generatedReports
        ));
        
        mockBuildDirector.makeReport = jest.fn().mockReturnValue(new ReportModel(
            'report-001', // id
            {} // results (empty object for now, modify if needed)
        ));
    
    });

    test('should be a singleton', () => {
        const instance1: DataController = DataController.getInstance();
        const instance2: DataController = DataController.getInstance();
        expect(instance1).toBe(instance2);
    });

    test('should add a case', () => {
        const newCase: CaseModel = new CaseModel('123', Affinity.White, Sex.Male, ThirdMolar.A, ThirdMolar.B, ThirdMolar.C, ThirdMolar.D, PubicSymphysis.One, PubicSymphysis.Two, AuricularArea.One, AuricularArea.Two, SternalEnd.One, SternalEnd.Two, 'No additional notes', []);
        dataController.addCase(newCase);
        expect(dataController.loadedCases).toContain(newCase);
    });

    test('should delete a case', () => {
        const newCase: CaseModel = new CaseModel('123', Affinity.White, Sex.Male, ThirdMolar.A, ThirdMolar.B, ThirdMolar.C, ThirdMolar.D, PubicSymphysis.One, PubicSymphysis.Two, AuricularArea.One, AuricularArea.Two, SternalEnd.One, SternalEnd.Two, 'No additional notes', []);
        dataController.addCase(newCase);
        dataController.deleteCase(newCase);
        expect(dataController.loadedCases).not.toContain(newCase);
    });
});
