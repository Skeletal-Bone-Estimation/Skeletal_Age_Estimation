import { CompareModal } from '../../../src/views/CompareModal';
import { DataController } from '../../../src/controllers/DataController';
import { PageController } from '../../../src/controllers/PageController';
import { NullReportModel } from '../../../src/models/NullReportModel';
import { ReportModel } from '../../../src/models/ReportModel';
import {
  UI_Elements,
  Pages,
  SideBar,
  Observers,
} from '../../../src/utils/enums';

jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/controllers/PageController');

describe('CompareModal', () => {
  let modal: CompareModal;
  let dcMock: any;
  let pcMock: any;

  beforeEach(() => {
    // Set up DOM for modal container, content, list, and buttons
    document.body.innerHTML = `
      <div id="${UI_Elements.modalContainer}" style="display:none">
        <div id="${UI_Elements.modalContent}"></div>
      </div>
      <ul id="${UI_Elements.reportArchiveList}"></ul>
      <button id="${UI_Elements.viewReportCompareButton}">View</button>
      <button id="${UI_Elements.closeModalButton}"></button>
    `;

    // Mock DataController singleton
    dcMock = {
      loadedCases: [],
      openCaseID: 'case1',
      findCaseIndex: jest.fn().mockReturnValue(0),
      findReportIndex: jest.fn().mockReturnValue(0), // Ensure this is properly mocked
    };
    (DataController.getInstance as jest.Mock).mockReturnValue(dcMock);

    // Mock PageController singleton
    pcMock = {
      navigateTo: jest.fn(),
      loadReportCompare: jest.fn(),
    };
    (PageController.getInstance as jest.Mock).mockReturnValue(pcMock);

    modal = new CompareModal(document);
  });

  it('openModal displays the modal container', async () => {
    await modal.openModal();
    expect(
      (document.getElementById(UI_Elements.modalContainer) as HTMLElement)
        .style.display
    ).toBe('flex');
  });

  it('render with no cases loaded displays "No cases loaded."', async () => {
    dcMock.loadedCases = [];
    await modal.render('<p>foo</p>');
    const list = document.getElementById(
      UI_Elements.reportArchiveList
    ) as HTMLElement;
    expect(list.innerHTML).toBe('No cases loaded.');
  });

  it('render with case but no reports displays "No reports loaded."', async () => {
    dcMock.loadedCases = [{ generatedReports: [] }];
    await modal.render('<p>foo</p>');
    const list = document.getElementById(
      UI_Elements.reportArchiveList
    ) as HTMLElement;
    expect(list.innerHTML).toBe('No reports loaded.');
  });

  it('renders list items for reports and clicking view on a real report notifies and closes modal', async () => {
    // Prepare one null and one real report
    const nullR = new NullReportModel();
    const realR = new ReportModel('RID123', {}, null);
    // Create a case stub with notify spy
    const caseStub = {
      generatedReports: [nullR, realR],
      notify: jest.fn(),
    };
    dcMock.loadedCases = [caseStub];
    dcMock.findCaseIndex.mockReturnValue(0);

    await modal.render('<p>foo</p>');

    const list = document.getElementById(
      UI_Elements.reportArchiveList
    ) as HTMLElement;
    const items = Array.from(list.querySelectorAll('li'));
    expect(items.map(i => i.textContent)).toEqual([
      `Report: ${nullR.id}`,
      `Report: ${realR.id}`,
    ]);

    // Select the real report (index 1)
    items[1].click();
    // Click the "View" button
    await (document.getElementById(
      UI_Elements.viewReportCompareButton
    ) as HTMLButtonElement).click();

    // For a real report, should call notify + loadReportCompare + closeModal
    expect(caseStub.notify).toHaveBeenCalledWith(
      Observers.setSelectedReport,
      realR.id
    );
    expect(pcMock.loadReportCompare).toHaveBeenCalledWith(1);
    expect(
      (document.getElementById(UI_Elements.modalContainer) as HTMLElement)
        .style.display
    ).toBe('none');
  });


  it('close button hides the modal container', () => {
    // Pre-open
    const container = document.getElementById(
      UI_Elements.modalContainer
    ) as HTMLElement;
    container.style.display = 'flex';

    // Close
    (document.getElementById(
      UI_Elements.closeModalButton
    ) as HTMLButtonElement).click();

    expect(container.style.display).toBe('none');
  });
});
