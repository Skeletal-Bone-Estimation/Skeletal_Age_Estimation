import { CreateCaseView } from '../../../src/views/CreateCaseView';
import { PageController } from '../../../src/controllers/PageController';
import { XML_Controller } from '../../../src/controllers/XML_Controller';
import { DataController } from '../../../src/controllers/DataController';

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
        // Mock document and elements
        mockDocument = document as unknown as Document;
        mockCaseIDInput = document.createElement('input');
        mockCaseIDInput.id = 'case';
        mockSexSelect = document.createElement('select');
        mockSexSelect.id = 'sex';
        mockPopulationAffinitySelect = document.createElement('select');
        mockPopulationAffinitySelect.id = 'race';

        // Create and add options to the sex select
        const maleOption = document.createElement('option');
        maleOption.value = '0';
        maleOption.textContent = 'Male';
        const femaleOption = document.createElement('option');
        femaleOption.value = '1';
        femaleOption.textContent = 'Female';
        const unknownSexOption = document.createElement('option');
        unknownSexOption.value = '2';
        unknownSexOption.textContent = 'Unknown';

        mockSexSelect.appendChild(maleOption);
        mockSexSelect.appendChild(femaleOption);
        mockSexSelect.appendChild(unknownSexOption);

        // Create and add options to the population affinity select
        const blackOption = document.createElement('option');
        blackOption.value = '0';
        blackOption.textContent = 'Black';
        const whiteOption = document.createElement('option');
        whiteOption.value = '1';
        whiteOption.textContent = 'White';
        const unknownAffinityOption = document.createElement('option');
        unknownAffinityOption.value = '2';
        unknownAffinityOption.textContent = 'Unknown';

        mockPopulationAffinitySelect.appendChild(blackOption);
        mockPopulationAffinitySelect.appendChild(whiteOption);
        mockPopulationAffinitySelect.appendChild(unknownAffinityOption);

        // Create a mock contentDiv
        mockContentDiv = document.createElement('div');
        mockContentDiv.id = 'contentDiv';

        // Append elements to the document
        mockDocument.body.appendChild(mockCaseIDInput);
        mockDocument.body.appendChild(mockSexSelect);
        mockDocument.body.appendChild(mockPopulationAffinitySelect);
        mockDocument.body.appendChild(mockContentDiv);

        // Create a new instance of CreateCaseView
        createCaseView = new CreateCaseView(mockDocument);
        // Mock contentDiv in CreateCaseView instance
        createCaseView.contentDiv = mockContentDiv;

        // Mock the instance methods of PageController
        const mockPageController = {
            createCase: jest.fn(),
            navigateTo: jest.fn(),
            loadSideBarContent: jest.fn(),
        };
        (PageController.getInstance as jest.Mock).mockReturnValue(
            mockPageController,
        );

        // Mock XML_Controller instance and methods
        const mockXMLController = {
            saveAsFile: jest.fn(),
        };
        (XML_Controller.getInstance as jest.Mock).mockReturnValue(
            mockXMLController,
        );

        // Mock DataController instance and its openCase getter
        const mockDataController = {
            openCase: { caseID: '123' },
        };
        (DataController.getInstance as jest.Mock).mockReturnValue(
            mockDataController,
        );

        // Ensure that these methods are also mocked
        XML_Controller.getInstance().saveAsFile = jest.fn();
    });

    it('should set up an event listener and call methods on click', () => {
        // Prepare the HTML content to render, ensuring createStartCase exists
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

                <button id="createStart" class="button-dark">Create</button>
            </div>
        `;
        createCaseView.render(htmlContent);

        // Set values for the input elements before clicking
        // Log the value of sex select
        mockCaseIDInput.value = 'testCaseID'; // Set case ID
        mockSexSelect.value = '1'; // Set sex to 'Female' (value = 1)
        mockPopulationAffinitySelect.value = '2'; // Set population affinity to 'Unknown' (value = 2)

        // Trigger the click event on the button
        const createStartCaseButton =
            mockDocument.getElementById('createStart');
        if (createStartCaseButton) {
            createStartCaseButton.click();
        }

        // Assertions
        expect(PageController.getInstance().createCase).toHaveBeenCalledWith(
            'testCaseID',
            1, // sex (Female)
            2, // population affinity (Unknown)
        );
        expect(XML_Controller.getInstance().saveAsFile).toHaveBeenCalledWith(
            DataController.getInstance().openCase,
            'save_data/123.xml',
        );
        expect(PageController.getInstance().navigateTo).toHaveBeenCalledWith(
            'dataEntry',
        );
        expect(
            PageController.getInstance().loadSideBarContent,
        ).toHaveBeenCalledWith('dataEntrySide');
    });
});
