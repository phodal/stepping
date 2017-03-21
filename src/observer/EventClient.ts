export class EventClient implements EventStorming.Observer.IObserver {
  private myId: number = 0;
  static NextId: number = 1;

  constructor() {
    this.myId = EventClient.NextId++;
  }

  public ReceiveNotification(event: string) {
    console.log("Event Client [" + this.myId + "], Received a message:", event);
  }
}
