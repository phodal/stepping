import {SVGGenerator} from '../render/SVGGenerator';
import {EventPositionEntity} from '../entity/EventPositionEntity';
import {EventEntity} from '../entity/EventEntity';

export class SVGConvert {
  svgGenerator: SVGGenerator;

  constructor() {
    this.svgGenerator = new SVGGenerator();
  }

  buildNodes(nodes) {
    let item = this.buildNode(nodes[0]);
    return item;
  }

  parse(input: any) {
    let result = this.buildNodes(input);
    result = this.svgGenerator.buildBody(result);
    return result;
  }

  private buildNode(node: any) {
    let result = '';
    for (let index in node.aggregates) {
      let aggregate = node.aggregates[index];

      result = result + this.buildAggregate(aggregate);
      if (aggregate.events) {
        result = result + this.buildNode(aggregate.events);
      }
    }

    return result;
  }

  private buildAggregate(node: any) {
    let aggregate = this.svgGenerator.buildAggregate(node);

    let eventResult = '';
    for(let index in node.events) {
      eventResult = this.buildEvent(node.events[index]);
    }

    aggregate = aggregate + eventResult;

    return aggregate;
  }

  private buildEvent(node: any) {
    let eventEntity = new EventEntity(node.name);
    let iPosition = {
      x: 0,
      y: 0
    };
    let eventPositionEntity = new EventPositionEntity(iPosition, eventEntity);
    return this.svgGenerator.buildNode(eventPositionEntity);
  }

  private buildCommand(node: any) {

  }
}
