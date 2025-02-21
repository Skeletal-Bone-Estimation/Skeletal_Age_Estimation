import { ReportModal } from '../../../src/views/ReportModal';
import { DataController } from '../../../src/controllers/DataController';
import { PageController } from '../../../src/controllers/PageController';
import { CaseModel } from '../../../src/models/CaseModel';
import { AbstractReportModel } from '../../../src/models/AbstractReportModel';
import { UI_Elements } from '../../../src/utils/enums';

// Mock UI Elements
document.body.innerHTML = `
    <div id="${UI_Elements.modalContainer}" style="display:none;"></div>
    <div id="${UI_Elements.modalContent}"></div>
    <ul id="${UI_Elements.reportArchiveList}"></ul>
    <button id="${UI_Elements.viewReportButton}"></button>
    <button id="${UI_Elements.closeModalButton}"></button>
`;

// Mock DataController and PageController
jest.mock('../../../src/controllers/DataController');
jest.mock('../../../src/controllers/PageController');

describe('ReportModal', () => {
    let reportModal: ReportModal;
    let mockDataController: jest.Mocked<DataController>;
    let mockPageController: jest.Mocked<PageController>;
    let mockCaseModel: jest.Mocked<CaseModel>;

    beforeEach(() => {
        jest.clearAllMocks();


        mockCaseModel = {
            generatedReports: [
                { id: 'report123' } as unknown as AbstractReportModel,
            ],
            notify: jest.fn(),
        } as unknown as jest.Mocked<CaseModel>;


        mockDataController = {
            getInstance: jest.fn(() => mockDataController),
            loadedCases: [mockCaseModel as unknown as CaseModel],
            findReportIndex: jest.fn().mockReturnValue(0),
        } as unknown as jest.Mocked<DataController>;

        Object.defineProperty(mockDataController, 'openCase', {
            get: () => mockCaseModel,  // Ensures `openCase` is correctly mocked
        });

        (DataController.getInstance as jest.Mock).mockReturnValue(mockDataController);


        mockPageController = {
            navigateTo: jest.fn(),
            unloadModal: jest.fn(),
            loadReport: jest.fn(),
        } as unknown as jest.Mocked<PageController>;
        (PageController.getInstance as jest.Mock).mockReturnValue(mockPageController);


        reportModal = new ReportModal(document);
    });

    it('should render the modal content and fill report list', async () => {
        await reportModal.render('<div>Mock Modal Content</div>');
        expect(document.getElementById(UI_Elements.modalContent)?.innerHTML).toBe('<div>Mock Modal Content</div>');
    });

    it('should open the modal', async () => {
        await reportModal.openModal();
        expect(document.getElementById(UI_Elements.modalContainer)?.style.display).toBe('flex');
    });

    it('should fill report list with generated reports', async () => {
        await reportModal['fillReportList']();

        const reportList = document.getElementById(UI_Elements.reportArchiveList);
        expect(reportList?.innerHTML).toContain('Report: report123');
    });

    it('should navigate to report page when viewReportButton is clicked', async () => {
        await reportModal.render('<div>Mock Content</div>');
    
        //simulate clicking report page view button
        const viewReportButton = document.getElementById(UI_Elements.viewReportButton);
        expect(viewReportButton).not.toBeNull();
        
        viewReportButton?.click();
    
        //expect unload modal and laod report to have been called
        expect(mockPageController.unloadModal).toHaveBeenCalled();
        expect(mockPageController.loadReport).toHaveBeenCalled();
    });
    

    it('should close modal when closeModalButton is clicked', async () => {
        const closeModalButton = document.getElementById(UI_Elements.closeModalButton);
        if (closeModalButton) {
            closeModalButton.click();
        }

        expect(document.getElementById(UI_Elements.modalContainer)?.style.display).toBe('none');
    });
});
