//NullCaseModel.test.ts
import { NullCaseModel } from '../../../src/models/NullCaseModel';
import { AbstractCaseModel } from '../../../src/models/AbstractCaseModel';
import { BuildDirector } from '../../../src/utils/builder/BuildDirector';

describe('NullCaseModel', () => {
    it('should instantiate without errors', () => {
        const nullCaseModel = new BuildDirector().makeNullCase();
        expect(nullCaseModel).toBeInstanceOf(NullCaseModel);
    });

    it('should inherit from AbstractCaseModel', () => {
        const nullCaseModel = new BuildDirector().makeNullCase();
        expect(nullCaseModel).toBeInstanceOf(AbstractCaseModel);
    });
});
