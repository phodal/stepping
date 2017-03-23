import {EventEntity} from "../entity/EventEntity";
import {IPosition} from "./IPosition";
import {EventPositionEntity} from "../entity/EventPositionEntity";

export class Renderer {
  constructor() {

  }

  createEntity(node: EventEntity, nodes: EventEntity[]) {
    let position: IPosition = this.calculatePosition(nodes);
    let newEntity = new EventPositionEntity(position, node);

    return newEntity;
  }

  updateEntity(node: EventEntity, nodes: EventEntity[]) {
    this.calculatePositions(nodes);
  }

  calculatePositions(nodes: EventEntity[]): IPosition[] {
    let positions: IPosition[] = [];

    return positions;
  }

  build() {

  }

  private calculatePosition(nodes: EventEntity[]): IPosition {
    let position: IPosition = {
      x: 0,
      y: 0
    };

    return position
  }
}
