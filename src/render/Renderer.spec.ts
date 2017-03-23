import {test} from "ava";
import {Renderer} from "eventstorming";
import {EventEntity} from "eventstorming";

test('should return correctly node svg', t => {
  let renderer = new Renderer();
  let eventEntities: EventEntity[] = [];
  let eventEntity = new EventEntity('sticker had created');
  eventEntities.push(eventEntity);
  renderer.createEntity(eventEntity, eventEntities);
});
