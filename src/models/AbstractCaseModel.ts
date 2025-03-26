// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { Affinity, Observers, Sex } from '../utils/enums';
import { ObservableIF } from '../utils/observer/ObservableIF';
import { ObserverIF } from '../utils/observer/ObserverIF';

export abstract class AbstractCaseModel implements ObservableIF {
    protected observers: ObserverIF[] = [];
    protected _caseID: string;
    protected _populationAffinity: Affinity;
    protected _sex: Sex;
    protected _savePath: string;

    constructor(
        caseID: string,
        affinity: Affinity,
        sex: Sex,
        savePath: string,
    ) {
        this._caseID = caseID;
        this._populationAffinity = affinity;
        this._sex = sex;
        this._savePath = savePath;
    }

    public get caseID(): string {
        return this._caseID;
    }

    public set savePath(path: string) {
        this._savePath = path;
    }

    public get savePath(): string {
        return this._savePath;
    }

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
