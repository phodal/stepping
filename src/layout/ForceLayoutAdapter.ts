import {Layout, Renderer} from 'springy';
import {ESGraph} from './ESGraph';
import {ESRenderer} from './ESRenderer';

export class ForceLayoutAdapter {
  renderer: any;
  results: string = '';
  nodes: object[] = [];
  private graph: ESGraph;
  private layout: Layout.ForceDirected;

  constructor() {

  }

  draw(jsonNode, callback) {
    this.graph = new ESGraph();
    this.graph.loadJSON(jsonNode);
    this.layout = new Layout.ForceDirected(this.graph, 300.0, 200.0, 0.5);
    let that = this;

    let renderer = new ESRenderer(this.layout,
      function clear() {
        that.results = '';
        that.nodes = [];
      },
      function drawEdge(edge, p1, p2) {
        that.drawEdge(edge, p1, p2);
      },
      function drawNode(node, p) {
        that.nodes.push({
          id: node.id,
          name: node.data.name,
          width: 300,
          height: 180,
          position: {
            x: p.x * 300,
            y: p.y * 180
          }
        });
        that.results += that.drawNode(node, p).toString();
      },
      function done() {
        callback(that.results, that.nodes);
      }
    );

    renderer.start();
  }

  drawEdge(edge: any, p1: any, p2: any) {
    // console.log(edge, p1, p2)
  }

  drawNode(node: any, p: any) {
    let x = p.x * 300;
    let y = p.y * 180;

    return `<g>
              <rect x="${x}" y="${y}" width="300" height="180" rx="2" ry="2" fill="#ffff00"/>
              <text x="${x}" y="${y}" fill="#000" text-anchor="middle">
                <tspan dx="150" dy="90">${node.data.name}</tspan>
              </text>
            </g>`
  }
}
