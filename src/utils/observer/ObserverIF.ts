// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { Observers } from '../enums';

export interface ObserverIF {
    update(arg: Observers, data: any): void;
}
