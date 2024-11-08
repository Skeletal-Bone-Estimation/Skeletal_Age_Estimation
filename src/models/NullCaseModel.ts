import { Affinity, CaseModel, Sex, ThirdMolar } from './CaseModel';

export class NullCaseModel extends CaseModel {
    constructor() {
        super(
            'NullCase',
            Affinity.Unknown,
            Sex.Unknown,
            ThirdMolar.Unknown,
            {},
            {},
            {},
            {},
        );
    }
}
