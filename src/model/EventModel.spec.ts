import {test} from "ava";
import {EventModel} from "eventstorming";

test('should enable create model', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created"
  });

  let eventRead = eventModel.read(event['id']);
  t.deepEqual(eventRead["name"], event["name"]);
});

test('should enable create model 2', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created 2"
  });

  let eventRead = eventModel.read(event.id);
  t.deepEqual(eventRead["name"], event["name"]);
});

test('should enable edit model', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created 2"
  });

  event.name = "event should be updated";
  let eventUpdated = eventModel.update(event);
  t.deepEqual(eventUpdated["name"], event["name"]);
});
