import {EventEntity} from "../entity/EventEntity";
import {EventPublisher} from "../observer/EventPublisher";
import {EventSubscriber} from "../observer/EventSubscriber";
import {BaseEvent} from "../observer/BaseEvent";

export class EventBusiness {
  eventEntities: EventEntity[];
  private eventPublisher: EventPublisher;

  constructor(subscriber) {
    this.eventPublisher = new EventPublisher();
    this.eventPublisher.RegisterObserver(subscriber);
    this.eventEntities = [];
  }

  createEventSticky(name) {
    let eventEntity = new EventEntity(name);
    this.eventPublisher.NotifyObservers("event.created", eventEntity);
    this.eventEntities.push(eventEntity);
  }
}

export class EventBusinessStore {
  store: object[] = [];

  constructor(eventSubscriber: EventSubscriber) {
    let createdEvent = new BaseEvent("event.created", this.handleCreatedEvent.bind(this));
    eventSubscriber.registerEvent(createdEvent)
  }

  handleCreatedEvent(value) {
    this.store.push(value);
  }
}
