import {IDomainEvent} from "./IDomainEvent";
export class EventOperationEvent implements IDomainEvent {
  private _eventId: any;
  private _occurredOnValue: Date;

  constructor(eventId) {
    this._eventId = eventId;
    this._occurredOnValue = new Date();
  }

  get occurredOnValue(): Date {
    return this._occurredOnValue;
  }

  set occurredOnValue(value: Date) {
    this._occurredOnValue = value;
  }

  get eventId(): any {
    return this._eventId;
  }

  set eventId(value: any) {
    this._eventId = value;
  }

  occurredOn() {
    return this._occurredOnValue;
  }
}
