import {Entity} from './Entity';
import {StringIdentity} from './Identity';
import {IPosition} from '../render/interface/IPosition';

export class DomainEntity extends Entity<StringIdentity> {
  private _position: IPosition;
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
}
