import {test} from 'ava';
import {EventEntity} from 'stepping';

test('should enable add related child', t => {
  let mainEntity = new EventEntity('should create message');
  let subEntity = new EventEntity('should create message 2');
  mainEntity.addRelatedChild(subEntity);

  t.deepEqual(mainEntity.relatedNodes[0].name, 'should create message 2')
});

test('should enable remove related child', t => {
  let mainEntity = new EventEntity('should create message');
  let subEntity = new EventEntity('should create message 2');
  let subEntity2 = new EventEntity('should create message 3');
  mainEntity.addRelatedChild(subEntity);
  mainEntity.addRelatedChild(subEntity2);

  mainEntity.removeRelatedChild(subEntity2);

  t.deepEqual(mainEntity.relatedNodes.length, 1);
  t.deepEqual(mainEntity.relatedNodes[0].name, 'should create message 2');
});
