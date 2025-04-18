import { AutosaveObserver } from '../../src/classes/observers/AutosaveObserver';
import { DataController } from '../../src/controllers/DataController';
import { XML_Controller } from '../../src/controllers/XML_Controller';
import { CaseModel } from '../../src/models/CaseModel';
import { Observers } from '../../src/enums';

jest.mock('../../src/controllers/DataController', () => ({
    DataController: {
        getInstance: jest.fn().mockReturnValue({
            loadedCases: [
                { caseID: '123', savePath: '/path/to/save' }, // Mock case
            ],
            openCaseID: '123',
            findCaseIndex: jest.fn().mockReturnValue(0), // Return first case
        }),
    },
}));

jest.mock('../../src/controllers/XML_Controller', () => ({
    XML_Controller: {
        getInstance: jest.fn().mockReturnValue({
            saveAsFile: jest.fn(),
        }),
    },
}));

describe('Integration: AutosaveObserver', () => {
    let observer: AutosaveObserver;

    beforeEach(() => {
        observer = new AutosaveObserver();
    });

    it('should call autosave when the correct observer type is passed to update()', () => {
        const autosaveSpy = jest.spyOn(observer as any, 'autosave'); // Spying on the private autosave method
        const data = null; // Pass any data if necessary

        observer.update(Observers.autosave, data);

        expect(autosaveSpy).toHaveBeenCalled();
    });

    it('should not call autosave when the incorrect observer type is passed to update()', () => {
        const autosaveSpy = jest.spyOn(observer as any, 'autosave'); // Spying on the private autosave method

        observer.update(Observers.someOtherObserver, null); // Passing a non-autosave observer type

        expect(autosaveSpy).not.toHaveBeenCalled();
    });

    it('should save case data correctly when autosave is triggered', () => {
        const dcInstance = DataController.getInstance();
        const xmlController = XML_Controller.getInstance();
        const saveSpy = jest.spyOn(xmlController, 'saveAsFile');
        const openCase = dcInstance.loadedCases[dcInstance.findCaseIndex(dcInstance.openCaseID)];

        observer.update(Observers.autosave);

        expect(saveSpy).toHaveBeenCalledWith(
            openCase, // Case model instance
            openCase.savePath, // Save path
            openCase.caseID // Filename
        );
    });
});
