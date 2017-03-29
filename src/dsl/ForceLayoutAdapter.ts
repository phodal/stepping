import {Layout, Graph, Renderer} from 'springy'

export class ForceLayoutAdapter {
  renderer: any;
  private graph: Graph;
  private layout: Layout.ForceDirected;

  constructor() {

  }

  draw(jsonNode) {
    this.graph = new Graph();
    this.graph.loadJSON(jsonNode);
    this.layout = new Layout.ForceDirected(this.graph, 400.0, 400.0, 0.5);
    let that = this;

    this.renderer = new Renderer(this.layout,
      function clear() {
        that.clear();
      },
      function drawEdge(edge, p1, p2) {
        that.drawEdge(edge, p1, p2)
      },
      function drawNode(node, p) {
        that.drawNode(node, p);
      }
    );

    this.renderer.start();
  }

  clear() {

  }

  drawEdge(edge: any, p1: any, p2: any) {
    console.log(edge, p1, p2);
  }

  drawNode(node: any, p: any) {
    console.log(node, p);
  }
}
