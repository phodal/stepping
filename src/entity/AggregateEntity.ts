import {Entity} from './Entity';
import {StringIdentity} from './Identity';
import {IPosition} from '../render/interface/IPosition';

export class AggregateEntity extends Entity<StringIdentity> {
  private _position: IPosition;
  private _type: string;
  name: string;

  constructor(name: any) {
    super(name);
    this.name = name;
  }

  get position(): IPosition {
    return this._position;
  }

  set position(value: IPosition) {
    this._position = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
