import {Entity} from "./Entity";
import {eventModeInterface, IModel} from "../model/IModel";
import {StringIdentity} from "./Identity";

export class EventEntity extends Entity<StringIdentity> implements eventModeInterface {
  name: string;
  relatedNodes: eventModeInterface[];
  nearNode: eventModeInterface[];

  constructor(name: any) {
    super(name);
    this.name = name;
    this.relatedNodes = [];
    this.nearNode = [];
  }

  hasRelatedChild() {
    return this.relatedNodes && this.relatedNodes.length > 0;
  }

  addRelatedChild(model: eventModeInterface) {
    this.relatedNodes.push(model);
  }

  removeRelatedChild(relatedChild: eventModeInterface) {
    for (let childIndex in this.relatedNodes) {
      if (this.relatedNodes[childIndex]['id'] === relatedChild['id']) {
        this.relatedNodes.splice(parseInt(childIndex), 1)
      }
    }
  }

  updateRelatedChild(model: IModel) {

  }
}
