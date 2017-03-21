module EventStorming.Observer {
  export interface IObserver {
    eventTypes: string[],
    ReceiveNotification<T>(event: string, obj: object): void;
  }
}
