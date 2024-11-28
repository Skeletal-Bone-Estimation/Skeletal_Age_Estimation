import { DataEntryView } from '../../../src/views/DataEntryView';
import { PageController } from '../../../src/controllers/PageController';
import { UI_Elements } from '../../../src/utils/enums';
import { CaseModel } from '../../../src/models/CaseModel';

jest.mock('../../../src/controllers/PageController', () => ({
    PageController: {
        getInstance: jest.fn(),
    },
}));

describe('DataEntryView', () => {
    let dataEntryView: DataEntryView;
    let pageControllerMock: jest.Mocked<PageController>;
    let mockCaseModel: CaseModel;

    beforeEach(() => {
        // Mock the DOM structure
        document.body.innerHTML = `
            <div id="rootDiv"></div>
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
            <select id="${UI_Elements.dataSideSex}">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <select id="${UI_Elements.dataSideAffinity}">
                <option value="white">White</option>
                <option value="black">Black</option>
            </select>
        `;

        // Define the mock CaseModel
        mockCaseModel = {
            caseID: 'test-case-id',
            sex: 0,
            populationAffinity: 1,
            auricularAreaL: 1,
            auricularAreaR: 2,
            pubicSymphysisL: 3,
            pubicSymphysisR: 4,
            fourthRibL: 5,
            fourthRibR: 6,
            thirdMolarTL: 7,
            thirdMolarTR: 8,
            thirdMolarBL: 9,
            thirdMolarBR: 10,
            notes: 'Test notes',
        } as unknown as CaseModel;
        
        // Mock PageController methods
        pageControllerMock = {
            createCase: jest.fn(),
            navigateTo: jest.fn(),
            loadSideBarContent: jest.fn(),
            editCase: jest.fn(),
            getOpenCase: jest.fn().mockReturnValue(mockCaseModel),
        } as unknown as jest.Mocked<PageController>;

        (PageController.getInstance as jest.Mock).mockReturnValue(pageControllerMock);

        // Initialize DataEntryView
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
            expect(rootDiv).not.toBeNull();
            expect(rootDiv!.innerHTML).toBe(testHTML);
        });

        it('should add event listeners to the correct elements', () => {
            const htmlContent = `<input id="${UI_Elements.auricularAreaL}" type="text" />`;
            dataEntryView.render(htmlContent);

            const auricularAreaL = document.getElementById(UI_Elements.auricularAreaL) as HTMLInputElement;
            auricularAreaL.value = 'one';
            auricularAreaL.dispatchEvent(new Event('input'));

            expect(pageControllerMock.editCase).toHaveBeenCalledWith(UI_Elements.auricularAreaL, 1);
        });
    });

    describe('autoLoadCaseData method', () => {
        it('should populate inputs with case data', () => {
            dataEntryView.autoLoadCaseData();

            expect((document.getElementById(UI_Elements.dataSideCaseID) as HTMLInputElement).value).toBe(
                mockCaseModel.caseID,
            );
            expect((document.getElementById(UI_Elements.notes) as HTMLInputElement).value).toBe(mockCaseModel.notes);
            expect((document.getElementById(UI_Elements.dataSideSex) as HTMLSelectElement).value).toBe('male');
            expect((document.getElementById(UI_Elements.dataSideAffinity) as HTMLSelectElement).value).toBe('black');
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
    describe('sidebar event listeners', () => {
        it('should add event listeners to sidebar elements', () => {
            // Arrange: Mock sidebar elements
            const caseInput = document.getElementById(UI_Elements.dataSideCaseID) as HTMLInputElement;
            const sexSelector = document.getElementById(UI_Elements.dataSideSex) as HTMLSelectElement;
            const affinitySelector = document.getElementById(UI_Elements.dataSideAffinity) as HTMLSelectElement;
    
            // Spy on PageController's editCase method
            const editCaseSpy = jest.spyOn(pageControllerMock, 'editCase');
    
            // Act: Render the view and trigger the input events
            dataEntryView.render('<p>Test Content</p>');
    
            caseInput.value = 'New Case ID';
            caseInput.dispatchEvent(new Event('input'));
    
            sexSelector.value = 'female';
            sexSelector.dispatchEvent(new Event('input'));
    
            affinitySelector.value = 'white';
            affinitySelector.dispatchEvent(new Event('input'));
    
            // Assert: Verify that event listeners trigger the expected calls
            expect(editCaseSpy).toHaveBeenCalledWith(UI_Elements.dataSideCaseID, 'New Case ID');
            expect(editCaseSpy).toHaveBeenCalledWith(UI_Elements.dataSideSex, 1); // 1 = female
            expect(editCaseSpy).toHaveBeenCalledWith(UI_Elements.dataSideAffinity, 0); // 0 = white
        });
    });
});
