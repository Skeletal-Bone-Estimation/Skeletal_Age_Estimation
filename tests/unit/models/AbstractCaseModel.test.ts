import { AbstractCaseModel } from '../../../src/models/AbstractCaseModel';
import { ObserverIF } from '../../../src/utils/observer/ObserverIF';
import { Observers } from '../../../src/utils/enums'; // Import Observers enum

// Mock observer implementation
class MockObserver implements ObserverIF {
    update = jest.fn();
}

class TestCaseModel extends AbstractCaseModel {}

describe('AbstractCaseModel', () => {
    let model: TestCaseModel;
    let observer1: MockObserver;
    let observer2: MockObserver;

    beforeEach(() => {
        model = new TestCaseModel();
        observer1 = new MockObserver();
        observer2 = new MockObserver();
    });

    test('should attach observers correctly', () => {
        model.attach(observer1);
        model.attach(observer2);

        expect(model['observers']).toContain(observer1);
        expect(model['observers']).toContain(observer2);
    });

    test('should detach observers correctly', () => {
        model.attach(observer1);
        model.attach(observer2);

        model.detach(observer1);

        expect(model['observers']).not.toContain(observer1);
        expect(model['observers']).toContain(observer2);
    });

    test('should notify all attached observers', () => {
        model.attach(observer1);
        model.attach(observer2);

        // Now pass a valid enum value from Observers
        model.notify(Observers.autosave);

        expect(observer1.update).toHaveBeenCalledTimes(1);
        expect(observer2.update).toHaveBeenCalledTimes(1);
    });

    test('should not notify detached observers', () => {
        model.attach(observer1);
        model.attach(observer2);

        model.detach(observer1);

        // Notify only observer2 with a valid enum value from Observers
        model.notify(Observers.setMostRecentReport);

        expect(observer1.update).not.toHaveBeenCalled();
        expect(observer2.update).toHaveBeenCalledTimes(1);
    });
});
