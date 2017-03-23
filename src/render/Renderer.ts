import {EventEntity} from "../entity/EventEntity";
import {IPosition} from "./IPosition";
import {EventPositionEntity} from "../entity/EventPositionEntity";
import {SVGGenerator} from "./SVGGenerator";

export class Renderer {
  stickyEntities: EventPositionEntity[] = [];
  private _svgGenerator: SVGGenerator;

  constructor(svgGenerator: SVGGenerator) {
    this._svgGenerator = svgGenerator;
  }

  createEntity(node: EventEntity, nodes: EventEntity[]) {
    let position: IPosition = this.calculatePosition(nodes);
    let newEntity = new EventPositionEntity(position, node);

    this.stickyEntities.push(newEntity);

    return newEntity;
  }

  updateEntity(node: EventEntity, nodes: EventEntity[]) {
    this.calculatePositions(nodes);
  }

  calculatePositions(nodes: EventEntity[]): IPosition[] {
    let positions: IPosition[] = [];

    return positions;
  }

  private calculatePosition(nodes: EventEntity[]): IPosition {
    let position: IPosition = {
      x: 0,
      y: 0
    };

    return position
  }

  render(): string {
    let result = this._svgGenerator.build(this.stickyEntities);
    return result;
  }
}
