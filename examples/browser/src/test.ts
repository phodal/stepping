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

let eventEntity = eventBusiness.createEventSticky('事件贴纸已创建');
eventBusiness.createEventSticky('事件贴纸位置已生成');
eventBusiness.createEventSticky('事件贴纸已渲染');

let result = eventStickyRender.render();

console.log(result);

let el = document.getElementById('app');
el.innerHTML = result;
