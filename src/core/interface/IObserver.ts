import IObserverData from "./IObserverData";

interface IObserver {
    notify(payload: IObserverData): void;
}

export default IObserver;