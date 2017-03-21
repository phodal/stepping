export class EventSubscriber implements EventStorming.Observer.IObserver {
  eventTypes: string[] = [];

  constructor() {

  }

  public ReceiveNotification(eventName: string, obj: object) {
    let hasRegisterEvent = this.eventTypes && this.eventTypes.length > 0;
    if (!hasRegisterEvent) {
      return;
    }

    for(let index in this.eventTypes) {
      if(this.eventTypes[index] === eventName) {
        console.log("Event Client [" + eventName + "], Received a message:", obj);
      }
    }
  }

  public registerEvent(eventName) {
    this.eventTypes.push(eventName);
  }
}
