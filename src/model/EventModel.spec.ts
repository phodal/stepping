import {test} from "ava";
import {EventModel} from "eventstorming";

test('add Model', t => {
  let eventModel = new EventModel;
  let event = eventModel.create({
    name: "event should be created"
  });

  let eventRead = eventModel.read(event['id']);
  t.deepEqual(eventRead['name'], eventRead['name'])
});
