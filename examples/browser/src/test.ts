import {BaseModel, EventModel, EventSubscriber, EventBusinessStore, EventBusiness} from "eventstorming";

function log (str: string) {
  console.log(str)
}

log('Output:');

let baseModel = new BaseModel;
let base = baseModel.create({
  name: "event should be created"
});

let eventModel = new EventModel;

eventModel.create({
  name: "event should be created 2",
  relatedChild: base
});

console.log(JSON.stringify(eventModel));

let eventSubscriber = new EventSubscriber();
let eventStore = new EventBusinessStore(eventSubscriber);

let eventBusiness = new EventBusiness(eventSubscriber);

eventBusiness.createEventSticky('事件贴纸已创建');
eventBusiness.createEventSticky('事件贴纸位置已生成');
eventBusiness.createEventSticky('事件贴纸已渲染');


