export class EventSubscriber implements EventStorming.Observer.IObserver {
  events: string[] = [];

  constructor() {

  }

  public ReceiveNotification(eventName: string, obj: object) {
    let hasRegisterEvent = this.events && this.events.length > 0;
    if (!hasRegisterEvent) {
      return;
    }

    for(let index in this.events) {
      if(this.events[index] === eventName) {
        console.log("Event Client [" + eventName + "], Received a message:", obj);
      }
    }
  }

  public registerEvent(event: EventStorming.Event.IEvent) {
    this.events.push(event.name);
  }
}
