import {Springy, Graph, Renderer} from 'springy'

export class ForceLayoutAdapter {
  renderer: any;
  private graph: Springy.Graph;
  private layout: Springy.Layout.ForceDirected;

  constructor() {

  }

  draw(jsonNode) {
    this.graph = new Springy.Graph();
    this.graph.loadJSON(jsonNode);
    this.layout = new Springy.Layout.ForceDirected(this.graph, 400.0, 400.0, 0.5);
    let that = this;

    this.renderer = new Springy.Renderer(this.layout,
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

  }

  drawNode(node: any, p: any) {

  }
}
