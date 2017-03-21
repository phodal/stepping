import {EventEntity} from "../entity/EventEntity";
import {EventPublisher} from "../observer/EventPublisher";
export class EventBusiness {
  eventEntities: EventEntity[];
  private eventPublisher: EventPublisher;

  constructor() {
    this.eventPublisher = new EventPublisher();
    this.eventEntities = [];
  }

  createEventSticky(name) {
    let eventEntity = new EventEntity(name);
    this.eventPublisher.NotifyObservers("event.created", {id: eventEntity.id});
    this.eventEntities.push(eventEntity);
  }
}
