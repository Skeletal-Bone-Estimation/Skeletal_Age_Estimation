//updated 2/20
import { CreateCaseView } from '../../../src/views/CreateCaseView';
import { PageController } from '../../../src/controllers/PageController';
import { XML_Controller } from '../../../src/controllers/XML_Controller';
import { DataController } from '../../../src/controllers/DataController';
import { Pages, SideBar, UI_Elements } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/PageController');
jest.mock('../../../src/controllers/XML_Controller');
jest.mock('../../../src/controllers/DataController');

describe('CreateCaseView', () => {
  let createCaseView: CreateCaseView;
  let mockDocument: Document;
  let mockCaseIDInput: HTMLInputElement;
  let mockSexSelect: HTMLSelectElement;
  let mockPopulationAffinitySelect: HTMLSelectElement;
  let mockContentDiv: HTMLElement;

  beforeEach(() => {
    // Set up DOM elements
    mockDocument = document;
    // Create input for case ID
    mockCaseIDInput = document.createElement('input');
    mockCaseIDInput.id = 'case';
    // Create select for sex
    mockSexSelect = document.createElement('select');
    mockSexSelect.id = 'sex';
    // Create options for sex
    const optionMale = document.createElement('option');
    optionMale.value = '0';
    optionMale.textContent = 'Male';
    const optionFemale = document.createElement('option');
    optionFemale.value = '1';
    optionFemale.textContent = 'Female';
    const optionUnknown = document.createElement('option');
    optionUnknown.value = '2';
    optionUnknown.textContent = 'Unknown';
    mockSexSelect.appendChild(optionMale);
    mockSexSelect.appendChild(optionFemale);
    mockSexSelect.appendChild(optionUnknown);

    // Create select for population affinity
    mockPopulationAffinitySelect = document.createElement('select');
    mockPopulationAffinitySelect.id = 'race';
    const optionBlack = document.createElement('option');
    optionBlack.value = '0';
    optionBlack.textContent = 'Black';
    const optionWhite = document.createElement('option');
    optionWhite.value = '1';
    optionWhite.textContent = 'White';
    const optionUnknownAffinity = document.createElement('option');
    optionUnknownAffinity.value = '2';
    optionUnknownAffinity.textContent = 'Unknown';
    mockPopulationAffinitySelect.appendChild(optionBlack);
    mockPopulationAffinitySelect.appendChild(optionWhite);
    mockPopulationAffinitySelect.appendChild(optionUnknownAffinity);

    // Create content div (for AbstractView)
    mockContentDiv = document.createElement('div');
    mockContentDiv.id = 'contentDiv';

    // Create the button for starting case creation
    const createButton = document.createElement('button');
    createButton.id = UI_Elements.createStartCase;

    // Clear and append elements to document.body
    document.body.innerHTML = '';
    document.body.appendChild(mockCaseIDInput);
    document.body.appendChild(mockSexSelect);
    document.body.appendChild(mockPopulationAffinitySelect);
    document.body.appendChild(mockContentDiv);
    document.body.appendChild(createButton);

    // Create instance of CreateCaseView and set its contentDiv
    createCaseView = new CreateCaseView(mockDocument);
    createCaseView.contentDiv = mockContentDiv;

    // Set up mocks for controllers
    const mockPageController = {
      createCase: jest.fn(),
      navigateTo: jest.fn(),
    };
    (PageController.getInstance as jest.Mock).mockReturnValue(mockPageController);

    const mockXMLController = {
      saveAsFile: jest.fn(),
    };
    (XML_Controller.getInstance as jest.Mock).mockReturnValue(mockXMLController);

    const mockDataController = {
      openCase: { caseID: '123' },
    };
    (DataController.getInstance as jest.Mock).mockReturnValue(mockDataController);
  });

  it('should set up an event listener and call methods on click', () => {
    // Prepare HTML content that includes the createStartCase button and necessary inputs/selects
    const htmlContent = `
      <div id="createDiv">
        <label for="case">Skeletal ID:</label>
        <input type="text" id="case" name="case" maxlength="20">

        <label for="sex">Sex:</label>
        <select name="sex" id="sex">
          <option value="2">Unknown</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>

        <label for="race">Population Affinity:</label>
        <select name="race" id="race">
          <option value="2">Unknown</option>
          <option value="0">Black</option>
          <option value="1">White</option>
        </select>

        <button id="${UI_Elements.createStartCase}" class="button-dark">Create</button>
      </div>
    `;
    createCaseView.render(htmlContent);

    // Set values for the input elements
    mockCaseIDInput.value = 'testCaseID'; // Case ID
    mockSexSelect.value = '1'; // Female (value = 1)
    mockPopulationAffinitySelect.value = '2'; // Unknown (value = 2)

    // Simulate the click event on the create button
    const createStartCaseButton = document.getElementById(UI_Elements.createStartCase);
    createStartCaseButton?.click();

    const pageController = PageController.getInstance();
    const xmlController = XML_Controller.getInstance();
    const dataController = DataController.getInstance();

    // Verify that createCase was called with correct parameters
    expect(pageController.createCase).toHaveBeenCalledWith(
      'testCaseID',
      1, // parsed sex
      2  // parsed population affinity
    );
    // Verify that saveAsFile was called with the openCase and correct file path
    expect(xmlController.saveAsFile).toHaveBeenCalledWith(
      dataController.openCase,
      'save_data/123.xml'
    );
    // Verify that navigateTo was called with the expected arguments
    expect(pageController.navigateTo).toHaveBeenCalledWith(
      Pages.DataEntry,
      SideBar.dataBar
    );
  });
});
