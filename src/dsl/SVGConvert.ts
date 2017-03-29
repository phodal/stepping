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
    return this.buildNodes(input);
  }

  private buildNode(node: any) {
    let eventEntity = new EventEntity(node.name);
    let iPosition = {
      x: 0,
      y: 0
    };
    let eventPositionEntity = new EventPositionEntity(iPosition, eventEntity);
    return this.svgGenerator.buildNode(eventPositionEntity);
  }

  private buildAggregate(node: any) {

  }

  private buildEvent(node: any) {

  }

  private buildCommand(node: any) {

  }
}
