import {EventEntity} from "../entity/EventEntity";
import {EventPublisher} from "../observer/EventPublisher";
import {EventSubscriber} from "../observer/EventSubscriber";
import {BaseEvent} from "../observer/BaseEvent";
import {LocalStorageRepository} from "../store/LocalStorageRepository";

export class EventBusiness {
  private eventPublisher: EventPublisher;

  constructor(subscriber) {
    this.eventPublisher = new EventPublisher();
    this.eventPublisher.RegisterObserver(subscriber);
  }

  createEventSticky(name): EventEntity {
    let eventEntity = new EventEntity(name);
    this.eventPublisher.NotifyObservers("event.created", eventEntity);

    return eventEntity;
  }

  updateEventSticky(entity: EventEntity): EventEntity {
    this.eventPublisher.NotifyObservers("event.updated", entity);
    return entity;
  }

  addRelatedChild(createdEntity: EventEntity, subEntity: EventEntity) {
    createdEntity.addRelatedChild(subEntity);
    this.updateEventSticky(subEntity);

    return createdEntity
  }
}

export class EventBusinessStore {
  store: EventEntity[] = [];
  private localStorageRepository;
  mapper = {
    stringify: (entity: EventEntity) => {
      return JSON.stringify(entity);
    }
  };

  constructor(eventSubscriber: EventSubscriber) {
    let createdEvent = new BaseEvent("event.created", this.handleCreatedEvent.bind(this));
    let updatedEvent = new BaseEvent("event.updated", this.handleUpdatedEvent.bind(this));
    this.localStorageRepository = new LocalStorageRepository(this.mapper);

    eventSubscriber.registerEvent(createdEvent);
    eventSubscriber.registerEvent(updatedEvent);
  }

  handleCreatedEvent(entity) {
    this.store.push(entity);

    this.localStorageRepository.store(entity);
    this.localStorageRepository.storeListInGroup('event.store', this.store);
  }

  handleUpdatedEvent(entity) {
    for(let index in this.store) {
      if(this.store[index].id === entity.id) {
        this.store[index] = entity;
      }
    }

    this.localStorageRepository.store(entity);
    this.localStorageRepository.storeListInGroup('event.store', this.store);
  }
}
