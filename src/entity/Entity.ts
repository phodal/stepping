// Inspired by https://github.com/yaakaito/typescript-dddbase
import {Identity} from "./Identity";
import {sha256} from "../lib/hash";

export class Entity<ID extends Identity<any>> {
  public id;

  constructor(name) {
    this.id = new Identity(sha256(name)).getValue();
  }

  public getIdentity(): ID {
    return this.id;
  }

  public equals(that: Entity<ID>): boolean {
    if (that == null) {
      return false;
    }
    if (this == that) {
      return true;
    }
    return this.id.equals(that.getIdentity());
  }

}
