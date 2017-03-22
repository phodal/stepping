export class BaseEvent implements EventStorming.Event.IEvent {

  constructor(name: string) {
    this.name = name;
  }

  name: string;

  handleEvent() {

  }
}
