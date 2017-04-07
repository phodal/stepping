import {test} from 'ava';
import {
  ForceLayoutAdapter
} from 'stepping';

test('should enable add related child', t => {
  let forceLayoutAdapter = new ForceLayoutAdapter();
  forceLayoutAdapter.draw({
    'nodes': [
      {id: 0, name: 'domain'},
      {id: 1, name: '库存'},
      {id: 2, name: '商品'},
      {id: 3, name: '订单'}
    ],
    'edges': [
      [{id: 0, name: 'domain'}, {id: 1, name: '库存'}],
      [{id: 0, name: 'domain'}, {id: 2, name: '商品'}],
      [{id: 0, name: 'domain'}, {id: 3, name: '订单'}]
    ]
  }, () => {
    return;
  })
});
