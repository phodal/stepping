/**
 * Springy v2.7.1
 *
 * Copyright (c) 2010-2013 Dennis Hotson
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import {Layout, Renderer} from 'springy'
import {ESGraph} from '../render/ESGraph';

export class ForceLayoutAdapter {
  renderer: any;
  nodeIndex: number;
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
