import {EventEntity} from "./EventEntity";
import {IPosition} from "../render/IPosition";
import {StringIdentity} from "./Identity";
import {Entity} from "./Entity";
import {modelInterface} from "../model/IModel";


export interface IEventPosition extends modelInterface {
  pos?: IPosition
}

export class EventPositionEntity extends Entity<StringIdentity> {
  private entity: IEventPosition;
  private subEntity: modelInterface[];
  private nearEntity: modelInterface[];

  constructor(pos: IPosition, entity: modelInterface) {
    super(entity.id);

    this.entity = entity;
    this.entity.pos = pos;

    this.subEntity = entity.relatedNodes || [];
    this.nearEntity = entity.nearNode || [];
    delete this.entity['relatedNodes'];
    delete this.entity['nearNode'];
  }
}
