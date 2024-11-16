//XML_Controller.test.ts
import { XML_Controller } from '../../../src/controllers/XML_Controller';
import { CaseModel } from '../../../src/models/CaseModel';
import { NullCaseModel } from '../../../src/models/NullCaseModel';
import { BuildDirector } from '../../../src/utils/builder/BuildDirector';
import { CaseBuilder } from '../../../src/utils/builder/CaseBuilder';

jest.mock('fs', () => ({
    writeFileSync: jest.fn(),
}));


//XML_Controller.getInstance()
describe('XML_Controller Singleton', () => {
    //getInstance()
    test('getInstance always returns the same instance', () => {
        const instance1 = XML_Controller.getInstance();
        const instance2 = XML_Controller.getInstance();
        expect(instance1).toBe(instance2);
    });
});

//XML_Controller.parseSingleFile()
describe('XML_Controller parseSingleFile', () => {
    //parseSingleFile()
    jest.mock('../../../src/utils/builder/BuildDirector');
    var controller: XML_Controller;

    beforeEach(() => {
        controller = XML_Controller.getInstance();
    });

    it('should return NullCaseModel when currentDoc is null', () => {
        const result = controller.parseSingleFile();
        expect(result).toBeInstanceOf(NullCaseModel);
    });

    it('should parse XML file and populate the CaseModel', (done) => {
        const mockFile = `
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <object>
                <observers/>
                <_caseID>test</_caseID>
                <_populationAffinity>2</_populationAffinity>
                <_sex>2</_sex>
                <_thirdMolarTL>8</_thirdMolarTL>
                <_thirdMolarTR>8</_thirdMolarTR>
                <_thirdMolarBL>8</_thirdMolarBL>
                <_thirdMolarBR>8</_thirdMolarBR>
                <_pubicSymphysisL>8</_pubicSymphysisL>
                <_pubicSymphysisR>8</_pubicSymphysisR>
                <_auricularAreaL>7</_auricularAreaL>
                <_auricularAreaR>7</_auricularAreaR>
                <_fourthRibL>8</_fourthRibL>
                <_fourthRibR>8</_fourthRibR>
                <_generatedReports/>
            </object>
        `;

        const mockEvent = {
            target: {
                files: [mockFile],
            },
        } as unknown as Event;

        const director: BuildDirector = new BuildDirector();
        const builder: CaseBuilder = director.caseBuilder;

        // Call loadFile and pass the mock file event
        controller.loadFile(mockEvent, () => {
            const result = controller.parseSingleFile();

            // Check that the caseBuilder was called with correct arguments
            expect(builder.setCaseID).toHaveBeenCalledWith('test');
            expect(builder.setPopulationAffinity).toHaveBeenCalledWith(2);
            expect(builder.setSex).toHaveBeenCalledWith(2);
            expect(builder.setThirdMolarTL).toHaveBeenCalledWith(8);
            expect(builder.setThirdMolarTR).toHaveBeenCalledWith(8);
            expect(builder.setThirdMolarBL).toHaveBeenCalledWith(8);
            expect(builder.setThirdMolarBR).toHaveBeenCalledWith(8);
            expect(builder.setPubicSymphysisL).toHaveBeenCalledWith(8);
            expect(builder.setPubicSymphysisR).toHaveBeenCalledWith(8);
            expect(builder.setAuricularAreaL).toHaveBeenCalledWith(7);
            expect(builder.setAuricularAreaR).toHaveBeenCalledWith(7);
            expect(builder.setFourthRibL).toHaveBeenCalledWith(8);
            expect(builder.setFourthRibR).toHaveBeenCalledWith(8);

            
            expect(result).toBeInstanceOf(CaseModel);
            done();
        });
    });
});

//XML_Controller.loadFile()
describe('XML_Controller loadFile', () => {
    var controller: XML_Controller;
    var file: File;

    beforeEach(() => {
        controller = XML_Controller.getInstance();

        file = new File(
            ['<document><_caseID>test</_caseID></document'],
            'loadTest.xml',
            { type: 'text/xml' },
        );

        
    });

    test('should load file and set currentDoc', (done) => {
        const event = {
            target: { files: [file] },
        } as unknown as Event;

        controller.loadFile(event, () => {
            expect(controller.getCurrentDoc).not.toBeNull();
            const caseID = (
                controller.getCurrentDoc() as Document
            ).getElementsByTagName('_caseID')[0].textContent;
            expect(caseID).toBe('test');
            done();
        });
    });
});

//XML_Controller.saveAsFile()
describe('XML_Controller saveAsFile', () => {
    var controller: XML_Controller;

    beforeEach(() => {
        controller = XML_Controller.getInstance();
    });

    test('should save the case as an XML file', () => {
        const mockCaseModel = { some: 'data' };
        const filename = 'saveTest.xml';
        controller.saveAsFile(mockCaseModel as any, filename);
        expect(jest.fn().mock).toHaveBeenCalledWith(
            filename,
            expect.stringContaining('<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><object><some>data</some></object>'),
            'utf-8',
        );
    });
});
