// tests/integration/views/DataEntryView.integration.test.ts

// Polyfill TextEncoder/TextDecoder for Jest + JSDOM
import { TextEncoder, TextDecoder } from 'util';
;(global as any).TextEncoder = TextEncoder;
;(global as any).TextDecoder = TextDecoder;

// ----------------------------------------------------------------------------
// 1) Prevent XML writes by mocking out XML_Controller.saveAsFile
// ----------------------------------------------------------------------------
jest.mock('../../../src/controllers/XML_Controller', () => ({
  XML_Controller: { saveAsFile: jest.fn() },
}));

// ----------------------------------------------------------------------------
// 2) Mock PageController so its real constructor/initEventListeners never run
// ----------------------------------------------------------------------------
import { DataController } from '../../../src/controllers/DataController';
import { CaseElement } from '../../../src/utils/enums';

const mockPageController = {
  navigateTo: jest.fn(),
  loadModal:  jest.fn(),
  editCase:   (_id: any, _content: any) => {},  // overridden per-test
};

jest.mock('../../../src/controllers/PageController', () => ({
  PageController: { getInstance: () => mockPageController },
}));

// ----------------------------------------------------------------------------
// 3) Mock AnalysisContext.getInstance globally
// ----------------------------------------------------------------------------
const analysisSpy = { analyze: jest.fn().mockResolvedValue(undefined) };
jest.mock('../../../src/utils/analyzer/AnalysisContext', () => ({
  AnalysisContext: { getInstance: jest.fn(() => analysisSpy) },
}));

// ----------------------------------------------------------------------------
// 4) Now import your real view, model, and enums
// ----------------------------------------------------------------------------
import { DataEntryView } from '../../../src/views/DataEntryView';
import { CaseModel } from '../../../src/models/CaseModel';
import { AbstractReportModel } from '../../../src/models/AbstractReportModel';
import { NullReportModel } from '../../../src/models/NullReportModel';
import {
  UI_Elements,
  Modals,
  Pages,
  SideBar,
  Sex,
  Affinity,
  ThirdMolar,
  PubicSymphysis,
  AuricularArea,
  SternalEnd,
} from '../../../src/utils/enums';

describe('DataEntryView Integration', () => {
  let dataCtrl: DataController;
  let view: DataEntryView;
  let testCase: CaseModel;

  // IDs of the inputs auto-populated by autoLoadCaseData
  const featureKeys: Array<keyof typeof UI_Elements> = [
    'auricularAreaL','auricularAreaR',
    'pubicSymphysisL','pubicSymphysisR',
    'fourthRibL','fourthRibR',
    'thirdMolarTL','thirdMolarTR',
    'thirdMolarBL','thirdMolarBR',
    'notes',
  ];

  beforeEach(() => {
    // — Build a minimal DOM with every element DataEntryView expects —
    document.body.innerHTML = `
      <div id="rootDiv"></div>
      <div id="topBarButtons" style="display:none"></div>

      <!-- Sidebar -->
      <input  id="${UI_Elements.dataSideCaseID}" />
      <select id="${UI_Elements.dataSideSex}">
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <select id="${UI_Elements.dataSideAffinity}">
        <option value="white">white</option>
        <option value="black">black</option>
      </select>

      <!-- Data-entry inputs -->
      ${featureKeys.map(k => `<input id="${UI_Elements[k]}" />`).join('\n')}

      <!-- Action buttons -->
      <button id="${UI_Elements.analyzeButton}">Analyze</button>
      <button id="${UI_Elements.guideButton}">Guide</button>

      <!-- Gallery containers -->
      <div id="galleryAuricular"></div>
      <div id="galleryPubic"></div>
      <div id="gallerySternal"></div>
      <div id="galleryMolar"></div>

      <!-- Other elements to silence console.errors -->
      <button id="${UI_Elements.mostRecentReportButton}"></button>
      <select id="${UI_Elements.analysisSelector}"></select>
      <input type="checkbox" id="ML_Checkbox" />
      <button id="${UI_Elements.uploadAuricularImages}"></button>
      <button id="${UI_Elements.uploadPubicImages}"></button>
      <button id="${UI_Elements.uploadSternalImages}"></button>
      <button id="${UI_Elements.uploadMolarImages}"></button>
    `;

    // — Reset and seed the real DataController singleton —
    dataCtrl = DataController.getInstance();
    dataCtrl.loadedCases.splice(0, dataCtrl.loadedCases.length);

    // — Create a fully-populated CaseModel (including NullReportModel) —
    testCase = new CaseModel(
      'CASE42',
      Affinity.White,
      Sex.Male,
      '/tmp',
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
      'hello world',
      [] as AbstractReportModel[],
      new NullReportModel()
    );
    testCase.auricularSurfaceImages = ['data:image/png;base64,AAA'];

    dataCtrl.loadedCases.push(testCase);
    dataCtrl.makeActiveCase(0);

    // — Override mockPageController.editCase to map sidebar IDs → CaseElement enums —
    const mapIdToElem: Record<string, CaseElement> = {
      [UI_Elements.dataSideCaseID]:   CaseElement.caseID,
      [UI_Elements.dataSideSex]:      CaseElement.sex,
      [UI_Elements.dataSideAffinity]: CaseElement.affinity,
    };
    mockPageController.editCase = (id: string, content: any) => {
      const elem = mapIdToElem[id];
      if (elem !== undefined) {
        DataController.getInstance().editCase(elem, content);
      }
    };

    // — Instantiate & render your view —
    view = new DataEntryView(document);
    view.render('<form></form>');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    mockPageController.navigateTo.mockClear();
    mockPageController.loadModal.mockClear();
    analysisSpy.analyze.mockClear();
  });

  it('autoLoadCaseData populates fields from the model', () => {
    expect(
      (document.getElementById(UI_Elements.dataSideCaseID) as HTMLInputElement).value
    ).toBe('CASE42');

    expect(
      (document.getElementById(UI_Elements.notes) as HTMLInputElement).value
    ).toBe('hello world');
  });

  it('clicking "View Auricular Images" opens the gallery modal', () => {
    const btn = document.querySelector('#galleryAuricular button') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    btn.click();

    expect(mockPageController.loadModal).toHaveBeenCalledWith(
      Modals.Gallery,
      '',
      { title: 'Auricular Images', images: testCase.auricularSurfaceImages }
    );
  });

  it('changing sidebar inputs updates the CaseModel without FS errors', () => {
    const idInput   = document.getElementById(UI_Elements.dataSideCaseID)    as HTMLInputElement;
    const sexSelect = document.getElementById(UI_Elements.dataSideSex)       as HTMLSelectElement;
    const affSelect = document.getElementById(UI_Elements.dataSideAffinity) as HTMLSelectElement;

    idInput.value    = 'NEWID';
    idInput.dispatchEvent(new Event('input'));
    expect(testCase.caseID).toBe('NEWID');

    sexSelect.value  = 'female';
    sexSelect.dispatchEvent(new Event('input'));
    expect(testCase.sex).toBe(Sex.Female);

    affSelect.value  = 'black';
    affSelect.dispatchEvent(new Event('input'));
    expect(testCase.populationAffinity).toBe(Affinity.Black);
  });

  it('analyze button calls analyze() and navigates to Report', async () => {
    const btn = document.getElementById(UI_Elements.analyzeButton) as HTMLButtonElement;
    btn.click();
    await Promise.resolve(); // wait for mock analyze()

    expect(analysisSpy.analyze).toHaveBeenCalledWith(testCase);
    expect(mockPageController.navigateTo).toHaveBeenCalledWith(
      Pages.Report,
      SideBar.dataBar
    );
  });

});
