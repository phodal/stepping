import {test} from "ava";
import {EventPublisher} from "eventstorming";
import {EventClient} from "eventstorming";

test('should enable add related child', t => {
  let eventPublisher = new EventPublisher();
  let eventClient = new EventClient();
  let eventClient2 = new EventClient();

  eventPublisher.RegisterObserver(eventClient);
  eventPublisher.RegisterObserver(eventClient2);

  eventPublisher.NotifyObservers('hello', { test: 'test'});
});
