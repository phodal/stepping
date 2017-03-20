import {test} from "ava";
import {EventModel} from "eventstorming";

test('add Model', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created"
  });

  let eventRead = eventModel.read(event['id']);
  t.deepEqual(eventRead["name"], event["name"]);
});

test('test more model', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created 2"
  });

  let eventRead = eventModel.read(event.id);
  t.deepEqual(eventRead["name"], event["name"]);
});
