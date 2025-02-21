// AutosaveObserver.test.ts

//reran feb 16, still passes as expected 

import { AutosaveObserver } from '../../../../src/utils/observer/AutosaveObserver';
import { DataController } from '../../../../src/controllers/DataController';
import { XML_Controller } from '../../../../src/controllers/XML_Controller';
import { Observers } from '../../../../src/utils/enums';
import { CaseModel } from '../../../../src/models/CaseModel';

jest.mock('../../../../src/controllers/DataController');
jest.mock('../../../../src/controllers/XML_Controller');

describe('AutosaveObserver', () => {
  let autosaveObserver: AutosaveObserver;
  let mockCase: CaseModel;
  let mockDataController: any;
  let mockXMLController: any;

  beforeEach(() => {
    autosaveObserver = new AutosaveObserver();

    // Create a dummy case with a known caseID.
    mockCase = { caseID: 'dummy123' } as CaseModel;

    // Mock DataController.getInstance() to return an object with openCase equal to our dummy case.
    mockDataController = { openCase: mockCase };
    (DataController.getInstance as jest.Mock).mockReturnValue(mockDataController);

    // Mock XML_Controller.getInstance() to return an object with a jest.fn() for saveAsFile.
    mockXMLController = { saveAsFile: jest.fn() };
    (XML_Controller.getInstance as jest.Mock).mockReturnValue(mockXMLController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call saveAsFile with the correct parameters when autosave is triggered', () => {
    autosaveObserver.update(Observers.autosave);
    expect(mockXMLController.saveAsFile).toHaveBeenCalledWith(
      mockCase,
      'save_data/dummy123.xml'
    );
  });
});
