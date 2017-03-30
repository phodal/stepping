import {IESNode} from './interface/IESNode';
export class ESNode implements IESNode {
  id: number;
  data: {};

  constructor(id: number, data: {}) {
    this.id = id;
    this.data = data;
  }
}
