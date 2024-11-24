import { PageController } from '../../../src/controllers/PageController';
import { DataController } from '../../../src/controllers/DataController';
import { XML_Controller } from '../../../src/controllers/XML_Controller';
import {
    Pages,
    SideBar,
    UI_Elements,
    Affinity,
    Sex,
    ThirdMolar,
    CaseElement,
    AuricularArea,
    SternalEnd,
    PubicSymphysis,
} from '../../../src/utils/enums';
import { HomePageView } from '../../../src/views/HomePageView';
import { CreateCaseView } from '../../../src/views/CreateCaseView';
import { DataEntryView } from '../../../src/views/DataEntryView';

jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/controllers/XML_Controller');
jest.mock('../../../src/views/HomePageView');
jest.mock('../../../src/views/CreateCaseView');
jest.mock('../../../src/views/DataEntryView');

describe('PageController', () => {
    let controller: PageController;

    beforeEach(() => {
        // Get the singleton instance
        controller = PageController.getInstance();
        document.body.innerHTML = `
        <div id="sidebar"></div>
        <button id="dataEntryBtn">Data Entry</button>
        `;
    });
    

    test('should return the same instance every time', async () => {
        const controller1 = PageController.getInstance();
        const controller2 = PageController.getInstance();
      
        // Ensure both instances are the same (singleton behavior)
        expect(controller1).toBe(controller2);
      });
      

    it('should initialize the views correctly', () => {
        // Accessing the private 'views' property via reflection
        const views = controller['views'];

        // Checking that the 'views' object is initialized with the correct views
        expect(views).toHaveProperty('home');
        expect(views.home).toBeInstanceOf(HomePageView); // Assuming HomePageView is the correct type
        expect(views).toHaveProperty('create');
        expect(views.create).toBeInstanceOf(CreateCaseView); // Assuming CreateCaseView is the correct type
        expect(views).toHaveProperty('dataEntry');
        expect(views.dataEntry).toBeInstanceOf(DataEntryView); // Assuming DataEntryView is the correct type
    });

    it('should navigate to the correct page when navigateTo is called', async () => {
        // Cast controller to 'any' to bypass TypeScript errors
        const loadPageSpy = jest.spyOn(controller as any, 'loadPage');

        // Call navigateTo with Pages.Home
        await controller.navigateTo(Pages.Home);

        // Verify loadPage was called with the correct page
        expect(loadPageSpy).toHaveBeenCalledWith(Pages.Home);
    });

    it('should call createCase on DataController when createCase is invoked', () => {
        const createCaseSpy = jest.spyOn(
            DataController.getInstance(),
            'createCase',
        );
        controller.createCase('123', 1, 2);
        expect(createCaseSpy).toHaveBeenCalledWith('123', 1, 2);
    });

    it('should load side bar content when loadSideBarContent is called', async () => {
        const loadSideBarContentSpy = jest.spyOn(
            controller,
            'loadSideBarContent',
        );
        await controller.loadSideBarContent(SideBar.homeBar);
        expect(loadSideBarContentSpy).toHaveBeenCalledWith(SideBar.homeBar);
    });

    it('should trigger the correct action when the home button is clicked', () => {
        const homeBtn = document.createElement('button');
        homeBtn.id = 'homeBtn';
        document.body.appendChild(homeBtn);

        const navigateToSpy = jest.spyOn(controller, 'navigateTo');
        homeBtn.click();

        expect(navigateToSpy).toHaveBeenCalledWith(Pages.Home);
    });

    it('should trigger the correct action when the create button is clicked', () => {
        const createBtn = document.createElement('button');
        createBtn.id = 'createBtn';
        document.body.appendChild(createBtn);

        const navigateToSpy = jest.spyOn(controller, 'navigateTo');
        const loadSideBarContentSpy = jest.spyOn(
            controller,
            'loadSideBarContent',
        );

        createBtn.click();

        expect(navigateToSpy).toHaveBeenCalledWith(Pages.Create);
        expect(loadSideBarContentSpy).toHaveBeenCalledWith(SideBar.createBar);
    });

    it('should trigger the correct action when the data entry button is clicked', () => {
        const dataEntryBtn = document.createElement('button');
        dataEntryBtn.id = 'dataEntryBtn';
        document.body.appendChild(dataEntryBtn);

        const navigateToSpy = jest.spyOn(controller, 'navigateTo');
        const loadSideBarContentSpy = jest.spyOn(
            controller,
            'loadSideBarContent',
        );

        dataEntryBtn.click();

        expect(navigateToSpy).toHaveBeenCalledWith(Pages.DataEntry);
        expect(loadSideBarContentSpy).toHaveBeenCalledWith(SideBar.dataBar);
    });

    it('should trigger save case when save button is clicked', () => {
        const saveBtn = document.createElement('button');
        saveBtn.id = 'saveBtn';
        document.body.appendChild(saveBtn);

        const saveAsFileSpy = jest.spyOn(
            XML_Controller.getInstance(),
            'saveAsFile',
        );
        saveBtn.click();

        expect(saveAsFileSpy).toHaveBeenCalled();
    });

    it('should handle file load when load button is clicked', () => {
        const loadBtn = document.createElement('button');
        loadBtn.id = 'loadBtn';
        document.body.appendChild(loadBtn);

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'loadCase';
        document.body.appendChild(fileInput);

        const loadCaseFromFileSpy = jest.spyOn(
            DataController.getInstance(),
            'loadCaseFromFile',
        );
        const navigateToSpy = jest.spyOn(controller, 'navigateTo');

        loadBtn.click();

        expect(loadCaseFromFileSpy).toHaveBeenCalled();
        expect(navigateToSpy).toHaveBeenCalledWith(Pages.DataEntry);
    });

    it('should edit case correctly when editCase is invoked', () => {
        const editCaseSpy = jest.spyOn(
            DataController.getInstance(),
            'editCase',
        );

        // Example: Using a valid UI_Elements and content from the enums
        controller.editCase(UI_Elements.dataSideSex, Sex.Male); // edit with a valid UI_Elements and Sex enum

        // Check that editCase was called with the correct parameters
        expect(editCaseSpy).toHaveBeenCalledWith(1, Sex.Male); // CaseElement.sex = 1, Sex.Male = 0
    });

    it('should throw error for invalid edit case parameters', () => {
        // Invalid UI_Elements (e.g., value doesn't exist in UI_Elements)
        expect(() => {
            controller.editCase('999' as UI_Elements, 'invalid content' as any); // Invalid element ID
        }).toThrow('Invalid ui element passed to PageController.editcase()');

        // Invalid content type (passing incompatible content)
        expect(() => {
            controller.editCase(
                UI_Elements.dataSideSex,
                'invalid content' as any,
            ); // Expected to throw error because the content should be a Sex enum
        }).toThrow('Invalid ui element passed to PageController.editcase()');
    });
});
