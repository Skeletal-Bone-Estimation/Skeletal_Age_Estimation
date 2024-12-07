// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

import { ObservableIF } from '../utils/observer/ObservableIF';
import { ObserverIF } from '../utils/observer/ObserverIF';

export abstract class AbstractCaseModel implements ObservableIF {
    protected observers: ObserverIF[] = [];

    attach(observer: ObserverIF): void {
        this.observers.push(observer);
    }

    detach(observer: ObserverIF): void {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    // call this function to trigger autosave observer
    //TODO: add switch with number based enum to call specific observer if more added
    notify(): void {
        this.observers.forEach((observer) => observer.update());
    }
}
