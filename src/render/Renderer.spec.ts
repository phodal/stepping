import {test} from "ava";
import {EventEntity, SVGGenerator, EventPositionEntity, IGenerator, Renderer} from "eventstorming";

test('should return correctly node svg', t => {
  let renderer = new Renderer(new SVGGenerator());
  let eventEntities: EventEntity[] = [];
  let eventEntity = new EventEntity('sticker had created');
  eventEntities.push(eventEntity);
  renderer.createEntity(eventEntity, eventEntities);

  let pos = {x: 5, y: 5};
  let eventPositionEntity = new EventPositionEntity(pos, eventEntity);
  console.log("///////////////////////////");
  console.log(eventPositionEntity);
});
