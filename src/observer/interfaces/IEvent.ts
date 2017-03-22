module EventStorming.Event {
  export interface IEvent {
    name: string;
    handleEvent();
  }
}
