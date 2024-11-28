import { XML_Controller } from '../../../src/controllers/XML_Controller';
import { CaseModel } from '../../../src/models/CaseModel';
import { NullCaseModel } from '../../../src/models/NullCaseModel';
import { Builder } from 'xml2js';
import { writeFileSync } from 'fs';

jest.mock('fs', () => ({
    writeFileSync: jest.fn(),
}));

describe('XML_Controller', () => {
    let xmlController: XML_Controller;

    beforeEach(() => {
        (XML_Controller as any)['instance'] = null;

        xmlController = XML_Controller.getInstance();
    });

    it('should return the same instance for getInstance', () => {
        const secondInstance = XML_Controller.getInstance();
        expect(secondInstance).toBe(xmlController);
    });

    it('should initialize currentDoc as null', () => {
        expect(xmlController.getCurrentDoc()).toBeNull();
    });

    describe('parseSingleFile', () => {
        it('should return a NullCaseModel if currentDoc is null', () => {
            const parsedCase = xmlController.parseSingleFile();
            expect(parsedCase).toBeInstanceOf(NullCaseModel);
        });

        it('should parse XML data into a CaseModel', () => {
            const mockXmlContent = `
                <root>
                    <_caseID>1234</_caseID>
                    <_populationAffinity>1</_populationAffinity>
                    <_sex>0</_sex>
                    <_thirdMolarTL>2</_thirdMolarTL>
                    <_thirdMolarTR>3</_thirdMolarTR>
                    <_thirdMolarBL>4</_thirdMolarBL>
                    <_thirdMolarBR>5</_thirdMolarBR>
                    <_pubicSymphysisL>6</_pubicSymphysisL>
                    <_pubicSymphysisR>7</_pubicSymphysisR>
                    <_auricularAreaL>8</_auricularAreaL>
                    <_auricularAreaR>9</_auricularAreaR>
                    <_fourthRibL>10</_fourthRibL>
                    <_fourthRibR>11</_fourthRibR>
                    <_notes>Test notes</_notes>
                </root>
            `;
            xmlController['currentDoc'] = new DOMParser().parseFromString(
                mockXmlContent,
                'application/xml',
            );

            const parsedCase = xmlController.parseSingleFile();

            if (parsedCase instanceof CaseModel) {
                // Type narrowing ensures safe access to CaseModel properties
                expect(parsedCase.caseID).toBe('1234');
                expect(parsedCase.populationAffinity).toBe(1);
                expect(parsedCase.sex).toBe(0);
            } else {
                fail('Expected CaseModel but got NullCaseModel');
            }
        });
    });

    describe('loadFile', () => {
        it('should load an XML file and set currentDoc', (done) => {
            const mockFileContent = `
                <root>
                    <_caseID>1234</_caseID>
                </root>
            `;
            const mockEvent = {
                target: {
                    files: [new Blob([mockFileContent], { type: 'application/xml' })],
                },
            } as unknown as Event;
        
            const callback = jest.fn();
            const fileReaderMock = {
                readAsText: jest.fn(),
                onload: jest.fn(),
                onerror: jest.fn(),
            };
            jest.spyOn(window, 'FileReader').mockImplementation(() => fileReaderMock as unknown as FileReader);
        
            xmlController.loadFile(mockEvent, callback);
        
            // Simulate file load
            fileReaderMock.onload({
                target: { result: mockFileContent },
            });
        
            // Replace setImmediate with setTimeout
            setTimeout(() => {
                expect(xmlController.getCurrentDoc()).not.toBeNull();
                expect(callback).toHaveBeenCalled();
                done();
            }, 0);
        });
        

        it('should throw an error if no file is selected', () => {
            const mockEvent = {
                target: { files: null },
            } as unknown as Event;

            expect(() => xmlController.loadFile(mockEvent, jest.fn())).toThrow(
                'No file selected',
            );
        });
    });

    describe('saveAsFile', () => {
        it('should save a CaseModel to an XML file', () => {
            const mockCase = new CaseModel(
                '1234',
                1, // Affinity
                0, // Sex
                2, // ThirdMolarTL
                3, // ThirdMolarTR
                4, // ThirdMolarBL
                5, // ThirdMolarBR
                6, // PubicSymphysisL
                7, // PubicSymphysisR
                7, // AuricularAreaL
                7, // AuricularAreaR
                7, // FourthRibL
                7, // FourthRibR
                'Test notes',
                {}, // Reports
            );
            const mockFilename = 'testFile.xml';
            const mockBuilder = jest.spyOn(Builder.prototype, 'buildObject').mockReturnValue('<xml></xml>');

            xmlController.saveAsFile(mockCase, mockFilename);

            expect(mockBuilder).toHaveBeenCalledWith({ object: mockCase });
            expect(writeFileSync).toHaveBeenCalledWith(mockFilename, '<xml></xml>', 'utf-8');
        });
    });

});
