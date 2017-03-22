import {test} from "ava";
import {EventBusiness, EventBusinessStore, EventSubscriber, EventPublisher} from "eventstorming";

test('should enable add related child', t => {
  let eventSubscriber = new EventSubscriber();
  let eventStore = new EventBusinessStore(eventSubscriber);

  let eventBusiness = new EventBusiness(eventSubscriber);

  eventBusiness.createEventSticky('hello');

  t.deepEqual(eventBusiness.eventEntities[0].name, 'hello');

  console.log(eventStore.store[0]);
  t.deepEqual(eventStore.store[0]['name'], 'hello');
});
