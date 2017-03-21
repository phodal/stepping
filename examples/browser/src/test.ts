import { EventPublisher, EventModel, BaseModel } from 'eventstorming'

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

eventModel.addRelatedChild(base);

console.log(JSON.stringify(eventModel.baseModels));
