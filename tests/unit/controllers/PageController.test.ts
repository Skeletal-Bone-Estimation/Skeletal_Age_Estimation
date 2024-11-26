// __tests__/PageController.test.ts
import { PageController } from '../../../src/controllers/PageController';
import { DataController } from '../../../src/controllers/DataController';
import { XML_Controller } from '../../../src/controllers/XML_Controller';
import { Pages, SideBar, UI_Elements, Affinity, Sex, ThirdMolar, CaseElement } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/controllers/XML_Controller');

describe('PageController', () => {
    let pageController: PageController;

    beforeEach(() => {
        // Mock document elements
        document.body.innerHTML = `
            <div id="rootDiv"></div>
            <div id="rootBar"></div>
            <button id="homeBtn"></button>
            <button id="createBtn"></button>
            <button id="dataEntryBtn"></button>
            <button id="saveBtn"></button>
            <input id="loadCase" type="file" />
            <button id="loadBtn"></button>
        `;

        pageController = PageController.getInstance();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate only once (singleton pattern)', () => {
        const anotherInstance = PageController.getInstance();
        expect(pageController).toBe(anotherInstance);
    });

    it('should navigate to a specified page', async () => {
        const loadPageContentSpy = jest.spyOn<any, string>(
            pageController,
            'loadPageContent',
        );
        await pageController.navigateTo(Pages.Create);

        expect(loadPageContentSpy).toHaveBeenCalledWith(Pages.Create);
    });

    it('should initialize event listeners correctly', () => {
        const homeBtn = document.getElementById('homeBtn');
        const createBtn = document.getElementById('createBtn');
        const dataEntryBtn = document.getElementById('dataEntryBtn');

        expect(homeBtn).not.toBeNull();
        expect(createBtn).not.toBeNull();
        expect(dataEntryBtn).not.toBeNull();
    });

    it('should load the side bar content', async () => {
        const loadPageContentSpy = jest.spyOn<any, string>(
            pageController,
            'loadPageContent',
        );

        await pageController.loadSideBarContent(SideBar.createBar);
        expect(loadPageContentSpy).toHaveBeenCalledWith(SideBar.createBar);
    });

    it('should call DataController to create a case', () => {
        const mockCreateCase = jest.fn();
        (DataController.getInstance as jest.Mock).mockReturnValue({
            createCase: mockCreateCase,
        });

        pageController.createCase('test_id', Sex.Male, Affinity.White);
        expect(mockCreateCase).toHaveBeenCalledWith('test_id', Sex.Male, Affinity.White);
    });

    it('should handle editCase for valid UI elements', () => {
        const mockEditCase = jest.fn();
        (DataController.getInstance as jest.Mock).mockReturnValue({
            editCase: mockEditCase,
        });

        pageController.editCase(UI_Elements.dataSideCaseID, 'case_123');
        expect(mockEditCase).toHaveBeenCalledWith(CaseElement.caseID, 'case_123');
    });

    it('should throw an error for invalid UI elements in editCase', () => {
        expect(() => {
            pageController.editCase(999 as unknown as UI_Elements, 'invalid');
        }).toThrow('Invalid ui element passed to PageController.editcase()');
    });

    it('should call XML_Controller to save a case', () => {
        const mockSaveAsFile = jest.fn();
        const mockCase = { caseID: '1234' };
        (DataController.getInstance as jest.Mock).mockReturnValue({
            openCase: mockCase,
        });
        (XML_Controller.getInstance as jest.Mock).mockReturnValue({
            saveAsFile: mockSaveAsFile,
        });

        const saveBtn = document.createElement('button');
        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            return id === 'saveBtn' ? saveBtn : null;
        });

        saveBtn.dispatchEvent(new Event('click'));

        expect(mockSaveAsFile).toHaveBeenCalledWith(mockCase, 'save_data/1234.xml');
    });

    it('should handle the load case button click to trigger a file input', () => {
        const loadCaseInput = document.createElement('input');
        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            if (id === 'loadCase') return loadCaseInput;
            if (id === 'loadBtn') return document.createElement('button');
            return null;
        });

        const loadCaseClickSpy = jest.spyOn(loadCaseInput, 'click');

        const loadBtn = document.getElementById('loadBtn')!;
        loadBtn.dispatchEvent(new Event('click'));

        expect(loadCaseClickSpy).toHaveBeenCalled();
    });

    it('should integrate enums correctly for case editing', () => {
        const mockEditCase = jest.fn();
        (DataController.getInstance as jest.Mock).mockReturnValue({
            editCase: mockEditCase,
        });

        pageController.editCase(UI_Elements.thirdMolarTL, ThirdMolar.A);
        expect(mockEditCase).toHaveBeenCalledWith(CaseElement.thirdMolarTL, ThirdMolar.A);

        pageController.editCase(UI_Elements.dataSideAffinity, Affinity.Black);
        expect(mockEditCase).toHaveBeenCalledWith(CaseElement.affinity, Affinity.Black);
    });

    it('should log an error when attempting to load a non-existent page', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await pageController.navigateTo('invalidPage' as Pages);

        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error loading page:'));
        consoleErrorSpy.mockRestore();
    });
});
