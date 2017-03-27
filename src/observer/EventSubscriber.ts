import {IEvent} from './interfaces/IEvent';
import {IObserver} from './interfaces/IObserver';

export class EventSubscriber implements IObserver {
  private _events: object[] = [];

  public ReceiveNotification(eventName: string, obj: object) {
    let hasRegisterEvent = this._events && this._events.length > 0;
    if (!hasRegisterEvent) {
      return;
    }

    for (let index in this._events) {
      if (this._events[index]['name'] === eventName && this._events[index]['action']) {
        this._events[index]['action'](obj);
      }
    }
  }

  public registerEvent(event: IEvent) {
    this._events.push(event);
  }

  get events(): Object[] {
    return this._events;
  }

  set events(value: Object[]) {
    this._events = value;
  }

}
