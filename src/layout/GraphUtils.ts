import {AggregateEntity} from '../entity/AggregateEntity';
import {EventEntity} from '../entity/EventEntity';
import {CommandEntity} from '../entity/CommandEntity';

export let GraphUtils = {
  dslToNodes(dsl, nodeType): object {
    if (dsl.type !== nodeType) {
      return {};
    }

    let result: object = {};

    if (nodeType === 'domain') {
      let type = 'aggregates';
      result = this.toAggregateModelNode(dsl[type]);
    } else {
      result = {
        'nodes': [],
        'edges': []
      };
    }

    return result;
  },

  toAggregateModelNode(aggregate) {
    let result = {
      'nodes': [{}],
      'edges': [{}]
    };

    let nodes: object[] = [];
    let edges: object[] = [];
    let firstNode = {};

    for (let index in aggregate) {
      let currentNode = new AggregateEntity(aggregate[index].name);
      currentNode.type = aggregate[index].type;
      currentNode.data = {
        events: aggregate[index].events,
        commands: aggregate[index].commands
      };

      nodes.push(currentNode);

      if (parseInt(index, 10) === 0) {
        firstNode = currentNode;
      } else {
        edges.push([firstNode, currentNode]);
      }
    }

    if (aggregate.length === 1) {
      edges.push([firstNode, firstNode]);
    }

    result.nodes = nodes;
    result.edges = edges;
    return result;
  },

  toEventModelNode(rootNode, node) {
    let result = {
      'nodes': [{}],
      'edges': [{}]
    };

    let nodes: object[] = [];
    let edges: object[] = [];

    nodes.push(rootNode);

    for (let index in node['events']) {
      let name = node['events'][index].name;
      let currentNode = new EventEntity(name);
      currentNode.type = 'event';

      nodes.push(currentNode);
      edges.push([rootNode, currentNode]);
    }

    for (let index in node['commands']) {
      let name = node['commands'][index].name;
      let currentNode = new CommandEntity(name);
      currentNode.type = 'command';

      nodes.push(currentNode);
      edges.push([rootNode, currentNode]);
    }

    result.nodes = nodes;
    result.edges = edges;
    return result;
  }
};
