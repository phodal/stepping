import {test} from "ava";
import {EventBusiness} from "eventstorming";

test('should enable add related child', t => {
  let eventBusiness = new EventBusiness();
  eventBusiness.createEventSticky('hello');
});
