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
  });

  t.deepEqual(JSON.stringify(graph.nodes), '[{\"id\":0,\"data\":{\"name\":\"domain\"}},{\"id\":1,\"data\":{\"name\":\"库存\"}},{\"id\":2,\"data\":{\"name\":\"商品\"}},{\"id\":3,\"data\":{\"name\":\"订单\"}}]');

  t.deepEqual(JSON.stringify(graph.edges), '[{\"id\":0,\"source\":{\"id\":0,\"data\":{\"name\":\"domain\"}},\"target\":{\"id\":1,\"data\":{\"name\":\"库存\"}},\"data\":{}},{\"id\":1,\"source\":{\"id\":0,\"data\":{\"name\":\"domain\"}},\"target\":{\"id\":2,\"data\":{\"name\":\"商品\"}},\"data\":{}},{\"id\":2,\"source\":{\"id\":0,\"data\":{\"name\":\"domain\"}},\"target\":{\"id\":3,\"data\":{\"name\":\"订单\"}},\"data\":{}}]')
});
