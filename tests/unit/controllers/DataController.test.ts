import { DataController } from '../../../src/controllers/DataController';
import { CaseModel } from '../../../src/models/CaseModel';
import { NullCaseModel } from '../../../src/models/NullCaseModel';
import { XML_Controller } from '../../../src/controllers/XML_Controller';
import {
    Sex,
    Affinity,
    ThirdMolar,
    CaseElement,
    PubicSymphysis,
    SternalEnd,
    AuricularArea,
} from '../../../src/utils/enums';

jest.mock('../../../src/controllers/XML_Controller');

describe('DataController', () => {
    let dataController: DataController;
    let mockCase: CaseModel;
    let xmlControllerMock: jest.Mocked<XML_Controller>;

    beforeEach(() => {
        // Reset singleton and initialize DataController
        (DataController as any).instance = null;
        dataController = DataController.getInstance();

        // Mock CaseModel
        mockCase = new CaseModel(
            'test-case',
            Affinity.White,
            Sex.Male,
            ThirdMolar.A,
            ThirdMolar.B,
            ThirdMolar.C,
            ThirdMolar.D,
            PubicSymphysis.One,
            PubicSymphysis.Two,
            AuricularArea.One,
            AuricularArea.Two,
            SternalEnd.One,
            SternalEnd.Two,
            'Test notes',
            {},
        );

        // Mock XML_Controller with currentDoc and necessary methods
        const mockDocument = new DOMParser().parseFromString(
            '<mockXML><_caseID>test-case</_caseID></mockXML>',
            'application/xml',
        );

        xmlControllerMock = {
            loadFile: jest.fn((_, callback) => {
                console.log('Mock loadFile called'); // Debugging
                callback();
            }),
            parseSingleFile: jest.fn(() => {
                console.log('Mock parseSingleFile called'); // Debugging
                return mockCase;
            }),
            saveAsFile: jest.fn(),
            getCurrentDoc: jest.fn(() => {
                console.log('Mock getCurrentDoc called'); // Debugging
                return mockDocument;
            }),
        } as unknown as jest.Mocked<XML_Controller>;

        // Mock XML_Controller.getInstance to return the mocked controller
        (XML_Controller.getInstance as jest.Mock).mockReturnValue(xmlControllerMock);
    });

    it('should return the same instance for getInstance', () => {
        const secondInstance = DataController.getInstance();
        expect(secondInstance).toBe(dataController);
    });

    it('should initialize with empty loaded cases and NullCaseModel', () => {
        expect(dataController.loadedCases).toEqual([]);
        expect(dataController.openCase).toBeInstanceOf(NullCaseModel);
    });

    describe('addCase', () => {
        it('should add a new case to the loaded cases', () => {
            dataController.addCase(mockCase);
            expect(dataController.loadedCases).toContain(mockCase);
        });
    });

    describe('deleteCase', () => {
        it('should remove a case from the loaded cases', () => {
            dataController.addCase(mockCase);
            dataController.deleteCase(mockCase);
            expect(dataController.loadedCases).not.toContain(mockCase);
        });
    });

    describe('loadCaseFromFile', () => {
        it('should load a case from a file and set it as openCase', () => {
            // Mock file input
            const mockFile = new Blob(['<mockXML></mockXML>'], { type: 'text/xml' });
            const mockEvent = { target: { files: [mockFile] } } as unknown as Event;

            // Execute the method
            dataController.loadCaseFromFile(mockEvent);

            // Assertions
            expect(dataController.openCase).toBeInstanceOf(CaseModel); // Check instance type
            expect(dataController.openCase).toEqual(mockCase);        // Check content equality
            expect(dataController.loadedCases).toContain(mockCase);  // Ensure added to loaded cases
        });
    });

    describe('editCase', () => {
        it('should edit an attribute of the open case', () => {
            (dataController as any)._openCase = mockCase; // Directly set private property

            dataController.editCase(CaseElement.notes, 'Updated notes');

            expect((dataController.openCase as CaseModel).notes).toBe('Updated notes');
            expect(xmlControllerMock.saveAsFile).toHaveBeenCalled(); // Ensure saveAsFile is called
        });

        it('should not edit if open case is not a CaseModel', () => {
            (dataController as any)._openCase = new NullCaseModel();

            expect(() =>
                dataController.editCase(CaseElement.notes, 'Updated notes'),
            ).not.toThrow();
        });
    });

    describe('createCase', () => {
        it('should create a new case and set it as openCase', () => {
            dataController.createCase('new-case', Sex.Female, Affinity.Black);

            expect(dataController.openCase).toBeInstanceOf(CaseModel);
            expect((dataController.openCase as CaseModel).caseID).toBe('new-case');
            expect((dataController.openCase as CaseModel).sex).toBe(Sex.Female);
            expect((dataController.openCase as CaseModel).populationAffinity).toBe(
                Affinity.Black,
            );
        });
    });
});
