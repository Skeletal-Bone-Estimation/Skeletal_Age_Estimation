//refactored to pass 2/20
import { ComparePageView } from '../../../src/views/ComparePageView';
import { PageController } from '../../../src/controllers/PageController';
import { DataController } from '../../../src/controllers/DataController';
import { ReportModel } from '../../../src/models/ReportModel';
import { CaseModel } from '../../../src/models/CaseModel';
import { Side, Pages } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/PageController');
jest.mock('../../../src/controllers/DataController');

describe('ComparePageView', () => {
  let view: ComparePageView;
  let doc: Document;
  let mockCase: CaseModel;
  let dummyReport: ReportModel;
  let mockPageController: { navigateTo: jest.Mock };
  let mockDataController: { openCase: CaseModel };

  beforeEach(() => {
    // Set up the DOM with required elements.
    document.body.innerHTML = `
      <div id="rootDiv"></div>
      <button id="backBtn"></button>
      <div id="reportCaseTitleCompare"></div>
      <div id="summarizedRange"></div>
      <div id="pubicData"></div>
      <div id="auricularData"></div>
      <div id="sternalData"></div>
      <div id="molarData"></div>
    `;
    doc = document;

    // Create a dummy case
    mockCase = { caseID: 'dummyCase123' } as CaseModel;

    // Create a dummy ReportModel with stubbed methods.
    dummyReport = {
      getPubicSymphysis: jest.fn((side) => side === Side.L ? 10 : 20),
      getPubicSymphysisRange: jest.fn((side) =>
        side === Side.L ? { min: 5, max: 15 } : { min: 15, max: 25 }
      ),
      getAuricularSurface: jest.fn((side) => side === Side.L ? 30 : 40),
      getAuricularSurfaceRange: jest.fn((side) =>
        side === Side.L ? { min: 25, max: 35 } : { min: 35, max: 45 }
      ),
      getSternalEnd: jest.fn((side) => side === Side.L ? 50 : 60),
      getSternalEndRange: jest.fn((side) =>
        side === Side.L ? { min: 45, max: 55 } : { min: 55, max: 65 }
      ),
      getThirdMolar: jest.fn((side) => {
        switch (side) {
          case Side.TL: return 0; // Under 18.
          case Side.TR: return 1; // Possibly 18.
          case Side.BL: return 2; // Likely 18 or Older.
          case Side.BR: return 3; // 18 or Older.
          default: return 99;
        }
      }),
    } as unknown as ReportModel;

    // Setup mocks for controllers.
    mockPageController = {
      navigateTo: jest.fn(),
    };
    (PageController.getInstance as jest.Mock).mockReturnValue(mockPageController);

    mockDataController = { openCase: mockCase };
    (DataController.getInstance as jest.Mock).mockReturnValue(mockDataController);

    // Create an instance of ComparePageView.
    view = new ComparePageView(doc);
  });

  describe('render method', () => {
    it('should inject HTML content into rootDiv and attach a click listener to backBtn', () => {
      const testHTML = '<p>Compare Page Content</p>';
      view.render(testHTML);
      const rootDiv = doc.getElementById('rootDiv');
      expect(rootDiv!.innerHTML).toBe(testHTML);

      // Simulate clicking the back button; the listener should call navigateTo(Pages.Report)
      const backBtn = doc.getElementById('backBtn');
      backBtn?.click();
      expect(mockPageController.navigateTo).toHaveBeenCalledWith(Pages.Report);
    });
  });

  describe('loadReport method', () => {
    it('should load report data into the compare page', () => {
      // Call render to ensure event listeners are attached.
      view.render('<p>dummy</p>');
      view.loadReport(dummyReport);

      // Check the case title element is populated.
      const caseTitle = doc.getElementById('reportCaseTitleCompare');
      expect(caseTitle?.textContent).toBe(`Case ID: ${mockCase.caseID}`);

      // Check the summarized range element.
      const summarizedRange = doc.getElementById('summarizedRange');
      expect(summarizedRange?.textContent).toBe('Summarized Range: To Be Determined');

      // Check pubic data section.
      const pubicData = doc.getElementById('pubicData');
      expect(pubicData?.innerHTML).toContain('Pubic Symphysis:');
      expect(pubicData?.innerHTML).toContain('Left: 10');
      expect(pubicData?.innerHTML).toContain('95% Confidence Range: 5 - 15');
      expect(pubicData?.innerHTML).toContain('Right: 20');
      expect(pubicData?.innerHTML).toContain('95% Confidence Range: 15 - 25');

      // Check auricular data section.
      const auricularData = doc.getElementById('auricularData');
      expect(auricularData?.innerHTML).toContain('Auricular Surface:');
      expect(auricularData?.innerHTML).toContain('Left: 30');
      expect(auricularData?.innerHTML).toContain('95% Confidence Range: 25 - 35');
      expect(auricularData?.innerHTML).toContain('Right: 40');
      expect(auricularData?.innerHTML).toContain('95% Confidence Range: 35 - 45');

      // Check sternal data section.
      const sternalData = doc.getElementById('sternalData');
      expect(sternalData?.innerHTML).toContain('Sternal End:');
      expect(sternalData?.innerHTML).toContain('Left: 50');
      expect(sternalData?.innerHTML).toContain('95% Confidence Range: 45 - 55');
      expect(sternalData?.innerHTML).toContain('Right: 60');
      expect(sternalData?.innerHTML).toContain('95% Confidence Range: 55 - 65');

      // Check molar data section.
      const molarData = doc.getElementById('molarData');
      expect(molarData?.innerHTML).toContain('Third Molar:');
      expect(molarData?.innerHTML).toContain('Top Left: Under 18.');
      expect(molarData?.innerHTML).toContain('Top Right: Possibly 18');
      expect(molarData?.innerHTML).toContain('Bottom Left: Likely 18 or Older');
      expect(molarData?.innerHTML).toContain('Bottom Right: 18 or Older');
    });
  });
});
