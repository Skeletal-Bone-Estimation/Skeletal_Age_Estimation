// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { Observers } from '../enums';

export interface ObserverIF {
    /**
     * Update method to be called when the observer is notified.
     * @param arg The observer type.
     * @param data The data to be processed.
     */
    update(arg: Observers, data: any): void;
}
