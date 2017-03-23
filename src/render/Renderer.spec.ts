import {test} from "ava";
import {Renderer} from "eventstorming";
import {EventEntity} from "eventstorming";
import {EventPositionEntity} from "eventstorming";

test('should return correctly node svg', t => {
  let renderer = new Renderer();
  let eventEntities: EventEntity[] = [];
  let eventEntity = new EventEntity('sticker had created');
  eventEntities.push(eventEntity);
  renderer.createEntity(eventEntity, eventEntities);

  let pos = {x: 5, y: 5};
  let eventPositionEntity = new EventPositionEntity(pos, eventEntity);
  console.log("///////////////////////////");
  console.log(eventPositionEntity);
});
