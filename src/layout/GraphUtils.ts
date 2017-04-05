import {AggregateEntity} from '../entity/AggregateEntity';
import {DomainEntity} from '../entity/DomainEntity';

export let GraphUtils = {
  dslToNodes(dsl, nodeType): object {
    if (dsl.type !== nodeType) {
      return {};
    }

    let result: object = {};

    if (nodeType === 'domain') {
      let type = 'aggregates';
      let rootNodeName = dsl.name;
      result = this.toAggregateModelNode(rootNodeName, dsl[type]);
    } else {
      result = {
        'nodes': [],
        'edges': []
      };
    }

    return result;
  },

  domainChildToNode(rootNodeName, aggregate) {
    let result = {
      'nodes': [{}],
      'edges': [{}]
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

  toAggregateModelNode(rootNodeName, aggregate) {
    let result = {
      'nodes': [{}],
      'edges': [{}]
    };

    let nodes: object[] = [];
    let edges: object[] = [];

    let rootNode = new DomainEntity(rootNodeName);
    nodes.push(rootNode);

    for (let index in aggregate) {
      let currentNode = new AggregateEntity(aggregate[index].name);
      nodes.push(currentNode);
      edges.push([rootNode, currentNode]);
    }

    result.nodes = nodes;
    result.edges = edges;
    return result;
  }
};

