//DataEntryView.tests.ts

import { DataEntryView } from '../../../src/views/DataEntryView';
import { PageController } from '../../../src/controllers/PageController';
import { UI_Elements } from '../../../src/utils/enums';

document.body.innerHTML = `
    <div id="contentDiv"></div>
    <input id="${UI_Elements.auricularAreaL}" />
    <input id="${UI_Elements.auricularAreaR}" />
    <input id="${UI_Elements.pubicSymphysisL}" />
    <input id="${UI_Elements.pubicSymphysisR}" />
    <input id="${UI_Elements.fourthRibL}" />
    <input id="${UI_Elements.fourthRibR}" />
    <input id="${UI_Elements.thirdMolarTL}" />
    <input id="${UI_Elements.thirdMolarTR}" />
    <input id="${UI_Elements.thirdMolarBL}" />
    <input id="${UI_Elements.thirdMolarBR}" />
    <input id="${UI_Elements.notes}" />
    <input id="${UI_Elements.dataSideCaseID}" />
    <select id="${UI_Elements.dataSideSex}"></select>
    <select id="${UI_Elements.dataSideAffinity}"></select>
`;

// Mock the PageController class
jest.mock('../../../src/controllers/PageController', () => ({
    PageController: {
        getInstance: jest.fn(),
    },
}));

describe('DataEntryView', () => {
    let dataEntryView: DataEntryView;
    let pageControllerMock: jest.Mocked<PageController>;
    let documentMock: Document;
    beforeEach(() => {
        // Create a full mock of PageController with all methods and properties
        pageControllerMock = {
            createCase: jest.fn(),
            navigateTo: jest.fn(),
            loadSideBarContent: jest.fn(),
            editCase: jest.fn(),
        } as unknown as jest.Mocked<PageController>;

        // Mock the getInstance method to return the mocked instance
        (PageController.getInstance as jest.Mock).mockReturnValue(pageControllerMock);

        // Initialize the DataEntryView
        dataEntryView = new DataEntryView(document);
        
        documentMock = document.implementation.createHTMLDocument();
        const rootDiv = documentMock.createElement('div');
        rootDiv.id = 'rootDiv';
        documentMock.body.appendChild(rootDiv);

    });

    describe('render method', () => {
        it('should inject HTML content into the content div', () => {
            // Instantiate DataEntryView with the mock document
            const view = new DataEntryView(documentMock);
    
            // Define the test HTML
            const testHTML = '<p>Test Content</p>';
    
            // Render the content
            view.render(testHTML);
    
            // Assert that the HTML content has been injected into rootDiv
            const rootDiv = documentMock.getElementById('rootDiv');
            expect(rootDiv!.innerHTML).toBe(testHTML);
        });
        

        it('should add event listeners to the correct elements', () => {
            const htmlContent = '<div>Test Content</div>';
            dataEntryView.render(htmlContent);

            // Simulate input event
            const auricularAreaL = document.getElementById(UI_Elements.auricularAreaL) as HTMLInputElement;
            auricularAreaL.value = 'one';
            auricularAreaL.dispatchEvent(new Event('input'));

            // Verify that the editCase method was called with correct parameters
            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.auricularAreaL, 1);
        });
    });

    describe('helper methods', () => {
        it('should correctly parse affinity values', () => {
            expect(dataEntryView['parseAffinity']('white')).toBe(0);
            expect(dataEntryView['parseAffinity']('black')).toBe(1);
            expect(dataEntryView['parseAffinity']('unknown')).toBe(2);
            expect(dataEntryView['parseAffinity']('invalid')).toBe(-1);
        });

        it('should correctly parse sex values', () => {
            expect(dataEntryView['parseSex']('male')).toBe(0);
            expect(dataEntryView['parseSex']('female')).toBe(1);
            expect(dataEntryView['parseSex']('unknown')).toBe(2);
            expect(dataEntryView['parseSex']('invalid')).toBe(-1);
        });

        it('should correctly parse third molar values', () => {
            expect(dataEntryView['parseThirdMolar']('a')).toBe(0);
            expect(dataEntryView['parseThirdMolar']('b')).toBe(1);
            expect(dataEntryView['parseThirdMolar']('unknown')).toBe(8);
            expect(dataEntryView['parseThirdMolar']('invalid')).toBe(-1);
        });

        it('should correctly parse auricular area values', () => {
            expect(dataEntryView['parseAuricularArea']('one')).toBe(1);
            expect(dataEntryView['parseAuricularArea']('two')).toBe(2);
            expect(dataEntryView['parseAuricularArea']('unknown')).toBe(7);
            expect(dataEntryView['parseAuricularArea']('invalid')).toBe(-1);
        });

        it('should correctly parse pubic symphysis values', () => {
            expect(dataEntryView['parsePubicSymphysis']('one')).toBe(1);
            expect(dataEntryView['parsePubicSymphysis']('two')).toBe(2);
            expect(dataEntryView['parsePubicSymphysis']('unknown')).toBe(8);
            expect(dataEntryView['parsePubicSymphysis']('invalid')).toBe(-1);
        });

        it('should correctly parse fourth rib values', () => {
            expect(dataEntryView['parseFourthRib']('one')).toBe(1);
            expect(dataEntryView['parseFourthRib']('two')).toBe(2);
            expect(dataEntryView['parseFourthRib']('unknown')).toBe(8);
            expect(dataEntryView['parseFourthRib']('invalid')).toBe(-1);
        });
    });

    describe('setSidebarListeners method', () => {
        it('should add event listeners to sidebar elements', () => {
            const caseInput = document.getElementById(UI_Elements.dataSideCaseID) as HTMLInputElement;
            const sexSelector = document.getElementById(UI_Elements.dataSideSex) as HTMLSelectElement;
            const affinitySelector = document.getElementById(UI_Elements.dataSideAffinity) as HTMLSelectElement;

            caseInput.value = 'test-case';
            sexSelector.value = 'male';
            affinitySelector.value = 'white';

            caseInput.dispatchEvent(new Event('input'));
            sexSelector.dispatchEvent(new Event('input'));
            affinitySelector.dispatchEvent(new Event('input'));

            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.dataSideCaseID, 'test-case');
            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.dataSideSex, 0);
            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.dataSideAffinity, 0);
        });
    });
});
