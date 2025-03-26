//AutosaveObserver.test.ts
import { AutosaveObserver } from '../../../../src/utils/observer/AutosaveObserver';
import { DataController } from '../../../../src/controllers/DataController';
import { XML_Controller } from '../../../../src/controllers/XML_Controller';
import { AbstractCaseModel } from '../../../../src/models/AbstractCaseModel';
import { CaseModel } from '../../../../src/models/CaseModel';

jest.mock('../../../../src/controllers/DataController');
jest.mock('../../../../src/controllers/XML_Controller');

describe('AutosaveObserver', () => {
    let autosaveObserver: AutosaveObserver;

    beforeEach(() => {
        autosaveObserver = new AutosaveObserver();

        // Mock the CaseModel
        const mockOpenCase: AbstractCaseModel = {
            caseID: 'testCase123',
        } as unknown as CaseModel;

        // Mock DataController.getInstance().openCase
        (DataController.getInstance as jest.Mock).mockReturnValue({
            openCase: mockOpenCase,
        });

        // Mock XML_Controller.getInstance().saveAsFile
        (XML_Controller.getInstance as jest.Mock).mockReturnValue({
            saveAsFile: jest.fn(),
        });
    });

    it('should call saveAsFile with the correct parameters when autosave is triggered', () => {
        autosaveObserver.update();

        const mockOpenCase = (DataController.getInstance() as any).openCase;
        const saveAsFileMock = XML_Controller.getInstance().saveAsFile;

        expect(saveAsFileMock).toHaveBeenCalledTimes(1);
        expect(saveAsFileMock).toHaveBeenCalledWith(
            mockOpenCase,
            'save_data/testCase123.xml',
        );
    });
});
