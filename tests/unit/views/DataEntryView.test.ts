//started updating : 2/17
//finished updating : 2/20
//updated test for sidebarlisteners
//and added tests for the guide button and analyze button
// DataEntryView.test.ts

// DataEntryView.test.ts
jest.mock('../../../src/controllers/PageController');
jest.mock('../../../src/views/ReportPageView', () => {
    return {
        ReportPageView: jest.fn().mockImplementation(() => ({
            render: jest.fn(),
        })),
    };
});
jest.mock('../../../src/controllers/DataController', () => {
    return {
        DataController: {
            getInstance: jest.fn(() => ({
                getReports: jest.fn(() => [{ id: 'report1' }]), 
                createReport: jest.fn(),
            })),
        },
    };
});
jest.mock('../../../src/utils/analyzer/AnalysisContext', () => {
    return {
        AnalysisContext: {
            getInstance: jest.fn(() => ({
                analyze: jest.fn()
            }))
        }
    };
});

import { DataEntryView } from '../../../src/views/DataEntryView';
import { PageController } from '../../../src/controllers/PageController';
import { UI_Elements, Pages, SideBar, Affinity, Sex, ThirdMolar, AuricularArea, PubicSymphysis, SternalEnd } from '../../../src/utils/enums';

const mockPageControllerInstance = {
    getOpenCase: jest.fn().mockReturnValue({
        caseID: 'test123',
        sex: 0,
        populationAffinity: 1,
        auricularAreaL: 2,
        auricularAreaR: 3,
        pubicSymphysisL: 4,
        pubicSymphysisR: 5,
        fourthRibL: 6,
        fourthRibR: 7,
        thirdMolarTL: 8,
        thirdMolarTR: 1,
        thirdMolarBL: 2,
        thirdMolarBR: 3,
        notes: 'test notes',
        addReport: jest.fn()
    }),
    editCase: jest.fn(),
    navigateTo: jest.fn(),
    loadSideBarContent: jest.fn(),
};

const PageControllerModule = require('../../../src/controllers/PageController');
PageControllerModule.PageController.getInstance = jest.fn(() => mockPageControllerInstance);

