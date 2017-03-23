import {Entity} from "./Entity";
import {eventModeInterface, modelInterface} from "../model/IModel";
import {StringIdentity} from "./Identity";

export class EventEntity extends Entity<StringIdentity> implements eventModeInterface {
  name: string;
  relatedNodes: modelInterface[];
  nearNode: modelInterface[];

  constructor(name: any) {
    super(name);
    this.name = name;
    this.relatedNodes = [];
    this.nearNode = [];
  }

  hasRelatedChild(entity: EventEntity) {
    return entity.relatedNodes.length > 1;
  }

  addRelatedChild(model: modelInterface) {
    this.relatedNodes.push(model);
  }

  removeRelatedChild(relatedChild: modelInterface) {
    for (let childIndex in this.relatedNodes) {
      if (this.relatedNodes[childIndex]['id'] === relatedChild['id']) {
        this.relatedNodes.splice(parseInt(childIndex), 1)
      }
    }
  }

  updateRelatedChild(model: modelInterface) {

  }
}
