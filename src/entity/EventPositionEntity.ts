import {EventEntity} from "./EventEntity";
import {IPosition} from "../render/IPosition";
import {modelInterface} from "../model/IModel";


export interface IEventPosition extends modelInterface {
  pos?: IPosition
}

export class EventPositionEntity extends EventEntity {
  private _pos: IPosition;
  private _entity: IEventPosition;
  private subEntity: modelInterface[];
  private nearEntity: modelInterface[];

  constructor(pos: IPosition, entity: modelInterface) {
    super(entity.id);

    this._entity = entity;
    this._pos = pos;

    this.subEntity = entity.relatedNodes || [];
    this.nearEntity = entity.nearNode || [];
    delete this._entity['relatedNodes'];
    delete this._entity['nearNode'];
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
