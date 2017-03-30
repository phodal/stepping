import {IESEdge} from './interface/IESEdge';
export class ESEdge implements IESEdge {
  id: any;
  source: any;
  target: any;
  data: {};

  constructor(id, source, target, data) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.data = (data !== undefined) ? data : {};
  }
}
