import {test} from 'ava';
import {
  ESGraph
} from 'eventstorming';

test('should enable add related child', t => {
  let graph = new ESGraph();
  graph.loadJSON({
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
  })

  t.deepEqual(JSON.stringify(graph.nodes), '[{\"id\":0,\"data\":{\"label\":\"domain\"}},{\"id\":1,\"data\":{\"label\":\"库存\"}},{\"id\":2,\"data\":{\"label\":\"商品\"}},{\"id\":3,\"data\":{\"label\":\"订单\"}}]')

});
