import IObserver from "../interface/IObserver";
import IObserverData from "../interface/IObserverData";

class InventoryObserver {
  public observers: IObserver[];

  constructor (observers: IObserver[] = []) {
    this.observers = observers;
  }

  public subscribe(observer: IObserver) {
    this.observers = [...this.observers, observer];
  }

  public unsubscribe(observer: IObserver) {
    this.observers = this.observers.filter((subscriber: IObserver) => subscriber !== observer);
  }

  public notifyAll(data: IObserverData) {
    this.observers.forEach((subscriber) => subscriber.onModifications(data));
  }

}

export default InventoryObserver;
