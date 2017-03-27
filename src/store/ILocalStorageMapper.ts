import {Entity} from '../entity/Entity';

export interface ILocalStorageMapper<E extends Entity<any>> {
  stringify(entity: E): string;
}
