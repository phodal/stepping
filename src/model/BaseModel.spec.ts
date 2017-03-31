import {test} from 'ava';
import {BaseModel} from 'stepping';

test('should enable add model', t => {
  let baseModel = new BaseModel();
  let event = baseModel.create({
    name: 'event should be created'
  });

  let eventRead = baseModel.readById(event['id']);
  t.deepEqual(eventRead['name'], event['name']);
});

test('should enable add model 2', t => {
  let baseModel = new BaseModel();
  let event = baseModel.create({
    name: 'event should be created 2'
  });

  let eventRead = baseModel.readById(event.id);
  t.deepEqual(eventRead['name'], event['name']);
});

test('should enable get all model', t => {
  let baseModel = new BaseModel();
  baseModel.create({
    name: 'event should be created 1'
  });

  baseModel.create({
    name: 'event should be created 2'
  });

  let events = baseModel.all();
  t.deepEqual(events[0]['name'], 'event should be created 1');
  t.deepEqual(events[1]['name'], 'event should be created 2');
});

test('should enable deleteById model', t => {
  let baseModel = new BaseModel();
  let event1 = baseModel.create({
    name: 'event should be created 1'
  });

  baseModel.create({
    name: 'event should be created 2'
  });

  baseModel.deleteById(event1['id']);
  let events = baseModel.all();
  t.deepEqual(events.length, 1);
  t.deepEqual(events[0]['name'], 'event should be created 2');
});
