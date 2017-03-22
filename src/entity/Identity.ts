// Inspired by https://github.com/yaakaito/typescript-dddbase

export class Identity<T> {

  constructor(private value: T) { }

  public getValue(): T {
    return this.value;
  }

  public equals(that: Identity<T>): boolean {
    if (that == null) {
      return false;
    }
    if (this == that) {
      return true;
    }

    return this.value === that.getValue();
  }
}

export class NumberIdentity extends Identity<number> {
  constructor(value: number) {
    super(value);
  }
}
