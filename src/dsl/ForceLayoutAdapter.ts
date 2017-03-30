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
    let results: string[] = [];

    this.renderer = new Renderer(this.layout,
      function clear() {
        that.clear();
      },

      function drawEdge(edge, p1, p2) {
        that.drawEdge(edge, p1, p2)
      },

      function drawNode(node, p) {
        let result = that.drawNode(node, p);
        console.log(result);
        that.results.push(result)
      }
    );

    this.renderer.start(function () {
      console.log('.........');
      console.log(that.results)
    });

  }

  clear() {

  }

  drawEdge(edge: any, p1: any, p2: any) {

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
