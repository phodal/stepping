// Inspired by https://github.com/yaakaito/typescript-dddbase
import {IRepository} from "./IRepository";
import {Identity} from "../entity/Identity";
import {Entity} from "../entity/Entity";

export interface ILocalStorageMapper<E extends Entity<any>> {
  stringify(entity: E): string;
}

export class LocalStorageRepository<ID extends Identity<any>, E extends Entity<any>> implements IRepository<E> {
  constructor(mapper: ILocalStorageMapper<E>) {
    this.stringify = mapper.stringify;
  }

  stringify: (entity: E) => string;

  resolve(identity: string) {
    let item = localStorage.getItem(identity);
    if (item) {
      let json = JSON.parse(item);
      if (json) {
        return json;
      }
    }
    return ''
  }

  store(entity: E): E {
    localStorage.setItem(entity.id, this.stringify(entity));
    return entity;
  }

  storeList(entityList: E[]): E[] {
    for (let i in entityList) {
      this.store(entityList[i]);
    }
    return entityList;
  }

  storeListInGroup(name: string, entityList: E[]): E[] {
    localStorage.setItem(name, JSON.stringify(entityList));
    return entityList
  }

  deleteByEntityId(entity: E): LocalStorageRepository<ID, E> {
    localStorage.removeItem(entity.id);
    return this;
  }
}
