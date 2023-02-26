import IObserver from "../interface/IObserver";
import IObserverData from "../interface/IObserverData";

class InventoryObserver {
    public observers: IObserver[];

    constructor(observers: IObserver[] = []) {
        this.observers = observers;
    }

    subscribe(observer: IObserver) {
        this.observers = [...this.observers, observer];
    }

    unsubscribe(observer: IObserver) {
        this.observers = this.observers.filter((subscriber: IObserver) => subscriber !== observer);
    }

    notifyAll(payload: IObserverData) {
        this.observers.forEach((subscriber) => subscriber.notify(payload));
    }

}

export default InventoryObserver;
