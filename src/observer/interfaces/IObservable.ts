module EventStorming.Observer {
  export interface IObservable {
    RegisterObserver(Observer: EventStorming.Observer.IObserver);
    RemoveObserver(Observer: EventStorming.Observer.IObserver);
    NotifyObservers(eventName: string, obj: object);
  }
}
