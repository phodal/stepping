// Inspired by https://github.com/yaakaito/typescript-dddbase

import {Identity} from "./Identity";
import {sha256} from "../lib/hash";

export class Entity<ID extends Identity<any>> {
  private identity;

  constructor(message) {
    this.identity = new Identity(sha256(message))
  }

  public getIdentity(): ID {
    return this.identity;
  }

  public equals(that: Entity<ID>): boolean {
    if (that == null) {
      return false;
    }
    if (this == that) {
      return true;
    }
    return this.identity.equals(that.getIdentity());
  }

}
