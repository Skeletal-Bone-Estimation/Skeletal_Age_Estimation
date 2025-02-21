//compare page view tests
//started 2-12 finished: 
//still in progress, not sure if we have most current version of compare page view

import { ComparePageView } from '../../../src/views/ComparePageView';
import { PageController } from '../../../src/controllers/PageController';
import { DataController } from '../../../src/controllers/DataController';
import { ReportModel } from '../../../src/models/ReportModel';
import { CaseModel } from '../../../src/models/CaseModel';
import { Side } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/PageController');
jest.mock('../../../src/controllers/DataController');

let documentMock: Document;
let comparePageView: ComparePageView;

beforeEach(() => {
    documentMock = document.implementation.createHTMLDocument();
    documentMock.body.innerHTML = `
        <div id="content"></div>
        <button id="backBtn"></button>
        <div id="reportCaseTitleCompare"></div>
        <div id="summarizedRange"></div>
        <div id="pubicData"></div>
        <div id="auricularData"></div>
        <div id="sternalData"></div>
        <div id="molarData"></div>
    `;
    comparePageView = new ComparePageView(documentMock);
});

test('should render HTML content and initialize event listeners', () => {
    const mockContent = '<p>Test Content</p>';
    comparePageView.render(mockContent);

    expect(documentMock.body.innerHTML).toContain(mockContent);
});

test('should navigate to report page on back button click', async () => {
    const navigateMock = jest.fn();
    (PageController.getInstance as jest.Mock).mockReturnValue({ navigateTo: navigateMock });

    comparePageView.render('<p>Test</p>'); // This indirectly calls initEventListeners
    documentMock.getElementById('backBtn')!.click();

    await new Promise((r) => setTimeout(r, 0)); // Allow async operations to complete
    expect(navigateMock).toHaveBeenCalledWith(expect.anything());
});


test('should load report data into the compare page', () => {
    const reportMock = {
        getPubicSymphysis: jest.fn().mockReturnValue(10),
        getPubicSymphysisRange: jest.fn().mockReturnValue({ min: 8, max: 12 }),
        getAuricularSurface: jest.fn().mockReturnValue(15),
        getAuricularSurfaceRange: jest.fn().mockReturnValue({ min: 12, max: 18 }),
        getSternalEnd: jest.fn().mockReturnValue(20),
        getSternalEndRange: jest.fn().mockReturnValue({ min: 18, max: 22 }),
        getThirdMolar: jest.fn().mockReturnValue(2),
    } as unknown as ReportModel;

    const caseMock = { caseID: '12345' } as CaseModel;
    (DataController.getInstance as jest.Mock).mockReturnValue({ openCase: caseMock });

    comparePageView.loadReport(reportMock);

    expect(documentMock.getElementById('reportCaseTitleCompare')!.textContent).toBe('Case ID: 12345');
    expect(documentMock.getElementById('summarizedRange')!.textContent).toContain('To Be Determined');
    expect(documentMock.getElementById('pubicData')!.innerHTML).toContain('Pubic Symphysis');
    expect(documentMock.getElementById('auricularData')!.innerHTML).toContain('Auricular Surface');
    expect(documentMock.getElementById('sternalData')!.innerHTML).toContain('Sternal End');
    expect(documentMock.getElementById('molarData')!.innerHTML).toContain('18 or Older');
});
