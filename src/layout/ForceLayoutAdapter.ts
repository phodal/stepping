import {Layout} from 'springy';
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

    this.layout.start(function render() {
      that.clear();

      that.layout.eachEdge(function (edge, spring) {
        that.drawEdge(edge, spring.point1.p, spring.point2.p);
      });

      that.layout.eachNode(function (node, point) {
        that.drawNode(node, point.p);
      });
    }, that.onRenderStop, that.onRenderStart);

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
