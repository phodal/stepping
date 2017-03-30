import {Layout, Graph, Renderer} from 'springy'

export class ForceLayoutAdapter {
  renderer: any;
  results: string[] = [];
  private graph: Graph;
  private layout: Layout.ForceDirected;

  constructor() {

  }

  draw(jsonNode) {
    this.graph = new Graph();
    this.graph.loadJSON(jsonNode);
    this.layout = new Layout.ForceDirected(this.graph, 200.0, 200.0, 0.5);
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
    let x = p.x * 50;
    let y = p.y * 50;

    return `<g>
              <rect x="${x}" y="${y}" width="100" height="100" rx="2" ry="2" fill="#FFCC33"/>
              <text x="${x}" y="${y + 30}" fill="#000">
                <tspan x="${x + 5}" dy="0">${node.id}</tspan>
              </text>
            </g>`
  }
}
