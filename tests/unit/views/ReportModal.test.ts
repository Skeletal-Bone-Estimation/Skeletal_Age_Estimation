//started feb 17
//finished feb 17
import { ReportModal } from '../../../src/views/ReportModal';
import { DataController } from '../../../src/controllers/DataController';
import { PageController } from '../../../src/controllers/PageController';
import { ReportModel } from '../../../src/models/ReportModel';
import { CaseModel } from '../../../src/models/CaseModel';
import { Observers, Pages, SideBar, UI_Elements } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/controllers/PageController');

describe('ReportModal', () => {
  let modal: ReportModal;
  let doc: Document;

  // Create dummy report and dummy case for testing.
  const dummyReport: ReportModel = {
    id: 'report1',
    // Stub any other ReportModel properties/methods as needed.
  } as unknown as ReportModel;

  const dummyCase: CaseModel = {
    caseID: 'case1',
    generatedReports: [dummyReport],
    notify: jest.fn(),
    // Include other necessary properties/methods if needed.
  } as unknown as CaseModel;

  beforeEach(() => {
    // Set up the DOM with required elements for the modal.
    // The AbstractModal (extended by ReportModal) expects modalContainer and modalContent.
    document.body.innerHTML = `
      <div id="${UI_Elements.modalContainer}"></div>
      <div id="${UI_Elements.modalContent}"></div>
      <button id="${UI_Elements.viewReportButton}"></button>
      <button id="${UI_Elements.closeModalButton}"></button>
      <ul id="${UI_Elements.reportArchiveList}"></ul>
    `;
    doc = document;
    modal = new ReportModal(doc);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render modal content and fill report list when no cases are loaded', async () => {
    // Simulate no cases loaded.
    (DataController.getInstance as jest.Mock).mockReturnValue({
      loadedCases: [],
      openCase: null,
    });
    const htmlContent = '<p>Test Modal Content</p>';
    await modal.render(htmlContent);
    expect(doc.getElementById(UI_Elements.modalContent)?.innerHTML).toContain(htmlContent);
    // With no cases loaded, the report list should indicate so.
    expect(doc.getElementById(UI_Elements.reportArchiveList)?.innerHTML).toBe('No cases loaded.');
  });

  test('should open the modal by setting modalContainer display to flex', async () => {
    modal.openModal();
    expect(doc.getElementById(UI_Elements.modalContainer)?.style.display).toBe('flex');
  });

  test('should fill report list with available reports and allow selection', async () => {
    // Set up DataController to simulate a loaded case with one report.
    (DataController.getInstance as jest.Mock).mockReturnValue({
      loadedCases: [dummyCase],
      openCase: dummyCase,
      findReportIndex: jest.fn().mockReturnValue(0),
    });
    await modal.render('<p>Modal Content</p>');
    const list = doc.getElementById(UI_Elements.reportArchiveList);
    // The list should contain an <li> for the dummy report.
    expect(list?.innerHTML).toContain('Report: report1');

    // Simulate clicking the list item.
    const listItem = list?.querySelector('li');
    listItem?.dispatchEvent(new Event('click'));
    // The clicked item should have the "selected" class.
    expect(listItem?.classList.contains('selected')).toBe(true);
    // And the modal should record the selected index.
    expect((modal as any).selectedIdx).toBe(0);
  });

  test('should process viewReportButton click to load the selected report', async () => {
    // Set up PageController with spies for unloadModal and loadReport.
    const unloadModalMock = jest.fn();
    const loadReportMock = jest.fn();
    (PageController.getInstance as jest.Mock).mockReturnValue({
      unloadModal: unloadModalMock,
      loadReport: loadReportMock,
      navigateTo: jest.fn(),
    });
    // Set up DataController to simulate a loaded case with a valid report.
    (DataController.getInstance as jest.Mock).mockReturnValue({
      loadedCases: [dummyCase],
      openCase: dummyCase,
      findReportIndex: jest.fn().mockReturnValue(0),
    });
    await modal.render('<p>Modal Content</p>');
    // Manually set the selected index (as if a report was selected).
    (modal as any).selectedIdx = 0;
    // Simulate clicking the view report button.
    const viewReportBtn = doc.getElementById(UI_Elements.viewReportButton);
    viewReportBtn?.click();
    // Wait for any asynchronous operations.
    await Promise.resolve();
    // Verify that PageController's unloadModal and loadReport were called.
    expect(unloadModalMock).toHaveBeenCalled();
    expect(loadReportMock).toHaveBeenCalledWith(0);
  });

  test('should close modal when closeModalButton is clicked', async () => {
    // Provide a minimal DataController stub so fillReportList works.
    (DataController.getInstance as jest.Mock).mockReturnValue({
      loadedCases: [],
      openCase: null,
    });
    await modal.render('<p>dummy content</p>');
    // Spy on closeModal (inherited from AbstractModal)
    const closeModalSpy = jest
      .spyOn(modal as any, 'closeModal')
      .mockImplementation(() => {
        const container = doc.getElementById(UI_Elements.modalContainer);
        if (container) container.style.display = 'none';
      });
    const closeBtn = doc.getElementById(UI_Elements.closeModalButton);
    closeBtn?.click();
    expect(closeModalSpy).toHaveBeenCalled();
    expect(doc.getElementById(UI_Elements.modalContainer)?.style.display).toBe('none');
  });
});
