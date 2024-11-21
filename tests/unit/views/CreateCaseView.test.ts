//CreateCaseView.test.ts
import { CreateCaseView } from '../../../src/views/CreateCaseView';
import { PageController } from '../../../src/controllers/PageController';
import { XML_Controller } from '../../../src/controllers/XML_Controller';
import { DataController } from '../../../src/controllers/DataController';
import { CaseModel } from '../../../src/models/CaseModel';
import { Pages, SideBar, UI_Elements } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/PageController', () => ({
    PageController: {
        getInstance: jest.fn(() => ({
            createCase: jest.fn(),
            navigateTo: jest.fn(),
            loadSideBarContent: jest.fn(),
        })),
    },
}));

jest.mock('../../../src/controllers/XML_Controller', () => ({
    XML_Controller: {
        getInstance: jest.fn(() => ({
            saveAsFile: jest.fn(),
        })),
    },
}));

jest.mock('../../../src/controllers/DataController', () => ({
    DataController: {
        getInstance: jest.fn(() => ({
            openCase: { caseID: 'test_case' } as CaseModel,
        })),
    },
}));

describe('CreateCaseView', () => {
    let createCaseView: CreateCaseView;
    let mockDocument: Document;

    beforeEach(() => {
        // Create a new mock document for each test
        mockDocument = document.implementation.createHTMLDocument();

        // Create and append the required elements to the mock document
        const contentDiv = mockDocument.createElement('div');
        contentDiv.id = 'content';
        mockDocument.body.appendChild(contentDiv);

        const createButton = mockDocument.createElement('button');
        createButton.id = UI_Elements.createStartCase; // Ensure this matches the value in CreateCaseView
        mockDocument.body.appendChild(createButton);

        const caseInput = mockDocument.createElement('input');
        caseInput.id = 'case';
        caseInput.value = '12345';
        mockDocument.body.appendChild(caseInput);

        const sexSelect = mockDocument.createElement('select');
        sexSelect.id = 'sex';
        sexSelect.innerHTML = `<option value="1">Female</option>`;
        mockDocument.body.appendChild(sexSelect);

        const raceSelect = mockDocument.createElement('select');
        raceSelect.id = 'race';
        raceSelect.innerHTML = `<option value="2">Unknown</option>`;
        mockDocument.body.appendChild(raceSelect);

        // Initialize CreateCaseView with the mock document
        createCaseView = new CreateCaseView(mockDocument);
    });

    it('should handle button click and call the appropriate methods', () => {
        // Log the DOM to check if the button exists
        console.log(mockDocument.body.innerHTML); // Check if the button is in the DOM

        // Render the view with test content (this should now be after creating the button)
        createCaseView.render('<p>Test Content</p>');

        // Ensure the button is correctly set up
        const createButton = mockDocument.getElementById(
            UI_Elements.createStartCase,
        ) as HTMLButtonElement;
        console.log(createButton); // Log the button element

        expect(createButton).not.toBeNull(); // Verify button exists

        // Simulate the button click
        createButton.click();

        // Verify that the method is called with the expected arguments
        const pageControllerInstance = PageController.getInstance();
        expect(pageControllerInstance.createCase).toHaveBeenCalledWith(
            '12345', // caseID
            1, // sex
            2, // populationAffinity
        );
    });
});
