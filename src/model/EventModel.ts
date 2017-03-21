import {BaseModel} from "./BaseModel";
import {modelInterface} from "./IModel";

export class EventModel extends BaseModel {
  relatedChild: modelInterface[] = [];

  addRelatedChild(model: modelInterface) {
    this.relatedChild.push(model);
  }

  getRelatedChildById(id: string) {
    let result: modelInterface = {id: '', name: ''};
    for (let index in this.relatedChild) {
      if (this.relatedChild[index]['id'] === id) {
        result = this.relatedChild[index];
      }
    }
    return result;
  }
}
