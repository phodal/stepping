import {test} from 'ava';
import {
  ForceLayoutAdapter
} from 'eventstorming';

test('should enable add related child', t => {
  let forceLayoutAdapter = new ForceLayoutAdapter();
  forceLayoutAdapter.draw({
    "nodes": ["domain", "库存", "商品", "订单"],
    "edges": [
      ["domain", "库存"],
      ["domain", "商品"],
      ["domain", "订单"],
    ]
  })
});
