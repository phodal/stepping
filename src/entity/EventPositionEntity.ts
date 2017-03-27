import {EventEntity} from "./EventEntity";
import {IPosition} from "../render/IPosition";
import {IModel} from "../model/IModel";
import {IEventModel} from "../model/IEventModel";

export interface IEventPosition extends IModel {
  pos?: IPosition
}

export class EventPositionEntity extends EventEntity {
  subEntity: EventPositionEntity[] = [];
  nearEntity: EventPositionEntity[] = [];

  private _pos: IPosition;
  private _entity: IEventPosition;

  constructor(pos: IPosition, entity: IEventModel) {
    super(entity.id);

    this._entity = entity;
    this._pos = pos;

    this.relatedNodes = entity.relatedNodes;
    this.nearNode = entity.nearNode;

    this.subEntity = [];
    this.nearEntity = [];
  }

  get entity(): IEventPosition {
    return this._entity;
  }

  set entity(value: IEventPosition) {
    this._entity = value;
  }

  get pos(): IPosition {
    return this._pos;
  }

  set pos(value: IPosition) {
    this._pos = value;
  }
}
