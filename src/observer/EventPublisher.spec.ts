import {test} from "ava";
import {EventPublisher} from "eventstorming";
import {EventSubscriber} from "eventstorming";
import {BaseEvent} from "eventstorming";

test('should enable receive event', t => {
  let eventPublisher = new EventPublisher();
  let eventClient = new EventSubscriber();
  let eventClient2 = new EventSubscriber();

  let baseEvent1 = new BaseEvent('hello');
  eventClient.registerEvent(baseEvent1);

  eventPublisher.RegisterObserver(eventClient);
  eventPublisher.RegisterObserver(eventClient2);

  eventPublisher.NotifyObservers('hello', { test: 'test'});

  t.deepEqual(eventClient.events.length, 1);
  t.deepEqual(eventClient2.events.length, 0);

  let baseEvent2 = new BaseEvent('hello');
  eventClient2.registerEvent(baseEvent2);
  eventPublisher.NotifyObservers('hello', { test: 'test'});

  t.deepEqual(eventClient2.events.length, 1);
});
