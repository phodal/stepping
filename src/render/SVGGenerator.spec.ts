import {test} from "ava";
import {SVGGenerator, EventEntity} from "eventstorming";

test('should return correctly node result', t => {
  let svgGenerator = new SVGGenerator();
  let eventEntity = new EventEntity('sticker had created');
  let result = svgGenerator.buildNode({x: 50, y: 50}, eventEntity);
  t.deepEqual(result, '<g>               <rect x=\"50\" y=\"50\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>               <text x=\"50\" y=\"80\" fill=\"#000\">                 <tspan x=\"55\" dy=\"0\">sticker had created</tspan>               </text>             </g>')
});

test('should return correctly node header', t => {
  let svgGenerator = new SVGGenerator();
  let result = svgGenerator.buildBody('<g></g>');
  t.deepEqual(result, '<svg width=\"1024\" height=\"1024\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"> <g></g> </svg>')
});
