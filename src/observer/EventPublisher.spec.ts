import {test} from "ava";
import {EventPublisher} from "eventstorming";
import {EventSubscriber} from "eventstorming";

test('should enable receive event', t => {
  let eventPublisher = new EventPublisher();
  let eventClient = new EventSubscriber();
  let eventClient2 = new EventSubscriber();

  eventClient.registerEvent('hello');

  eventPublisher.RegisterObserver(eventClient);
  eventPublisher.RegisterObserver(eventClient2);

  eventPublisher.NotifyObservers('hello', { test: 'test'});

  t.deepEqual(eventClient.eventTypes.length, 1);
  t.deepEqual(eventClient2.eventTypes.length, 0);

  eventClient2.registerEvent('hello');
  eventPublisher.NotifyObservers('hello', { test: 'test'});

  t.deepEqual(eventClient2.eventTypes.length, 1);
});
