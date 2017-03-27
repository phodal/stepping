import {IObservable} from "./interfaces/IObservable";
import {IObserver} from "./interfaces/IObserver";

export abstract class AbstractPublisher implements IObservable {
  protected observers: IObserver[];

  constructor() {
    this.observers = [];
  }

  public abstract NotifyObservers(eventName: string, obj: object);

  public RegisterObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  public RemoveObserver(observer: IObserver): void {
    for (let observerIndex in this.observers) {
      if (this.observers[observerIndex] === observer) {
        this.observers.splice(parseInt(observerIndex, 10), 1);
      }
    }
  }
}
