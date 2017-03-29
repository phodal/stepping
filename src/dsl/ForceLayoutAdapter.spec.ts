import {test} from 'ava';
import {
  ForceLayoutAdapter
} from 'eventstorming';

test('should enable add related child', t => {
  let forceLayoutAdapter = new ForceLayoutAdapter();
  forceLayoutAdapter.draw({
    "nodes": ["库存", "编辑库存", "库存已增加", "库存已扣减", "库存已恢复", "库存已锁定"],
    "edges": [
      ["库存", "编辑库存"],
      ["库存", "库存已增加"],
      ["库存", "库存已恢复"],
      ["库存", "库存已锁定"],
      ["库存", "库存已扣减"]
    ]
  })
});
