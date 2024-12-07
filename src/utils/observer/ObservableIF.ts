// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { ObserverIF } from './ObserverIF';

export interface ObservableIF {
    attach(observer: ObserverIF): void;
    detach(observer: ObserverIF): void;
    notify(): void;
}
