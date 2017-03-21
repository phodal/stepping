import {test} from "ava";
import { EventModel, BaseModel } from "eventstorming";

test('should enable create model', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created"
  });

  let baseModel = new BaseModel;
  let base = baseModel.create({
    name: "event should be created"
  });

  eventModel.addRelatedChild(base);
  let getRelated = eventModel.getRelatedChildById(base.id);

  t.deepEqual(base["name"], getRelated["name"]);
});

