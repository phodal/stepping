import {Entity} from "./Entity";
import {eventModeInterface, modelInterface} from "../model/IModel";

export class EventEntity extends Entity<any> implements eventModeInterface {
  id: string;
  name: string;
  relatedNodes: modelInterface[];
  nearNode: modelInterface[];

  constructor(name: any) {
    super(name);
    this.id = this.getIdentity().getValue();
    this.name = name;
    this.relatedNodes = [];
    this.nearNode = [];
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
