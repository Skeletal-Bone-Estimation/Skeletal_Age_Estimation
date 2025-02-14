// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { Observers } from '../utils/enums';
import { ObservableIF } from '../utils/observer/ObservableIF';
import { ObserverIF } from '../utils/observer/ObserverIF';

export abstract class AbstractCaseModel implements ObservableIF {
    public observers: ObserverIF[] = [];

    /**
     * Attaches an observer to the case model.
     * @param observer The observer to attach.
     */
    attach(observer: ObserverIF): void {
        this.observers.push(observer);
    }

    /**
     * Detaches an observer from the case model.
     * @param observer The observer to detach.
     */
    detach(observer: ObserverIF): void {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    /**
     * Notifies observers of a change.
     * @param arg The observer type.
     * @param data The data to be processed.
     */
    notify(arg: Observers, data: any = null): void {
        this.observers.forEach((observer) => observer.update(arg, data));
    }
}
