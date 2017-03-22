import {EventEntity} from "../entity/EventEntity";
import {EventPublisher} from "../observer/EventPublisher";
import {EventSubscriber} from "../observer/EventSubscriber";
import {BaseEvent} from "../observer/BaseEvent";
import {LocalStorageRepository} from "../store/LocalStorageRepository";

export class EventBusiness {
  eventEntities: EventEntity[];
  private eventPublisher: EventPublisher;

  constructor(subscriber) {
    this.eventPublisher = new EventPublisher();
    this.eventPublisher.RegisterObserver(subscriber);
    this.eventEntities = [];
  }

  createEventSticky(name): EventEntity {
    let eventEntity = new EventEntity(name);
    this.eventPublisher.NotifyObservers("event.created", eventEntity);
    this.eventEntities.push(eventEntity);

    return eventEntity;
  }
}

export class EventBusinessStore {
  store: EventEntity[] = [];

  constructor(eventSubscriber: EventSubscriber) {
    let createdEvent = new BaseEvent("event.created", this.handleCreatedEvent.bind(this));
    eventSubscriber.registerEvent(createdEvent)
  }

  handleCreatedEvent(entity) {
    this.store.push(entity);

    let mapper = {
      stringify: (entity: EventEntity) => {
        return JSON.stringify(entity);
      }
    };

    let localStorageRepository = new LocalStorageRepository(mapper);
    localStorageRepository.store(entity);
    localStorageRepository.storeListInGroup('event.store', this.store);
  }
}
