import {test} from 'ava';
import {
  DSLConverter
} from 'eventstorming';

test('should enable add related child', t => {
  var testF = [{
    'name': ' 库存子域',
    'type': 'domain',
    'aggregates': [{
      'name': ' 库存聚合',
      'type': 'aggregate',
      'events': [{'name': ' 库存已增加', 'type': 'event'}, {'name': '库存已恢复 ', 'type': 'event'}],
      'commands': []
    }, {
      'name': ' 商品聚合',
      'type': 'aggregate',
      'events': [{'name': ' 商品已创建', 'type': 'event'}],
      'commands': [{'name': '添加商品', 'type': 'command'}]
    }]
  }];
  let converter = new DSLConverter();
  let result = converter.convertToSvg(testF);

  t.deepEqual(`<g>
              <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>
              <text x=\"0\" y=\"30\" fill=\"#000\">
                <tspan x=\"5\" dy=\"0\"> 库存子域</tspan>
              </text>
            </g>`, result);
});