describe('DataEntryView', () => {
    let dataEntryView: DataEntryView;
    let pageControllerMock: typeof mockPageControllerInstance;

    beforeEach(() => {
        // Reset modules and mocks to ensure a clean slate
        jest.resetModules();
        jest.clearAllMocks();
    
        pageControllerMock = PageControllerModule.PageController.getInstance();

        document.body.innerHTML = `
            <div id="rootDiv"></div>
            <input id="${UI_Elements.auricularAreaL}" type="text" />
            <input id="${UI_Elements.auricularAreaR}" type="text" />
            <input id="${UI_Elements.pubicSymphysisL}" type="text" />
            <input id="${UI_Elements.pubicSymphysisR}" type="text" />
            <input id="${UI_Elements.fourthRibL}" type="text" />
            <input id="${UI_Elements.fourthRibR}" type="text" />
            <input id="${UI_Elements.thirdMolarTL}" type="text" />
            <input id="${UI_Elements.thirdMolarTR}" type="text" />
            <input id="${UI_Elements.thirdMolarBL}" type="text" />
            <input id="${UI_Elements.thirdMolarBR}" type="text" />
            <input id="${UI_Elements.notes}" type="text" />
            <input id="${UI_Elements.dataSideCaseID}" type="text" />
            <select id="${UI_Elements.dataSideSex}">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <select id="${UI_Elements.dataSideAffinity}">
                <option value="white">White</option>
                <option value="black">Black</option>
            </select>
            <button id="${UI_Elements.analyzeButton}"></button>
            <button id="${UI_Elements.guideButton}"></button>
        `;

        dataEntryView = new DataEntryView(document);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('render method', () => {
        it('should inject HTML content into the rootDiv', () => {
            const testHTML = '<p>Test Content</p>';
            dataEntryView.render(testHTML);
            const rootDiv = document.getElementById('rootDiv');
            expect(rootDiv!.innerHTML).toBe(testHTML);
        });

        it('should add event listeners to the correct elements', () => {
            const htmlContent = `
                <input id="${UI_Elements.auricularAreaL}" type="text" />
            `;
            dataEntryView.render(htmlContent);
            const auricularAreaL = document.getElementById(UI_Elements.auricularAreaL) as HTMLInputElement;
            auricularAreaL.value = 'one';
            auricularAreaL.dispatchEvent(new Event('input'));
            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.auricularAreaL, 1);
        });
    });

    describe('helper methods', () => {
        it('should correctly parse affinity values', () => {
            expect(dataEntryView['parseAffinity']('white')).toBe(0);
            expect(dataEntryView['parseAffinity']('black')).toBe(1);
            expect(dataEntryView['parseAffinity']('unknown')).toBe(2);
            expect(dataEntryView['parseAffinity']('error')).toBe(-1);
        });

        it('should correctly parse sex values', () => {
            expect(dataEntryView['parseSex']('male')).toBe(0);
            expect(dataEntryView['parseSex']('female')).toBe(1);
            expect(dataEntryView['parseSex']('unknown')).toBe(2);
            expect(dataEntryView['parseSex']('error')).toBe(-1);
        });
        
        it('should correctly parse third molar values', () => {
            expect(dataEntryView['parseThirdMolar']('A')).toBe(0);
            expect(dataEntryView['parseThirdMolar']('B')).toBe(1);
            expect(dataEntryView['parseThirdMolar']('C')).toBe(2);
            expect(dataEntryView['parseThirdMolar']('D')).toBe(3);
            expect(dataEntryView['parseThirdMolar']('E')).toBe(4);
            expect(dataEntryView['parseThirdMolar']('F')).toBe(5);
            expect(dataEntryView['parseThirdMolar']('G')).toBe(6);
            expect(dataEntryView['parseThirdMolar']('H')).toBe(7);
            expect(dataEntryView['parseThirdMolar']('Unknown')).toBe(8);
            expect(dataEntryView['parseThirdMolar']('Error')).toBe(-1);
        });

        it('should correctly parse auricular area values', () => {
            expect(dataEntryView['parseAuricularArea']('one')).toBe(1);
            expect(dataEntryView['parseAuricularArea']('two')).toBe(2);
            expect(dataEntryView['parseAuricularArea']('three')).toBe(3);
            expect(dataEntryView['parseAuricularArea']('four')).toBe(4);
            expect(dataEntryView['parseAuricularArea']('five')).toBe(5);
            expect(dataEntryView['parseAuricularArea']('six')).toBe(6);
            expect(dataEntryView['parseAuricularArea']('unknown')).toBe(7);
            expect(dataEntryView['parseAuricularArea']('error')).toBe(-1);
        });

        it('should correctly parse pubic symphysis values', () => {
            expect(dataEntryView['parsePubicSymphysis']('one')).toBe(1);
            expect(dataEntryView['parsePubicSymphysis']('two')).toBe(2);
            expect(dataEntryView['parsePubicSymphysis']('three')).toBe(3);
            expect(dataEntryView['parsePubicSymphysis']('four')).toBe(4);
            expect(dataEntryView['parsePubicSymphysis']('five')).toBe(5);
            expect(dataEntryView['parsePubicSymphysis']('six')).toBe(6);
            expect(dataEntryView['parsePubicSymphysis']('seven')).toBe(7);
            expect(dataEntryView['parsePubicSymphysis']('unknown')).toBe(8);
            expect(dataEntryView['parsePubicSymphysis']('error')).toBe(-1);
        });

        it('should correctly parse fourth rib values', () => {
            expect(dataEntryView['parseFourthRib']('one')).toBe(1);
            expect(dataEntryView['parseFourthRib']('two')).toBe(2);
            expect(dataEntryView['parseFourthRib']('three')).toBe(3);
            expect(dataEntryView['parseFourthRib']('four')).toBe(4);
            expect(dataEntryView['parseFourthRib']('five')).toBe(5);
            expect(dataEntryView['parseFourthRib']('six')).toBe(6);
            expect(dataEntryView['parseFourthRib']('seven')).toBe(7);
            expect(dataEntryView['parseFourthRib']('unknown')).toBe(8);
            expect(dataEntryView['parseFourthRib']('error')).toBe(-1);
        });
    });

    describe('Sidebar event listeners (via render autoLoadCaseData)', () => {
        it('should update case data when sidebar inputs change', () => {
            // Call render so that setSidebarListeners and autoLoadCaseData are attached.
            dataEntryView.render('<div></div>');
        
            const caseInput = document.getElementById(UI_Elements.dataSideCaseID) as HTMLInputElement;
            const sexSelector = document.getElementById(UI_Elements.dataSideSex) as HTMLSelectElement;
            const affinitySelector = document.getElementById(UI_Elements.dataSideAffinity) as HTMLSelectElement;
        
            caseInput.value = 'caseXYZ';
            caseInput.dispatchEvent(new Event('input'));
        
            sexSelector.value = 'female';
            sexSelector.dispatchEvent(new Event('input'));
        
            affinitySelector.value = 'black';
            affinitySelector.dispatchEvent(new Event('input'));
        
            expect(pageControllerMock.editCase).toHaveBeenCalledTimes(3);
            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.dataSideCaseID, 'caseXYZ');
            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.dataSideSex, 1);
            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.dataSideAffinity, 1);
        });
    });
    
    describe('Button Clicks', () => {
        it('should navigate to Report page when analyze button is clicked', () => {
            // For analyze button, the click triggers analysis then navigation.
            // Our dummy case (returned by getOpenCase) now has an addReport method.
            dataEntryView.render('<div></div>'); // Attach event listeners.
        
            const analyzeButton = document.getElementById(UI_Elements.analyzeButton) as HTMLButtonElement;
            analyzeButton.click();
            expect(mockPageControllerInstance.navigateTo).toHaveBeenCalledWith(Pages.Report, SideBar.createBar);
        });
        
        it('should open guidelines PDF when guide button is clicked', () => {
            global.open = jest.fn();
            dataEntryView.render('<div></div>');
            const guideButton = document.getElementById(UI_Elements.guideButton) as HTMLButtonElement;
            guideButton.click();
            expect(global.open).toHaveBeenCalledWith(
                './assets/guidelines/Scoring Guidelines for Skeletal Bone Age Estimation.pdf',
                '_blank'
            );
        });
    });
});
