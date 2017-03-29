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

  t.deepEqual(`<svg width=\"1024\" height=\"1024\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"ProcessOnG1005\" transform=\"matrix(1.0,0.0,0.0,1.0,173.0,133.0)\" opacity=\"1.0\">
        <path id=\"ProcessOnPath1006\" d=\"M0.0 0.0L184.0 0.0L184.0 117.0L0.0 117.0Z\" stroke=\"#ffffff\" stroke-width=\"1.0\"
              stroke-dasharray=\"none\" opacity=\"1.0\" fill=\"#ffff00\"/>
        <g id=\"ProcessOnG1007\" transform=\"matrix(1.0,0.0,0.0,1.0,10.0,48.5)\">
          <text id=\"ProcessOnText1008\" fill=\"#000000\" font-weight=\"normal\" font-style=\"normal\" text-decoration=\"blink\"
                font-family=\"微软雅黑\" text-anchor=\"middle\" font-size=\"16\" x=\"82.0\" y=\"16.4\">  库存聚合
          </text>
        </g>
      </g><g>
              <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>
              <text x=\"0\" y=\"30\" fill=\"#000\">
                <tspan x=\"5\" dy=\"0\">库存已恢复 </tspan>
              </text>
            </g><g id=\"ProcessOnG1005\" transform=\"matrix(1.0,0.0,0.0,1.0,173.0,133.0)\" opacity=\"1.0\">
        <path id=\"ProcessOnPath1006\" d=\"M0.0 0.0L184.0 0.0L184.0 117.0L0.0 117.0Z\" stroke=\"#ffffff\" stroke-width=\"1.0\"
              stroke-dasharray=\"none\" opacity=\"1.0\" fill=\"#ffff00\"/>
        <g id=\"ProcessOnG1007\" transform=\"matrix(1.0,0.0,0.0,1.0,10.0,48.5)\">
          <text id=\"ProcessOnText1008\" fill=\"#000000\" font-weight=\"normal\" font-style=\"normal\" text-decoration=\"blink\"
                font-family=\"微软雅黑\" text-anchor=\"middle\" font-size=\"16\" x=\"82.0\" y=\"16.4\">  商品聚合
          </text>
        </g>
      </g><g>
              <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>
              <text x=\"0\" y=\"30\" fill=\"#000\">
                <tspan x=\"5\" dy=\"0\"> 商品已创建</tspan>
              </text>
            </g> </svg>`, result);
});
