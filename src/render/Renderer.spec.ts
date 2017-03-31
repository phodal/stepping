import {test} from 'ava';
import {EventEntity, EventPositionEntity, IGenerator, Renderer, SVGGenerator} from 'stepping';

test('should return correctly node svg', t => {
  let svgGenerator = new SVGGenerator();
  let renderer = new Renderer(svgGenerator);

  let eventEntities: EventEntity[] = [];
  let eventEntity = new EventEntity('sticker had created');

  eventEntities.push(eventEntity);
  renderer.createEntity(eventEntity, eventEntities);

  let result = renderer.render();
  t.deepEqual(result, `<svg width=\"1024\" height=\"1024\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"> <g>
              <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>
              <text x=\"0\" y=\"30\" fill=\"#000\">
                <tspan x=\"5\" dy=\"0\">sticker had created</tspan>
              </text>
            </g> </svg>`);
});

test('should return correctly svg with two node', t => {
  let svgGenerator = new SVGGenerator();
  let renderer = new Renderer(svgGenerator);

  let eventEntities: EventEntity[] = [];
  let eventEntity = new EventEntity('sticker had created');

  eventEntities.push(eventEntity);
  renderer.createEntity(eventEntity, eventEntities);
  renderer.createEntity(eventEntity, eventEntities);

  let result = renderer.render();
  t.deepEqual(result, `<svg width=\"1024\" height=\"1024\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"> <g>
              <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>
              <text x=\"0\" y=\"30\" fill=\"#000\">
                <tspan x=\"5\" dy=\"0\">sticker had created</tspan>
              </text>
            </g><g>
              <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>
              <text x=\"0\" y=\"30\" fill=\"#000\">
                <tspan x=\"5\" dy=\"0\">sticker had created</tspan>
              </text>
            </g> </svg>`);

});

test('should return correctly svg with  child node', t => {
  let svgGenerator = new SVGGenerator();
  let renderer = new Renderer(svgGenerator);

  let eventEntities: EventEntity[] = [];
  let eventEntity = new EventEntity('sticker had created');
  let subEntity = new EventEntity('sticker had render');
  eventEntity.addRelatedChild(subEntity);

  eventEntities.push(eventEntity);
  renderer.createEntity(eventEntity, eventEntities);
  renderer.createEntity(eventEntity, eventEntities);

  let result = renderer.render();
  t.deepEqual(result, `<svg width=\"1024\" height=\"1024\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"> <g>
              <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>
              <text x=\"0\" y=\"30\" fill=\"#000\">
                <tspan x=\"5\" dy=\"0\">sticker had created</tspan>
              </text><g>
              <rect x=\"50\" y=\"50\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#0095DD\"/>
              <text x=\"50\" y=\"80\" fill=\"#000\">
                <tspan x=\"55\" dy=\"0\">sticker had render</tspan>
              </text>
            </g>
            </g><g>
              <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#FFCC33\"/>
              <text x=\"0\" y=\"30\" fill=\"#000\">
                <tspan x=\"5\" dy=\"0\">sticker had created</tspan>
              </text><g>
              <rect x=\"50\" y=\"50\" width=\"100\" height=\"100\" rx=\"2\" ry=\"2\" fill=\"#0095DD\"/>
              <text x=\"50\" y=\"80\" fill=\"#000\">
                <tspan x=\"55\" dy=\"0\">sticker had render</tspan>
              </text>
            </g>
            </g> </svg>`);

});
