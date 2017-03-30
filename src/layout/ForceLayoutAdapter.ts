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
    this.layout = new Layout.ForceDirected(this.graph, 200.0, 200.0, 0.5);
    let that = this;

    this.layout.start(function render() {
      that.clear();

      that.layout.eachEdge(function (edge, spring) {
        that.drawEdge(edge, spring.point1.p, spring.point2.p);
      });

      that.layout.eachNode(function (node, point) {
        let result = that.drawNode(node, point.p);
        console.log(result);
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
    let x = p.x * 150;
    let y = p.y * 100;

    return `<g>
              <rect x="${x}" y="${y}" width="200" height="120" rx="2" ry="2" fill="#FFCC33"/>
              <text x="${x}" y="${y + 30}" fill="#000">
                <tspan x="${x + 5}" dy="0">${node.id}</tspan>
              </text>
            </g>`
  }
}
