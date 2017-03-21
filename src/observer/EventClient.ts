export class EventClient implements EventStorming.Observer.IObserver {
  private myId: number = 0;
  static NextId: number = 1;

  constructor() {
    this.myId = EventClient.NextId++;
  }

  public ReceiveNotification(event: string, obj: object) {
    console.log("Event Client [" + event + "], Received a message:", obj);
  }
}
