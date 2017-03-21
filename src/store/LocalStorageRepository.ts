// Inspired by https://github.com/yaakaito/typescript-dddbase
import {IRepository} from "./IRepository";
import {Identity} from "../entity/Identity";
import {Entity} from "../entity/Entity";

export interface ILocalStorageMapper<E extends Entity<any>> {
  parse(json: Object): E;
  stringify(entity: E): string;
}

export class LocalStorageRepository<ID extends Identity<any>, E extends Entity<any>> implements IRepository<ID ,E> {
  constructor(mapper: ILocalStorageMapper<E>) {
    this.parse = mapper.parse;
    this.stringify = mapper.stringify;
  }

  parse: (json: Object) => E;
  stringify: (entity: E) => string;

  resolve(identity: ID) {
    let item = localStorage.getItem(identity.getValue());
    if (item) {
      let json = JSON.parse(item);
      if (json) {
        return this.parse(json);
      }
    }
    return ''
  }

  store(entity: E): E {
    localStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
    return entity;
  }

  storeList(entityList: E[]): E[] {
    for (let i in entityList) {
      this.store(entityList[i]);
    }
    return entityList;
  }

  deleteByEntity(entity: E): LocalStorageRepository<ID, E> {
    this.deleteByIdentity(entity.getIdentity());
    return this;
  }

  deleteByIdentity(identity: ID): LocalStorageRepository<ID, E> {
    localStorage.removeItem(identity.getValue());
    return this;
  }
}
