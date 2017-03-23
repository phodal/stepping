import {EventEntity} from "./EventEntity";
import {IPosition} from "../render/IPosition";

export class EventPositionEntity {
  private pos: IPosition;
  private entity: EventEntity;

  constructor(pos: IPosition, entity: EventEntity) {
    this.pos = pos;
    this.entity = entity;
  }
}
