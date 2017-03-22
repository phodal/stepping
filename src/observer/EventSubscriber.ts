export class EventSubscriber implements EventStorming.Observer.IObserver {
  private _events: object[] = [];

  constructor() {

  }

  public ReceiveNotification(eventName: string, obj: object) {
    let hasRegisterEvent = this._events && this._events.length > 0;
    if (!hasRegisterEvent) {
      return;
    }

    for(let index in this._events) {
      if(this._events[index]["name"] === eventName && this._events[index]["action"]) {
        this._events[index]["action"]();
      }
    }
  }

  public registerEvent(event: EventStorming.Event.IEvent) {
    this._events.push(event);
  }

  get events(): Object[] {
    return this._events;
  }

  set events(value: Object[]) {
    this._events = value;
  }

}
