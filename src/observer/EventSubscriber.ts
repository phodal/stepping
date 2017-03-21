export class EventSubscriber implements EventStorming.Observer.IObserver {
  eventTypes: string[];
  private myId: number = 0;
  static NextId: number = 1;

  constructor() {
    this.myId = EventSubscriber.NextId++;
  }

  public ReceiveNotification(event: string, obj: object) {
    console.log("Event Client [" + event + "], Received a message:", obj);
  }
}
