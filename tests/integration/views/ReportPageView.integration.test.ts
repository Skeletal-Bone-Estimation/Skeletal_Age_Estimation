// tests/integration/views/ReportPageView.integration.test.ts

// Polyfill TextEncoder/TextDecoder for Jest + JSDOM
import { TextEncoder, TextDecoder } from 'util';
;(global as any).TextEncoder = TextEncoder;
;(global as any).TextDecoder = TextDecoder;

// ----------------------------------------------------------------------------
// 1) Mock DataController and PageController so their real constructors never run
// ----------------------------------------------------------------------------
jest.mock('../../../src/controllers/DataController', () => ({
  DataController: { getInstance: jest.fn() },
}));
jest.mock('../../../src/controllers/PageController', () => ({
  PageController: { getInstance: jest.fn() },
}));

import { DataController } from '../../../src/controllers/DataController';
import { PageController } from '../../../src/controllers/PageController';
import { ReportPageView } from '../../../src/views/ReportPageView';
import { CaseModel } from '../../../src/models/CaseModel';
import { ReportModel } from '../../../src/models/ReportModel';
import { NullReportModel } from '../../../src/models/NullReportModel';
import {
  UI_Elements,
  Modals,
  Pages,
  SideBar,
  Side,
  Sex,
  Affinity,
} from '../../../src/utils/enums';

describe('ReportPageView Integration', () => {
  let view: ReportPageView;
  let mockDC: any;
  let mockPC: any;

  // a minimal stub ReportModel
  const testReport = {
    id: 'R1',
    ML_Result: 23.45,
    getPubicSymphysisRange: (_: Side) => ({ min: 10, max: 20 }),
    getAuricularSurfaceRange: (_: Side) => ({ min: 30, max: 40 }),
    getSternalEndRange: (_: Side) => ({ min: 50, max: 60 }),
  } as unknown as ReportModel;

  beforeEach(() => {
    // — Build a DOM with the required containers —
    document.body.innerHTML = `
      <div id="topBarButtons" style="display:none"></div>
      <div id="rootDiv"></div>
      <button id="${UI_Elements.reportArchiveButton}"></button>
      <button id="${UI_Elements.backtoDataEntryButton}"></button>
      <button id="${UI_Elements.downloadButton}"></button>
      <button id="compareBtn"></button>
      <div id="reportCaseTitle"></div>
      <div id="summarizedRange"></div>
      <div id="ML_Result"></div>
    `;

    // — Mock DataController to return our test report and case —
    mockDC = {
      openReport: testReport,
      loadedCases: [
        new CaseModel(
          'CASE1',
          Affinity.White,
          Sex.Male,
          '/tmp',
          1, 1, 1, 1,   // third molar values
          1, 1,         // pubic symphysis values
          1, 1,         // auricular area values
          1, 1,         // sternal end values
          'notes',
          [],
          new NullReportModel()
        ),
      ],
      findCaseIndex: jest.fn().mockReturnValue(0),
      getMostRecentReportIdx: jest.fn().mockReturnValue(0),
    };
    (DataController.getInstance as jest.Mock).mockReturnValue(mockDC);

    // — Mock PageController to capture navigation and modal calls —
    mockPC = {
      navigateTo: jest.fn(),
      loadModal: jest.fn().mockResolvedValue(undefined),
      exportReport: jest.fn().mockResolvedValue(undefined),
    };
    (PageController.getInstance as jest.Mock).mockReturnValue(mockPC);

    // — Instantiate & render the view —
    view = new ReportPageView(document);
    view.render('<div></div>');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    mockPC.navigateTo.mockClear();
    mockPC.loadModal.mockClear();
    mockPC.exportReport.mockClear();
  });

  it('auto-populates Case ID, summarized range, and ML result', () => {
    expect(
      document.getElementById('reportCaseTitle')!.textContent
    ).toBe('Case ID: CASE1');
    expect(
      document.getElementById('summarizedRange')!.textContent
    ).toBe('Summarized Range: 10.00 - 60.00');
    const ml = document.getElementById('ML_Result')!;
    expect(ml.textContent).toBe('Machine Learning Estimation: 23.45');
    expect(ml.style.display).toBe('block');
  });

  it('clicking archive button opens the report modal', () => {
    document
      .getElementById(UI_Elements.reportArchiveButton)!
      .click();
    expect(mockPC.loadModal).toHaveBeenCalledWith(Modals.Report);
  });

  it('clicking download button calls exportReport() with the current report', async () => {
    document.getElementById(UI_Elements.downloadButton)!.click();
    await Promise.resolve(); // wait for the async handler
    expect(mockPC.exportReport).toHaveBeenCalledWith(testReport);
  });

  it('clicking compare button navigates to Compare view', () => {
    document.getElementById('compareBtn')!.click();
    expect(mockPC.navigateTo).toHaveBeenCalledWith(
      Pages.Compare,
      SideBar.dataBar
    );
  });
});
