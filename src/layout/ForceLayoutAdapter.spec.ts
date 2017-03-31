import {test} from 'ava';
import {
  ForceLayoutAdapter
} from 'stepping';

test('should enable add related child', t => {
  let forceLayoutAdapter = new ForceLayoutAdapter();
  forceLayoutAdapter.draw({
    "nodes": [
      {id: 0, name: "domain"},
      {id: 1, name: "库存"},
      {id: 2, name: "商品"},
      {id: 3, name: "订单"}
    ],
    "edges": [
      [{id: 0, name: "domain"}, {id: 1, name: "库存"}],
      [{id: 0, name: "domain"}, {id: 2, name: "商品"}],
      [{id: 0, name: "domain"}, {id: 3, name: "订单"}],
    ]
  }, ()=>{})
});

test('should convert DSL to node format', t => {
  let forceLayoutAdapter = new ForceLayoutAdapter();
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
  let result = forceLayoutAdapter.dslToNodes(dslExample);
  t.deepEqual(JSON.stringify(result), '[{\"nodes\":[{\"id\":0,\"name\":\" 库存\"},{\"id\":1,\"name\":\" 库存已增加\"},{\"id\":2,\"name\":\" 库存已恢复\"},{\"id\":3,\"name\":\" 库存已扣减\"},{\"id\":4,\"name\":\" 库存已锁定\"}],\"edges\":[[{\"id\":0,\"name\":\" 库存\"},{\"id\":1,\"name\":\" 库存已增加\"}],[{\"id\":0,\"name\":\" 库存\"},{\"id\":2,\"name\":\" 库存已恢复\"}],[{\"id\":0,\"name\":\" 库存\"},{\"id\":3,\"name\":\" 库存已扣减\"}],[{\"id\":0,\"name\":\" 库存\"},{\"id\":4,\"name\":\" 库存已锁定\"}]]}]')
});
