import {Layout, Renderer} from 'springy';
import {ESGraph} from './ESGraph';
import {ESRenderer} from './ESRenderer';

export class ForceLayoutAdapter {
  renderer: any;
  results: string = "";
  private graph: ESGraph;
  private layout: Layout.ForceDirected;

  constructor() {

  }

  draw(jsonNode, callback) {
    this.graph = new ESGraph();
    this.graph.loadJSON(jsonNode);
    this.layout = new Layout.ForceDirected(this.graph, 1000.0, 200.0, 0.5);
    let that = this;

    let renderer = new ESRenderer(this.layout,
      function clear() {
        that.results = "";
      },
      function drawEdge(edge, p1, p2) {
        that.drawEdge(edge, p1, p2);
      },
      function drawNode(node, p) {
        that.results += that.drawNode(node, p).toString();
      },
      function done() {
        callback(that.results);
      }
    );

    renderer.start();
  }

  clear() {

  }

  dslToNodes(dsl, nodeType): object {
    if (dsl.type !== nodeType) {
      return {};
    }

    let result: object[] = [];

    if (nodeType === 'domain') {
      let type = 'aggregates';
      let rootNodeName = dsl.name;
      result.push(this.domainChildToNode(rootNodeName, dsl[type]));
    } else if (nodeType === 'aggregate') {
      let rootNodeName = dsl.name;
      result.push(this.aggregateChildToNode(rootNodeName, dsl));
    } else {
      result = [{
        "nodes": [],
        "edges": []
      }];
    }

    return result;
  }

  domainChildToNode(rootNodeName, aggregate) {
    let result = {
      "nodes": [{}],
      "edges": [{}]
    };

    let nodes: object[] = [];
    let edges: object[] = [];

    let rootNode = {id: 0, name: rootNodeName};
    nodes.push(rootNode);

    for (let index in aggregate) {
      let currentNode = {id: parseInt(index) + 1, name: aggregate[index].name};
      nodes.push(currentNode);
      edges.push([rootNode, currentNode]);
    }

    result.nodes = nodes;
    result.edges = edges;
    return result;
  }

  aggregateChildToNode(rootNodeName, node) {
    let result = {
      "nodes": [{}],
      "edges": [{}]
    };

    let nodes: object[] = [];
    let edges: object[] = [];

    let rootNode = {id: 0, name: rootNodeName};
    nodes.push(rootNode);

    for (let index in node['events']) {
      let currentNode = {id: parseInt(index) + 1, name: node['events'][index].name};
      nodes.push(currentNode);
      edges.push([rootNode, currentNode]);
    }

    for (let index in node['commands']) {
      let currentNode = {id: parseInt(index) + 1, name: node['commands'][index].name};
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
