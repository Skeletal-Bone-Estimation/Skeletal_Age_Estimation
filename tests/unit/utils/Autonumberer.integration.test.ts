import { Autonumberer } from '../../src/classes/Autonumberer';
import { DataController } from '../../src/controllers/DataController';

jest.mock('../../src/controllers/DataController', () => ({
    DataController: {
        getInstance: jest.fn().mockReturnValue({
            getReports: jest.fn().mockReturnValue({
                report1: { id: 'A1' },
                report2: { id: 'B1' },
            }),
        }),
    },
}));

describe('Integration: Autonumberer', () => {
    let autonumberer: Autonumberer;
    let dataController: any;

    beforeEach(() => {
        autonumberer = Autonumberer.getInstance();
        dataController = DataController.getInstance();
    });

    it('should generate the next available report ID', () => {
        const nextId = autonumberer.generateNext();
        expect(nextId).toBe('C1');  // As 'A1' and 'B1' are taken, 'C1' should be the next available ID
    });

    it('should return null when all possible report IDs are taken', () => {
        // Mock getReports to simulate all IDs being taken (this is for edge case testing)
        dataController.getReports.mockReturnValue(
            Object.fromEntries(
                Array.from({ length: 78 }, (_, i) => {
                    const id = autonumberer.numToAlphabet(i + 1);
                    return [id, { id }];
                })
            )
        );

        const result = autonumberer.generateNext();
        expect(result).toBeNull();  // Should return null since all IDs are taken
    });

    it('should correctly check if a value is already taken', () => {
        const takenValue = 'A1';
        const availableValue = 'C1';

        expect(autonumberer.isValueTaken(takenValue)).toBe(true);
        expect(autonumberer.isValueTaken(availableValue)).toBe(false);
    });

    it('should update the existing values when updateExistingValues is called', () => {
        const newReports = {
            report3: { id: 'D1' },
            report4: { id: 'E1' },
        };

        // Simulate the reports being added
        dataController.getReports.mockReturnValue(newReports);

        autonumberer.updateExistingValues();
        const updatedValues = autonumberer['existingValues'];

        expect(updatedValues).toContain('D1');
        expect(updatedValues).toContain('E1');
    });

    it('should return a sequence of IDs correctly (A1, B1, C1...)', () => {
        const firstGeneratedId = autonumberer.generateNext();
        const secondGeneratedId = autonumberer.generateNext();

        expect(firstGeneratedId).toBe('C1');
        expect(secondGeneratedId).toBe('D1');
    });
});
