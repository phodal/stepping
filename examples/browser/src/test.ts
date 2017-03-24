import {
  BaseEvent,
  EventEntity,
  EventModel,
  EventPublisher,
  EventSubscriber,
  Renderer,
  EventBusinessStore,
  EventBusiness,
  EventStickyRender,
  SVGGenerator
} from "eventstorming";

let eventSubscriber = new EventSubscriber();
let eventStore = new EventBusinessStore(eventSubscriber);
let eventStickyRender = new EventStickyRender(eventSubscriber);

let eventBusiness = new EventBusiness(eventSubscriber);

let subEntity = new EventEntity('sticker had store');

let eventEntity = eventBusiness.createEventSticky('event had created');

eventEntity.addRelatedChild(subEntity);

eventBusiness.createEventSticky('sticky had created');
eventBusiness.createEventSticky('sticky had rendered');

let result = eventStickyRender.render();

console.log(result);

let el = document.getElementById('app');
el.innerHTML = result;
