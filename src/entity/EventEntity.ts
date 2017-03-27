import {Entity} from "./Entity";
import {IEventModel, IModel} from "../model/IModel";
import {StringIdentity} from "./Identity";

export class EventEntity extends Entity<StringIdentity> implements IEventModel {
  name: string;
  relatedNodes: IEventModel[];
  nearNode: IEventModel[];

  constructor(name: any) {
    super(name);
    this.name = name;
    this.relatedNodes = [];
    this.nearNode = [];
  }

  hasRelatedChild() {
    return this.relatedNodes && this.relatedNodes.length > 0;
  }

  addRelatedChild(model: IEventModel) {
    this.relatedNodes.push(model);
  }

  removeRelatedChild(relatedChild: IEventModel) {
    for (let childIndex in this.relatedNodes) {
      if (this.relatedNodes[childIndex]['id'] === relatedChild['id']) {
        this.relatedNodes.splice(parseInt(childIndex), 1)
      }
    }
  }

  updateRelatedChild(model: IModel) {

  }
}
