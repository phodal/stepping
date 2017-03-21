// Inspired by https://github.com/yaakaito/typescript-dddbase
import {Identity} from "../model/Identity";
import {Entity} from "../entity/entity";

export interface IRepository<ID extends Identity<any>, E extends Entity<any>> {
  resolve(identity: ID): any;

  store(entity: E): E;

  storeList(entityList: E[]): E[];

  deleteByEntity(entity: E): IRepository<ID, E>;

  deleteByIdentity(identity: ID): IRepository<ID, E>;
}
