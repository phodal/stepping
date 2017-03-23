import {IEventPositionEntity} from "./IEventPositionEntity";
import {EventEntity} from "./EventEntity";
import {IPosition} from "../render/IPosition";

export class EventPositionEntity<pos extends IPosition, entity extends EventEntity> implements IEventPositionEntity<pos, entity> {
  constructor() {

  }
}
