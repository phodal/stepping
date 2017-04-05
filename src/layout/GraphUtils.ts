export let GraphUtils = {
  dslToNodes(dsl, nodeType): object {
    if (dsl.type !== nodeType) {
      return {};
    }

    let result: object = {};

    if (nodeType === 'domain') {
      let type = 'aggregates';
      let rootNodeName = dsl.name;
      result = this.domainChildToNode(rootNodeName, dsl[type]);
    } else if (nodeType === 'aggregate') {
      let rootNodeName = dsl.name;
      result = this.aggregateChildToNode(rootNodeName, dsl);
    } else {
      result = {
        "nodes": [],
        "edges": []
      };
    }

    return result;
  },

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
  },

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
};

