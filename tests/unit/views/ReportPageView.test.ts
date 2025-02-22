//started feb 17
//finished feb 19:
//had to make some methods public in reportpageview

import { ReportPageView } from '../../../src/views/ReportPageView';
import { DataController } from '../../../src/controllers/DataController';
import { PageController } from '../../../src/controllers/PageController';
import { ReportModel } from '../../../src/models/ReportModel';
import { AbstractReportModel } from '../../../src/models/AbstractReportModel';
import { Pages, SideBar, UI_Elements, Side } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/controllers/PageController');

describe('ReportPageView', () => {
  let view: ReportPageView;
  let mockDocument: Document;

  beforeEach(() => {
    // Set up the DOM:
    // - "rootDiv" is required by AbstractView.
    // - The three buttons must have IDs matching UI_Elements.
    // - Other elements required by loadReport() and initEventListeners.
    document.body.innerHTML = `
      <div id="rootDiv"></div>
      <button id="${UI_Elements.reportArchiveButton}"></button>
      <button id="${UI_Elements.backtoDataEntryButton}"></button>
      <button id="${UI_Elements.downloadButton}"></button>
      <button id="compareBtn"></button>
      <div id="reportCaseTitle"></div>
      <div id="summarizedRange"></div>
      <div id="pubicData"></div>
      <div id="auricularData"></div>
      <div id="sternalData"></div>
      <div id="molarData"></div>
    `;
    mockDocument = document;
    view = new ReportPageView(mockDocument);
  });

  test('should initialize without errors', () => {
    expect(view).toBeDefined();
  });

  test('should load elements from DOM', () => {
    view.loadElements();
    // Expect three elements (archiveBtn, backBtn, downloadBtn)
    expect(view['elements'].length).toBe(3);
  });

  test('should render HTML content and initialize components', () => {
    const mockHTML = '<p>Test Content</p>';
    // Ensure that DataController returns a scenario with no report:
    (DataController.getInstance as jest.Mock).mockReturnValue({
      openReport: null,
      getMostRecentReport: jest.fn().mockReturnValue(null),
    });

    // Spy on loadElements and initEventListeners
    jest.spyOn(view, 'loadElements');
    jest.spyOn(view, 'initEventListeners');

    view.render(mockHTML);

    // The content should be rendered in "rootDiv" (not "content")
    expect(document.getElementById('rootDiv')!.innerHTML).toContain(mockHTML);
    expect(view.loadElements).toHaveBeenCalled();
    expect(view.initEventListeners).toHaveBeenCalled();
  });

  test('should set up event listeners correctly', () => {
    const navigateMock = jest.fn();
    (PageController.getInstance as jest.Mock).mockReturnValue({
      navigateTo: navigateMock,
      loadModal: jest.fn().mockResolvedValue(undefined),
      exportReport: jest.fn().mockResolvedValue(undefined),
    });
    // Supply getMostRecentReport in our mock so the code in initEventListeners doesn't fail.
    (DataController.getInstance as jest.Mock).mockReturnValue({
      getMostRecentReport: jest.fn().mockReturnValue(null),
    });
    // Ensure the elements array is populated.
    view.loadElements();
    view.initEventListeners();

    // Simulate clicking the back-to-data-entry button (second in the array).
    view['elements'][1].click();
    expect(navigateMock).toHaveBeenCalledWith(Pages.DataEntry, SideBar.dataBar);
  });

  test('should correctly calculate summarized range', () => {
    const mockReport: AbstractReportModel = {
      getPubicSymphysisRange: (_side: Side) => ({ min: 15, max: 40 }),
      getAuricularSurfaceRange: (_side: Side) => ({ min: 20, max: 50 }),
      getSternalEndRange: (_side: Side) => ({ min: 10, max: 45 }),
    } as unknown as AbstractReportModel;

    const result = view['calculateSummarizedRange'](mockReport);
    expect(result).toBe('10.00 - 50.00');
  });


  test('should format third molar results correctly for various values', () => {
    const testCases = [
      { input: 0, expected: 'Under 18.' },
      { input: 1, expected: 'Possibly 18' },
      { input: 2, expected: 'Likely 18 or Older' },
      { input: 3, expected: '18 or Older' },
      { input: 99, expected: 'Unknown' },
    ];
  
    testCases.forEach(({ input, expected }) => {
      expect(view.accessFormatThirdMolar(input)).toBe(expected);
    });
  });

  test('should trigger export on download button click', async () => {
    const exportMock = jest.fn().mockResolvedValue(undefined);
    (PageController.getInstance as jest.Mock).mockReturnValue({
      exportReport: exportMock,
      loadModal: jest.fn().mockResolvedValue(undefined),
      navigateTo: jest.fn(),
    });
    (DataController.getInstance as jest.Mock).mockReturnValue({
      openReport: {},
      getMostRecentReport: jest.fn().mockReturnValue({}),
    });
    // IMPORTANT: populate the elements array by calling loadElements() before initEventListeners().
    view.loadElements();
    view.initEventListeners();

    // Simulate a click on the download button using the element from our test DOM.
    const downloadBtn = document.getElementById(UI_Elements.downloadButton);
    downloadBtn?.click();

    // Wait for any asynchronous actions.
    await Promise.resolve();
    expect(exportMock).toHaveBeenCalled();
  });
});
