// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { Affinity, Sex } from '../utils/enums';
import { AbstractCaseModel } from './AbstractCaseModel';

//TODO: extend AbstractCaseModel and implement the required methods
export class NullCaseModel extends AbstractCaseModel {
    constructor(_caseID: string, _populationAffinity: Affinity, _sex: Sex) {
        super(_caseID, _populationAffinity, _sex, '');
    }
}
