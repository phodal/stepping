export interface IObserver {
  ReceiveNotification<T>(event: string, obj: object): void;
}
