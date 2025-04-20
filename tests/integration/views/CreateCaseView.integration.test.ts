// tests/integration/views/CreateCaseView.integration.test.ts

// Polyfill TextEncoder/TextDecoder for Jest + JSDOM
import { TextEncoder, TextDecoder } from 'util';
;(global as any).TextEncoder = TextEncoder;
;(global as any).TextDecoder = TextDecoder;

// ----------------------------------------------------------------------------
// Set up our shared mocks BEFORE jest.mock calls
// ----------------------------------------------------------------------------
const mockPC = {
  loadModal: jest.fn(),
  createCase: jest.fn(),
  navigateTo: jest.fn(),
};
const mockDC = {
  loadedCases: [] as any[],
  findCaseIndex: jest.fn().mockReturnValue(0),
  openCaseID: 'DUMMY',
};
const xmlSaveSpy = jest.fn();

// Provide a fake window.electronAPI
;(global as any).window = {
  electronAPI: { selectFolder: jest.fn() },
};

// ----------------------------------------------------------------------------
// 1) Mock PageController, DataController, XML_Controller modules
// ----------------------------------------------------------------------------
jest.mock('../../../src/controllers/PageController', () => ({
  PageController: { getInstance: () => mockPC },
}));
jest.mock('../../../src/controllers/DataController', () => ({
  DataController: { getInstance: () => mockDC },
}));
jest.mock('../../../src/controllers/XML_Controller', () => ({
  XML_Controller: { getInstance: () => ({ saveAsFile: xmlSaveSpy }) },
}));

import { CreateCaseView } from '../../../src/views/CreateCaseView';
import { NullReportModel } from '../../../src/models/NullReportModel';
import { CaseModel } from '../../../src/models/CaseModel';
import { Modals, UI_Elements, Pages, SideBar } from '../../../src/utils/enums';

describe('CreateCaseView Integration', () => {
  let view: CreateCaseView;

  beforeEach(() => {
    // Clear mocks
    jest.clearAllMocks();

    // Build DOM fixture
    document.body.innerHTML = `
      <div id="topBarButtons" style="display:none"></div>
      <div id="content"></div>
    `;
    const content = document.getElementById('content')!;
    content.innerHTML = `
      <input id="case" />
      <select id="sex">
        <option value="0">Male</option>
        <option value="1">Female</option>
      </select>
      <select id="race">
        <option value="0">White</option>
        <option value="1">Black</option>
      </select>
      <button id="${UI_Elements.createStartCase}">Start Case</button>
      <button id="selectFolderBtn">Select Folder</button>
      <div id="pathText"></div>
    `;

    // Seed DataController.loadedCases
    mockDC.loadedCases = [
      new CaseModel(
        'CASE1',
        0, // affinity
        0, // sex
        '/tmp',
        1,1,1,1,  // third molars
        1,1,      // pubic symphysis
        1,1,      // auricular
        1,1,      // sternal
        'notes',
        [],
        new NullReportModel()
      ),
    ];
    mockDC.openCaseID = 'CASE1';
    mockDC.findCaseIndex.mockReturnValue(0);

    view = new CreateCaseView(document);
    view.render(''); // wire up listeners
  });

  it('shows error modal if CaseID is empty', () => {
    document.getElementById(UI_Elements.createStartCase)!.click();
    expect(mockPC.loadModal).toHaveBeenCalledWith(
      Modals.Error,
      '<strong>Skeletal ID</strong> cannot be empty.'
    );
  });

  it('shows error modal if save location is not selected', () => {
    (document.getElementById('case') as HTMLInputElement).value = 'CASE123';
    document.getElementById(UI_Elements.createStartCase)!.click();
    expect(mockPC.loadModal).toHaveBeenCalledWith(
      Modals.Error,
      'A <strong>save location</strong> must be selected.'
    );
  });

  it('updates pathText and button label when selecting folder', async () => {
    (window as any).electronAPI.selectFolder.mockResolvedValue('/my/path');
    await document.getElementById('selectFolderBtn')!.click();
    await Promise.resolve();
    expect(document.getElementById('pathText')!.innerHTML).toBe('/my/path');
    expect(document.getElementById('selectFolderBtn')!.innerHTML).toBe('Select New Folder');
  });

  it('creates case, saves file, and navigates on valid input', async () => {
    (document.getElementById('case') as HTMLInputElement).value = 'CASE123';
    (window as any).electronAPI.selectFolder.mockResolvedValue('/my/path');
    await document.getElementById('selectFolderBtn')!.click();
    await Promise.resolve();

    document.getElementById(UI_Elements.createStartCase)!.click();

    expect(mockPC.createCase).toHaveBeenCalledWith(
      'CASE123',
      0,
      0,
      '/my/path'
    );
    expect(xmlSaveSpy).toHaveBeenCalledWith(
      mockDC.loadedCases[0],
      '/my/path',
      'CASE1'
    );
    expect(mockPC.navigateTo).toHaveBeenCalledWith(
      Pages.DataEntry,
      SideBar.dataBar
    );
  });
});
