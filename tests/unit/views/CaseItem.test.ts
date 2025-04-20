// __tests__/CaseItem.test.ts
import { CaseItem } from '../../../src/views/CaseItem';
import { DataController } from '../../../src/controllers/DataController';
import { PageController } from '../../../src/controllers/PageController';
import { Pages, SideBar } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/controllers/PageController');

describe('CaseItem', () => {
  let dataControllerMock: any;
  let pageControllerMock: any;

  beforeEach(() => {
    // prepare a container for renderCase()
    document.body.innerHTML = '<div id="caseList"></div>';

    dataControllerMock = { openCaseID: 'case1' };
    (DataController.getInstance as jest.Mock).mockReturnValue(dataControllerMock);

    pageControllerMock = {
      makeActiveCase: jest.fn(),
      renderCases: jest.fn(),
      navigateTo: jest.fn(),
      deleteCaseItem: jest.fn(),
    };
    (PageController.getInstance as jest.Mock).mockReturnValue(pageControllerMock);
  });

  test('id getter returns the caseID', () => {
    const item = new CaseItem('case1');
    expect(item.id).toBe('case1');
  });

  test('renderCase when not active: creates Select button enabled', () => {
    // Test Data Input:
    // - DataController.getInstance().openCaseID = 'other'
    dataControllerMock.openCaseID = 'other';

    const item = new CaseItem('case1');
    item.renderCase();

    const caseDiv = document.querySelector('.caseItem')!;
    const span = caseDiv.querySelector('span')!;
    const selectBtn = caseDiv.querySelector<HTMLButtonElement>('button')!;

    // Expected Result:
    // - span.textContent === 'case1'
    // - selectBtn.textContent === 'Select'
    // - selectBtn.disabled === false
    expect(span.textContent).toBe('case1');
    expect(selectBtn.textContent).toBe('Select');
    expect(selectBtn.disabled).toBe(false);
  });

  test('renderCase when active: creates Active button disabled', () => {
    // Test Data Input:
    // - DataController.getInstance().openCaseID = 'case1'
    dataControllerMock.openCaseID = 'case1';

    const item = new CaseItem('case1');
    item.renderCase();

    const activeBtn = document.querySelector<HTMLButtonElement>('.caseItem button')!;

    // Expected Result:
    // - activeBtn.textContent === 'Active'
    // - activeBtn.disabled === true
    expect(activeBtn.textContent).toBe('Active');
    expect(activeBtn.disabled).toBe(true);
  });
});
