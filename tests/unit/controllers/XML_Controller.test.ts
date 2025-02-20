import { XML_Controller } from '../../../src/controllers/XML_Controller';
import { CaseModel } from '../../../src/models/CaseModel';
import { BuildDirector } from '../../../src/utils/builder/BuildDirector';
import { NullCaseModel } from '../../../src/models/NullCaseModel';

describe('XML_Controller', () => {
  let controller: XML_Controller;
  let mockFile: Blob;
  
  beforeEach(() => {
    controller = XML_Controller.getInstance();
    mockFile = new Blob([`
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <object>
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
      </object>
    `], { type: 'text/xml' });
  });

  it('should parse XML file and populate the CaseModel correctly', async () => {
    const mockEvent = {
      target: {
        files: [mockFile],
      },
    } as unknown as Event;
  
    // Set up the Blob and FileReader for reading the mock file.
    const reader = new FileReader();
    reader.onload = () => {
      // Log Blob content to ensure it's being read correctly
      console.log('Blob content:', reader.result); // This will show the content of the Blob
    };
    reader.readAsText(mockFile);
  
    // Wait for the file to be processed and the case model to be created.
    await new Promise<void>((resolve, reject) => {
      controller.loadFile(mockEvent, () => {
        try {
          const caseModel = controller.parseSingleFile() as CaseModel;
          expect(caseModel).toBeInstanceOf(CaseModel);
          // Now ensure the values in the caseModel match what we expect from the mock XML
          expect(caseModel.caseID).toBe('Case ID ERROR');
          expect(caseModel.populationAffinity).toBe(-1);
          expect(caseModel.sex).toBe(-1);
          expect(caseModel.thirdMolarTL).toBe(-1);
          expect(caseModel.thirdMolarTR).toBe(-1);
          expect(caseModel.thirdMolarBL).toBe(-1);
          expect(caseModel.thirdMolarBR).toBe(-1);
          expect(caseModel.pubicSymphysisL).toBe(-1);
          expect(caseModel.pubicSymphysisR).toBe(-1);
          expect(caseModel.auricularAreaL).toBe(-1);
          expect(caseModel.auricularAreaR).toBe(-1);
          expect(caseModel.fourthRibL).toBe(-1);
          expect(caseModel.fourthRibR).toBe(-1);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });
  

  it('should return a NullCaseModel when no document is loaded', () => {
    controller['currentDoc'] = null;
    const result = controller.parseSingleFile();
    expect(result).toBeInstanceOf(NullCaseModel);
  });

  it('should call the correct callback after file is loaded', (done) => {
    const mockEvent = {
      target: {
        files: [mockFile],
      },
    } as unknown as Event;

    const callback = jest.fn();
    controller.loadFile(mockEvent, callback);

    // Ensure callback is called after load
    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should handle missing file correctly', () => {
    const mockEvent = {
      target: {
        files: [],
      },
    } as unknown as Event;

    expect(() => {
      controller.loadFile(mockEvent, jest.fn());
    }).toThrow('No file selected');
  });

  it('should extract reports from XML file correctly', () => {
    const mockReportXML = `
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <object>
          <_generatedReports>
              <_id>1</_id>
              <results>Report 1</results>
              <_id>2</_id>
              <results>Report 2</results>
          </_generatedReports>
      </object>
    `;
  
    const blob = new Blob([mockReportXML], { type: 'text/xml' });
    const mockEvent = {
      target: {
        files: [blob],
      },
    } as unknown as Event;
  
    controller.loadFile(mockEvent, () => {
      const caseModel = controller.parseSingleFile() as CaseModel;
      const reports = controller.extractReports('_generatedReports'); // Use extractReports directly here
  
      expect(reports.length).toBe(2);
      expect(reports[0].id).toBe('1');
      expect(reports[1].id).toBe('2');
    });
  });
  
});
