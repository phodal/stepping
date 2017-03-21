import {BaseModel} from "./BaseModel";
import {modelInterface, eventModeInterface} from "./IModel";

export class EventModel extends BaseModel {
  baseModels: eventModeInterface[];

  getRelatedChildById(id: string) {
    let result: modelInterface = {id: '', name: ''};
    for (let index in this.baseModels) {
      if (this.baseModels[index]['id'] === id) {
        result = this.baseModels[index];
      }
    }

    return result;
  }
}
