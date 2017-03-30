import {IESEdge} from './interface/IESEdge';
export class ESEdge implements IESEdge {
  private id: any;
  private source: any;
  private target: any;
  private data: {};


  constructor(id, source, target, data) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.data = (data !== undefined) ? data : {};
  }
}
