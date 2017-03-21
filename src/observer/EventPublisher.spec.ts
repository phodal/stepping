import {test} from "ava";
import {EventPublisher} from "eventstorming";
import {EventSubscriber} from "eventstorming";

test('should enable add related child', t => {
  let eventPublisher = new EventPublisher();
  let eventClient = new EventSubscriber();
  let eventClient2 = new EventSubscriber();

  eventPublisher.RegisterObserver(eventClient);
  eventPublisher.RegisterObserver(eventClient2);

  eventPublisher.NotifyObservers('hello', { test: 'test'});
});
