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

import {Layout} from 'springy'

export class ESRenderer {
  layout: Layout.ForceDirected;
  clear: any;
  drawEdge: any;
  drawNode: any;
  onRenderStart: any;
  onRenderStop: any;

  constructor(layout, clear, drawEdge, drawNode, onRenderStop?, onRenderStart?) {
    this.layout = layout;
    this.clear = clear;
    this.drawEdge = drawEdge;
    this.drawNode = drawNode;
    this.onRenderStop = onRenderStop;
    this.onRenderStart = onRenderStart;

    this.layout.graph.addGraphListener(this);
  }

  graphChanged() {
    this.start();
  };

  start() {
    let that = this;
    this.layout.start(function render() {
      that.clear();

      that.layout.eachEdge(function (edge, spring) {
        that.drawEdge(edge, spring.point1.p, spring.point2.p);
      });

      that.layout.eachNode(function (node, point) {
        that.drawNode(node, point.p);
      });
    }, this.onRenderStop, this.onRenderStart);
  };

  stop() {
    this.layout.stop();
  };
}
