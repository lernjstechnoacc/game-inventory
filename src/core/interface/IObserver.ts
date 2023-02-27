import IObserverData from "./IObserverData";

interface IObserver {
    onModifications(data: IObserverData): void;
}

export default IObserver;