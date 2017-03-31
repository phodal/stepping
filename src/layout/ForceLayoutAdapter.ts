import {Layout, Renderer} from 'springy';
import {ESGraph} from './ESGraph';

export class ForceLayoutAdapter {
  renderer: any;
  private graph: ESGraph;
  private layout: Layout.ForceDirected;

  constructor() {

  }

  draw(jsonNode) {
    this.graph = new ESGraph();
    this.graph.loadJSON(jsonNode);
    this.layout = new Layout.ForceDirected(this.graph, 1000.0, 200.0, 0.5);
    let that = this;

    let renderer = new Renderer(this.layout,
      function clear() {
        // code to clear screen
      },
      function drawEdge(edge, p1, p2) {
        that.drawEdge(edge, p1, p2);
      },
      function drawNode(node, p) {
        let result = that.drawNode(node, p);
        console.log(result);
      }
    );

    renderer.start();
  }

  clear() {

  }

  onRenderStop() {
    console.log("stop");
  }

  onRenderStart() {

  }

  drawEdge(edge: any, p1: any, p2: any) {
    // console.log(edge, p1, p2)
  }

  drawNode(node: any, p: any) {
    let x = p.x * 400;
    let y = p.y * 200;

    return `<g>
              <rect x="${x}" y="${y}" width="400" height="240" rx="2" ry="2" fill="#FFCC33"/>
              <text x="${x}" y="${y}" fill="#000" text-anchor="middle">
                <tspan dx="200" dy="120">${node.data.name}</tspan>
              </text>
            </g>`
  }
}
