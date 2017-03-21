import {test} from "ava";
import { EventEntity } from "eventstorming";

test('should enable add model', t => {
  let mainEntity = new EventEntity('should create message');
  let subEntity = new EventEntity('should create message 2');
  mainEntity.addRelatedChild(subEntity);

  t.deepEqual(mainEntity.relatedChild[0].name, 'should create message 2')
});
