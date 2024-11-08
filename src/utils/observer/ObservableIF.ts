import { ObserverIF } from './ObserverIF';

export interface ObservableIF {
    attach(observer: ObserverIF): void;
    detach(observer: ObserverIF): void;
    notify(): void;
}
