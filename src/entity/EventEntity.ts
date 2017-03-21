import {Entity} from "./Entity";
import {eventModeInterface, modelInterface} from "../model/IModel";

export class EventEntity extends Entity<any> implements eventModeInterface {
  id: string;
  name: string;
  relatedChild: modelInterface[];
  nearNode: modelInterface[];

  constructor(name: any) {
    super(name);
    this.name = name;

    this.relatedChild = [];
    this.nearNode = [];
  }

  addRelatedChild(model: modelInterface) {
    this.relatedChild.push(model);
  }

  removeRelatedChild(id: string) {

  }

  updateRelatedChild(model: modelInterface) {

  }
}
