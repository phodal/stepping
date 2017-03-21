export abstract class AbstractPublisher implements EventStorming.Observer.IObservable {
  protected observers: EventStorming.Observer.IObserver[];

  constructor() {
    this.observers = [];
  }

  public abstract NotifyObservers();

  public RegisterObserver(observer: EventStorming.Observer.IObserver): void {
    this.observers.push(observer);
  }

  public RemoveObserver(observer: EventStorming.Observer.IObserver): void {
    for (let observerIndex in this.observers) {
      if (this.observers[observerIndex] === observer) {
        this.observers.splice(parseInt(observerIndex), 1);
      }
    }
  }
}
