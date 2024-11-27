//NullCaseModel.test.ts
import { NullCaseModel } from '../../../src/models/NullCaseModel';
import { AbstractCaseModel } from '../../../src/models/AbstractCaseModel';

describe('NullCaseModel', () => {
    it('should instantiate without errors', () => {
        const nullCaseModel = new NullCaseModel();
        expect(nullCaseModel).toBeInstanceOf(NullCaseModel);
    });

    it('should inherit from AbstractCaseModel', () => {
        const nullCaseModel = new NullCaseModel();
        expect(nullCaseModel).toBeInstanceOf(AbstractCaseModel);
    });
});
