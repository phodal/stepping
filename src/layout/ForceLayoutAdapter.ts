import {Layout, Renderer} from 'springy';
import {ESGraph} from './ESGraph';
import {ESRenderer} from './ESRenderer';

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

    let renderer = new ESRenderer(this.layout,
      function clear() {
        // code to clear screen
      },
      function drawEdge(edge, p1, p2) {
        that.drawEdge(edge, p1, p2);
      },
      function drawNode(node, p) {
        let result = that.drawNode(node, p);
        // console.log(result);
      },
      function done() {
        console.log("done")
      }
    );

    renderer.start();
  }

  clear() {

  }

  dslToNodes(dsl): object {
    if (!dsl["aggregates"]) {
      return {};
    }

    let result: object[] = [];
    for (let index in dsl["aggregates"]) {
      result.push(this.dslToNode(dsl["aggregates"][index]));
    }

    return result;
  }

  dslToNode(node) {
    let result = {
      "nodes": [{}],
      "edges": [{}]
    };

    let nodes:object[] = [];
    let edges:object[] = [];

    let rootNodeName = node.name;
    let events = node["events"];
    let rootNode = {id: 0, name: rootNodeName};
    nodes.push(rootNode);

    for (let index in events) {
      let currentNode = {id: parseInt(index) + 1, name: events[index].name};
      nodes.push(currentNode);
      edges.push([rootNode, currentNode]);
    }

    result.nodes = nodes;
    result.edges = edges;
    return result;
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
