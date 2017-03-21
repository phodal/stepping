
import {Entity} from "./Entity";
import {eventModeInterface, modelInterface} from "../model/IModel";

class EventEntity extends Entity<any> implements eventModeInterface {
  id: string;
  name: string;
  relatedChild: modelInterface[];
  nearNode: modelInterface;
  constructor(identity: any) {
    super(identity);
  }

  addRelatedChild(model: modelInterface) {
    this.relatedChild.push(model);
  }

  removeRelatedChild(id: string) {

  }

  updateRelatedChild(model: modelInterface) {

  }
}
