import {IObserver} from "./IObserver";

export interface IObservable {
  RegisterObserver(Observer: IObserver);
  RemoveObserver(Observer: IObserver);
  NotifyObservers(eventName: string, obj: object);
}
