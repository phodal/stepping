import {test} from 'ava';
import {GraphUtils, AggregateEntity} from 'stepping';

test('should convert domain DSL to node format', t => {
  let dslExample = {
    'name': '库存子域',
    'type': 'domain',
    'aggregates': [{
      'name': '库存',
      'type': 'aggregate',
      'events': [
        {'name': ' 库存已增加', 'type': 'event'},
        {'name': ' 库存已恢复', 'type': 'event'},
        {'name': ' 库存已扣减', 'type': 'event'},
        {'name': ' 库存已锁定', 'type': 'event'}
      ],
      'commands': [
        {'name': ' 编辑库存', 'type': 'command'}
      ]
    }]
  };
  let result = GraphUtils.dslToNodes(dslExample, 'domain');

  t.deepEqual(result['nodes'][0]['name'], '库存');
  t.deepEqual(result['edges'][0][0]['name'], '库存');
});

test('should convert aggregate DSL to aggregate model format', t => {
  let dslExample = {
    'name': ' 库存子域',
    'type': 'domain',
    'aggregates': [{
      'name': '库存',
      'type': 'aggregate'
    }, {
      'name': '订单',
      'type': 'aggregate'
    }]
  };

  let result = GraphUtils.toAggregateModelNode(dslExample['aggregates']);

  t.deepEqual(result.nodes[0]['name'], '库存');
  t.deepEqual(result.nodes[0]['type'], 'aggregate');
  t.deepEqual(result.nodes[1]['name'], '订单');
});

test('should convert aggregate DSL to event model format', t => {
  let dslJson = {
    'name': '库存',
    'type': 'aggregate',
    'events': [
      {'name': '库存已增加', 'type': 'event'},
      {'name': '库存已恢复', 'type': 'event'},
      {'name': '库存已扣减', 'type': 'event'},
      {'name': '库存已锁定', 'type': 'event'}
    ],
    'commands': [
      {'name': ' 编辑库存', 'type': 'command'}
    ]
  };

  let aggregateEntity = new AggregateEntity('库存');
  let result = GraphUtils.toEventModelNode(aggregateEntity, dslJson);

  t.deepEqual(result.nodes[0]['name'], '库存');
  t.deepEqual(result.nodes[1]['name'], '库存已增加');
  t.deepEqual(result.nodes[2]['name'], '库存已恢复');
  t.deepEqual(result.nodes[3]['name'], '库存已扣减');
  t.deepEqual(result.nodes[4]['name'], '库存已锁定');

  t.deepEqual(result.nodes[4]['type'], 'event');
  t.deepEqual(result.nodes[5]['type'], 'command');
});
