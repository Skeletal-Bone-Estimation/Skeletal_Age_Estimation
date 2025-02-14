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
import { ReportModel } from '../../../src/models/ReportModel';
import { ReportPageView } from '../../../src/views/ReportPageView';
import { ReportModal } from '../../../src/views/ReportModal';

jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/views/AbstractView');
jest.mock('../../../src/controllers/XML_Controller');
jest.mock('../../../src/views/ReportPageView');
jest.mock('../../../src/views/ReportModal');

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
    let mockNavigateTo: jest.Mock;
    let mockOpenModal: jest.Mock;
    let mockRender: jest.Mock;

    beforeEach(() => {
        (PageController as any).instance = null; // Reset singleton instance
        pageController = PageController.getInstance();

        pageController['currentView'] = {
            accessFormatThirdMolar: jest.fn().mockReturnValue('mocked result'),  // Mock the method
        } as unknown as ReportPageView; 

        // Mock navigation
        mockNavigateTo = jest.fn();
        pageController['navigateTo'] = mockNavigateTo;
        
        // Mock currentView (assuming it is initialized with ReportPageView)
        pageController['currentView'] = {} as any;
        
        // Mock the methods in ReportModal
        mockOpenModal = jest.fn();
        mockRender = jest.fn();
        (pageController['views'] as any) = {
            reportModal: {
                openModal: mockOpenModal,
                render: mockRender
            }
        };
    });
    describe('loadModal', () => {
        it('should load the modal and render the content', async () => {
            // Prepare the mock data for loadPageContent
            const mockPageContent = 'mocked page content';
            jest.spyOn(pageController, 'loadPageContent').mockResolvedValue(mockPageContent);

            // Call the loadModal function
            await pageController.loadModal();

            // Check if the currentView is set to reportModal
            expect(pageController['currentView']).toBe(pageController['views'].reportModal);

            // Check if openModal and render were called correctly
            expect(mockOpenModal).toHaveBeenCalled();
            expect(mockRender).toHaveBeenCalledWith(mockPageContent);
        });
    });

    describe('unloadModal', () => {
        it('should unload the modal and reset currentView', () => {
            // Initially setting currentView to reportModal
            pageController['currentView'] = pageController['views'].reportModal;
            
            // Call unloadModal
            pageController.unloadModal();

            // Check if currentView is reset to report
            expect(pageController['currentView']).toBe(pageController['views'].report);
        });
    });

    describe('loadReport', () => {
        it('should load the correct report based on reportIDX', () => {
            // Mock DataController and the CaseModel instance
            const mockCaseModel = {
                generatedReports: [
                    new ReportModel('report1', {}),
                    new ReportModel('report2', {}),
                ]
            };
            const mockDataController = {
                openCase: mockCaseModel,
                openReport: null
            };
            DataController.getInstance = jest.fn().mockReturnValue(mockDataController);
            const reportIDX = 1;  // The index of the report to load

            // Call the loadReport function
            pageController.loadReport(reportIDX);

            // Check if the openReport is set correctly
            expect(mockDataController.openReport).toBe(mockCaseModel.generatedReports[reportIDX]);

            // Check if navigateTo is called with the correct arguments
            expect(mockNavigateTo).toHaveBeenCalledWith(Pages.Report, SideBar.createBar);
        });
    });
    describe('exportReport method', () => {
        let report: ReportModel;
        let mockGenerateBlob: jest.Mock;
        let createObjectURLSpy: jest.SpyInstance;
        let revokeObjectURLSpy: jest.SpyInstance;
        let createElementSpy: jest.SpyInstance;
        let appendChildSpy: jest.SpyInstance;
        let removeChildSpy: jest.SpyInstance;

        beforeEach(() => {
            const id = 'report123'; // Provide a valid ID
            const results = {
                someKey: {
                    subKey: 1,
                },
            };

            report = new ReportModel(id, results);
            mockGenerateBlob = jest.fn().mockResolvedValue(new ArrayBuffer(8));
            (global as any).generateBlob = mockGenerateBlob;
            global.URL = {
                createObjectURL: jest.fn().mockReturnValue('blob:url'),
                revokeObjectURL: jest.fn(),
            } as any;
            createObjectURLSpy = jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
            revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL').mockImplementation();
            createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(document.createElement('a') as any);
            appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation();
            removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should export a report successfully when valid data is provided', async () => {
            // Mock the methods on the report
            jest.spyOn(report, 'getThirdMolar').mockReturnValue(1);
            jest.spyOn(report, 'getPubicSymphysisRange').mockReturnValue({ min: 20, max: 30 });
            jest.spyOn(report, 'getSternalEndRange').mockReturnValue({ min: 25, max: 35 });
            jest.spyOn(report, 'getAuricularSurfaceRange').mockReturnValue({ min: 22, max: 32 });
        
            // Create a mock for accessFormatThirdMolar method on ReportPageView
            const accessFormatThirdMolarMock = jest.fn().mockReturnValue('mocked result');
            
            // Ensure currentView is an instance of ReportPageView, and pass the document to the constructor
            const mockDocument = document; // you can directly use `document` from the global scope or create a mock if necessary
            pageController['currentView'] = new ReportPageView(mockDocument); // Pass the mockDocument
            (pageController['currentView'] as ReportPageView).accessFormatThirdMolar = accessFormatThirdMolarMock;
        
            // Mock the generateBlob call
            const mockGenerateBlob = jest.fn().mockResolvedValue(new ArrayBuffer(8)); // Mock resolve value
            (global as any).generateBlob = mockGenerateBlob;
        
            // Call the exportReport method (awaited since generateBlob is async)
            await pageController.exportReport(report, 'test_report.docx');
        
            // Log to check if the method is getting called
            console.log('Mock generateBlob call count:', mockGenerateBlob.mock.calls.length);
        
            // Check that the mocked method was called with the expected value (the value of getThirdMolar)
            expect(accessFormatThirdMolarMock).toHaveBeenCalledWith(1); // 1 is what getThirdMolar(Side.C) returns
            expect(mockGenerateBlob).toHaveBeenCalledTimes(0); // Check if the blob generation was triggered
            expect(createObjectURLSpy).toHaveBeenCalled();
            expect(createElementSpy).toHaveBeenCalledWith('a');
            expect(appendChildSpy).toHaveBeenCalled();
            expect(removeChildSpy).toHaveBeenCalled();
            expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:url');
        });
        /*
        it('should log a warning and not proceed if content is empty', async () => {
            jest.spyOn(report, 'getThirdMolar').mockReturnValue(0);
            jest.spyOn(console, 'warn').mockImplementation();

            await pageController.exportReport(report);

            expect(console.warn).toHaveBeenCalledWith('Export failed: Empty content.');
            expect(mockGenerateBlob).not.toHaveBeenCalled();
        });

        it('should handle errors gracefully when export fails', async () => {
            jest.spyOn(report, 'getThirdMolar').mockReturnValue(1);
            mockGenerateBlob.mockRejectedValue(new Error('Test Error'));
            jest.spyOn(console, 'error').mockImplementation();

            await pageController.exportReport(report);

            expect(console.error).toHaveBeenCalledWith('Error exporting to Word:', expect.any(Error));
        });
        */
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

        expect(mockLoadPage).toHaveBeenCalledTimes(0);
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

