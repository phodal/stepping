import {test} from 'ava';
import {BaseEvent, EventPublisher, EventSubscriber} from 'eventstorming';

test('should enable receive event', t => {
  let eventPublisher = new EventPublisher();
  let eventClient = new EventSubscriber();
  let eventClient2 = new EventSubscriber();

  let count = 1;

  function simpleAction() {
    count++
  }
  let baseEvent1 = new BaseEvent('hello', simpleAction);

  eventClient.registerEvent(baseEvent1);

  eventPublisher.RegisterObserver(eventClient);
  eventPublisher.RegisterObserver(eventClient2);

  eventPublisher.NotifyObservers('hello', { test: 'test'});

  t.deepEqual(eventClient.events.length, 1);
  t.deepEqual(eventClient2.events.length, 0);

  let count2 = 1;
  function simpleAction2() {
    count2++
  }
  let baseEvent2 = new BaseEvent('hello 2', simpleAction2);

  eventClient2.registerEvent(baseEvent2);
  eventPublisher.NotifyObservers('hello 2', { test: 'test'});

  t.deepEqual(eventClient2.events.length, 1);
  t.deepEqual(count, 2);
  t.deepEqual(count2, 2);
});
