import {test} from 'ava';
import {GraphUtils} from 'stepping';

test('should convert DSL to node format', t => {
  let dslExample = {
    "name": " 库存子域",
    "type": "domain",
    "aggregates": [{
      "name": " 库存",
      "type": "aggregate",
      "events": [
        {"name": " 库存已增加", "type": "event"},
        {"name": " 库存已恢复", "type": "event"},
        {"name": " 库存已扣减", "type": "event"},
        {"name": " 库存已锁定", "type": "event"}
      ],
      "commands": [
        {"name": " 编辑库存", "type": "command"}
      ]
    }]
  };
  let result = GraphUtils.dslToNodes(dslExample, "domain");
  t.deepEqual(JSON.stringify(result), '[{\"nodes\":[{\"id\":0,\"name\":\" 库存子域\"},{\"id\":1,\"name\":\" 库存\"}],\"edges\":[[{\"id\":0,\"name\":\" 库存子域\"},{\"id\":1,\"name\":\" 库存\"}]]}]')
});
