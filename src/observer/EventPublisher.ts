import {AbstractPublisher} from "./AbstractPublisher";

export class EventPublisher extends AbstractPublisher {
  constructor() {
    super();
  }

  public NotifyObservers(eventName: string, obj: object) {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].ReceiveNotification(eventName, obj);
    }
  }
}
