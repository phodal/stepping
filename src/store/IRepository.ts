// Inspired by https://github.com/yaakaito/typescript-dddbase
import {Entity} from "../entity/Entity";

export interface IRepository<E extends Entity<any>> {
  resolve(identity: string): any;

  store(entity: E): E;

  storeList(entityList: E[]): E[];

  deleteByEntityId(entity: E): IRepository<E>;
}
