// __tests__/PageController.test.ts
import { PageController } from '../../../src/controllers/PageController';
import {
    Pages,
    SideBar,
    UI_Elements,
    Sex,
    Affinity,
    ThirdMolar,
    AuricularArea,
    SternalEnd,
    PubicSymphysis,
    CaseElement
} from '../../../src/utils/enums';
import { DataController } from '../../../src/controllers/DataController';
import { AbstractView } from '../../../src/views/AbstractView';
import { XML_Controller } from '../../../src/controllers/XML_Controller';

jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/views/AbstractView');
jest.mock('../../../src/controllers/XML_Controller');

// Mock DOM elements
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

describe('PageController', () => {
    let pageController: PageController;

    beforeEach(() => {
        (PageController as any).instance = null; // Reset singleton instance
        pageController = PageController.getInstance();
    });

    it('should initialize with correct default values', () => {
        expect(pageController).toBeInstanceOf(PageController);
    });

    it('should return the same instance for multiple calls to getInstance', () => {
        const secondInstance = PageController.getInstance();
        expect(secondInstance).toBe(pageController);
    });

    it('should call navigateTo with the correct page', async () => {
        const mockLoadPage = jest
            .spyOn(pageController as any, 'loadPage')
            .mockResolvedValue(undefined);

        await pageController.navigateTo(Pages.Home);

        expect(mockLoadPage).toHaveBeenCalledWith(Pages.Home);
    });

    it('should handle errors when loading a page', async () => {
        const mockLoadPageContent = jest
            .spyOn(pageController as any, 'loadPageContent')
            .mockRejectedValue(new Error('Test Error'));
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await pageController['loadPage'](Pages.Home);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error loading page:',
            expect.any(Error),
        );
        mockLoadPageContent.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('should initialize event listeners correctly', () => {
        const homeBtn = document.getElementById('homeBtn');
        const createBtn = document.getElementById('createBtn');
        const dataEntryBtn = document.getElementById('dataEntryBtn');

        expect(homeBtn).not.toBeNull();
        expect(createBtn).not.toBeNull();
        expect(dataEntryBtn).not.toBeNull();
    });

    it('should call DataController to create a case', () => {
        const mockCreateCase = jest.fn();
        (DataController.getInstance as jest.Mock).mockReturnValue({
            createCase: mockCreateCase,
        });

        pageController.createCase('test_id', Sex.Male, Affinity.White);
        expect(mockCreateCase).toHaveBeenCalledWith('test_id', Sex.Male, Affinity.White);
    });
    describe('editCase method', () => {
        it('should correctly map UI_Elements.dataSideCaseID to CaseElement.caseID and call DataController', () => {
            const editCaseMock = jest.fn();
            DataController.getInstance = jest.fn().mockReturnValue({
                editCase: editCaseMock,
            });
    
            pageController.editCase(UI_Elements.dataSideCaseID, 'testCaseID');
    
            expect(editCaseMock).toHaveBeenCalledWith(CaseElement.caseID, 'testCaseID');
        });
    
        it('should correctly map UI_Elements.dataSideSex to CaseElement.sex and call DataController', () => {
            const editCaseMock = jest.fn();
            DataController.getInstance = jest.fn().mockReturnValue({
                editCase: editCaseMock,
            });
    
            pageController.editCase(UI_Elements.dataSideSex, Sex.Female);
    
            expect(editCaseMock).toHaveBeenCalledWith(CaseElement.sex, Sex.Female);
        });
    
        it('should correctly map UI_Elements.thirdMolarTL to CaseElement.thirdMolarTL and call DataController', () => {
            const editCaseMock = jest.fn();
            DataController.getInstance = jest.fn().mockReturnValue({
                editCase: editCaseMock,
            });
    
            pageController.editCase(UI_Elements.thirdMolarTL, ThirdMolar.C);
    
            expect(editCaseMock).toHaveBeenCalledWith(CaseElement.thirdMolarTL, ThirdMolar.C);
        });
    
        it('should correctly map UI_Elements.notes to CaseElement.notes and call DataController', () => {
            const editCaseMock = jest.fn();
            DataController.getInstance = jest.fn().mockReturnValue({
                editCase: editCaseMock,
            });
    
            pageController.editCase(UI_Elements.notes, 'Sample notes content');
    
            expect(editCaseMock).toHaveBeenCalledWith(CaseElement.notes, 'Sample notes content');
        });
    
        it('should throw an error for invalid UI_Elements', () => {
            expect(() =>
                pageController.editCase(-1 as unknown as UI_Elements, 'invalidContent'),
            ).toThrow('Invalid ui element passed to PageController.editcase()');
        });
    });

    it('should correctly load sidebar content', async () => {
        const mockLoadPageContent = jest
            .spyOn(pageController as any, 'loadPageContent')
            .mockResolvedValue('<div>Sidebar Content</div>');

        await pageController.loadSideBarContent(SideBar.homeBar);

        expect(mockLoadPageContent).toHaveBeenCalledWith(SideBar.homeBar);
        expect(document.getElementById('rootBar')!.innerHTML).toContain(
            'Sidebar Content',
        );
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
    
        // Reinitialize PageController to set up event listeners
        pageController = PageController.getInstance();
    
        // Simulate the save button click
        const saveBtn = document.getElementById('saveBtn')!;
        saveBtn.dispatchEvent(new Event('click'));
    
        // Verify that XML_Controller.saveAsFile was called with correct arguments
        expect(mockSaveAsFile).toHaveBeenCalledWith(mockCase, 'save_data/1234.xml');
    });
    
});
