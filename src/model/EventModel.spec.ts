import {test} from "ava";
import {EventModel} from "eventstorming";

test('should enable create model', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created"
  });

  let eventRead = eventModel.readById(event['id']);
  t.deepEqual(eventRead["name"], event["name"]);
});

test('should enable create model 2', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created 2"
  });

  let eventRead = eventModel.readById(event.id);
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

test('should enable get all model', t => {
  let eventModel = new EventModel;
  eventModel.create({
    name: "event should be created 1"
  });

  eventModel.create({
    name: "event should be created 2"
  });

  let events = eventModel.all();
  t.deepEqual(events[0]['name'], 'event should be created 1');
  t.deepEqual(events[1]['name'], 'event should be created 2');
});

test('should enable deleteById model', t => {
  let eventModel = new EventModel;
  let event1 = eventModel.create({
    name: "event should be created 1"
  });

  eventModel.create({
    name: "event should be created 2"
  });

  eventModel.deleteById(event1["id"]);
  let events =eventModel.all();
  t.deepEqual(events.length, 1);
  t.deepEqual(events[0]['name'], 'event should be created 2');
});
