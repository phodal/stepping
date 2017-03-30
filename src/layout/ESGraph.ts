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

import {ESNode} from './ESNode';
import {ESEdge} from './ESEdge';
export class ESGraph {
  nodeSet = {};
  nodes: any[] = [];
  edges: any = [];
  adjacency = {};

  nextNodeId: number = 0;
  nextEdgeId: number = 0;
  eventListeners: any[] = [];


  constructor() {

  }

  addNode(node: any) {
    if (!(node.id in this.nodeSet)) {
      this.nodes.push(node);
    }

    this.nodeSet[node.id] = node;

    this.notify();
    return node;
  };

  addNodes() {
    // accepts variable number of arguments, where each argument
    // is a string that becomes both node identifier and label
    for (let i = 0; i < arguments.length; i++) {
      let id = arguments[i].id;
      let name = arguments[i].name;
      let node = new ESNode(id, {label: name});
      this.addNode(node);
    }
  };

  addEdge(edge: any) {
    let exists = false;
    this.edges.forEach(function (e) {
      if (edge.id === e.id) {
        exists = true;
      }
    });

    if (!exists) {
      this.edges.push(edge);
    }

    if (!(edge.source.id in this.adjacency)) {
      this.adjacency[edge.source.id] = {};
    }
    if (!(edge.target.id in this.adjacency[edge.source.id])) {
      this.adjacency[edge.source.id][edge.target.id] = [];
    }

    exists = false;
    this.adjacency[edge.source.id][edge.target.id].forEach(function (e) {
      if (edge.id === e.id) {
        exists = true;
      }
    });

    if (!exists) {
      this.adjacency[edge.source.id][edge.target.id].push(edge);
    }

    this.notify();
    return edge;
  };

  addEdges() {
    // accepts variable number of arguments, where each argument
    // is a triple [nodeid1, nodeid2, attributes]
    for (let i = 0; i < arguments.length; i++) {
      let e = arguments[i];
      let node1 = this.nodeSet[e[0]];
      if (node1 == undefined) {
        throw new TypeError('invalid node name: ' + e[0]);
      }
      let node2 = this.nodeSet[e[1]];
      if (node2 == undefined) {
        throw new TypeError('invalid node name: ' + e[1]);
      }
      let attr = e[2];

      this.newEdge(node1, node2, attr);
    }
  };

  newNode(data) {
    let node = new ESNode(this.nextNodeId++, data);
    this.addNode(node);
    return node;
  };

  newEdge(source, target, data) {
    let edge = new ESEdge(this.nextEdgeId++, source, target, data);
    this.addEdge(edge);
    return edge;
  };

  getEdges(node1, node2) {
    if (node1.id in this.adjacency
      && node2.id in this.adjacency[node1.id]) {
      return this.adjacency[node1.id][node2.id];
    }

    return [];
  };

  removeNode(node) {
    if (node.id in this.nodeSet) {
      delete this.nodeSet[node.id];
    }

    for (let i = this.nodes.length - 1; i >= 0; i--) {
      if (this.nodes[i].id === node.id) {
        this.nodes.splice(i, 1);
      }
    }

    this.detachNode(node);
  };

  detachNode(node) {
    let tmpEdges = this.edges.slice();
    tmpEdges.forEach(function (e) {
      if (e.source.id === node.id || e.target.id === node.id) {
        this.removeEdge(e);
      }
    }, this);

    this.notify();
  };

  removeEdge(edge) {
    for (let i = this.edges.length - 1; i >= 0; i--) {
      if (this.edges[i].id === edge.id) {
        this.edges.splice(i, 1);
      }
    }

    for (let x in this.adjacency) {
      for (let y in this.adjacency[x]) {
        let edges = this.adjacency[x][y];

        for (let j = edges.length - 1; j >= 0; j--) {
          if (this.adjacency[x][y][j].id === edge.id) {
            this.adjacency[x][y].splice(j, 1);
          }
        }

        // Clean up empty edge arrays
        if (this.adjacency[x][y].length == 0) {
          delete this.adjacency[x][y];
        }
      }

      // Clean up empty objects
      if (this.isEmpty(this.adjacency[x])) {
        delete this.adjacency[x];
      }
    }

    this.notify();
  };

  merge(data) {
    let nodes: any[] = [];
    data.nodes.forEach(function (n) {
      nodes.push(this.addNode(new ESNode(n.id, n.data)));
    }, this);

    data.edges.forEach(function (e) {
      let from = nodes[e.from];
      let to = nodes[e.to];

      //id?
      let id;
      id = (e.directed)
        ? (id = e.type + '-' + from.id + '-' + to.id)
        : (from.id < to.id) // normalise id for non-directed edges
          ? e.type + '-' + from.id + '-' + to.id
          : e.type + '-' + to.id + '-' + from.id;

      let edge = this.addEdge(new ESEdge(id, from, to, e.data));
      edge.data.type = e.type;
    }, this);
  };

  filterNodes(fn) {
    let tmpNodes = this.nodes.slice();
    tmpNodes.forEach(function (n) {
      if (!fn(n)) {
        this.removeNode(n);
      }
    }, this);
  };

  filterEdges(fn) {
    let tmpEdges = this.edges.slice();
    tmpEdges.forEach(function (e) {
      if (!fn(e)) {
        this.removeEdge(e);
      }
    }, this);
  };

  private isEmpty(obj: any) {
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        return false;
      }
    }
    return true;
  }

  addGraphListener(obj) {
    this.eventListeners.push(obj);
  };

  notify() {
    this.eventListeners.forEach(function (obj) {
      obj.graphChanged();
    });
  }

  loadJSON = function(json: any) {
    if ('nodes' in json || 'edges' in json) {
      this.addNodes.apply(this, json['nodes']);
      // this.addEdges.apply(this, json['edges']);
    }
  }

}
