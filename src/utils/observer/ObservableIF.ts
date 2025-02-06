// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { Observers } from '../enums';
import { ObserverIF } from './ObserverIF';

export interface ObservableIF {
    attach(observer: ObserverIF): void;
    detach(observer: ObserverIF): void;
    notify(arg: Observers, data: any): void;
}
