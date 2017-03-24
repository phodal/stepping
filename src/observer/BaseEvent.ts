import {IEvent} from "./interfaces/IEvent";

export class BaseEvent implements IEvent {
  name: string;
  action: object;

  constructor(name: string, action: object) {
    this.name = name;
    this.setAction(action);
  }

  getAction(): object {
    return this.action;
  }

  setAction(value: object) {
    this.action = value;
  }
}
