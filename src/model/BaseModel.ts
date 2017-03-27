import {IModel} from "./IModel";

export class BaseModel implements IModel {
  baseModels: any = [];

  constructor() {

  }

  create(model) {
    this.baseModels.push(model);
    return model
  }

  readById(id): any {
    for (let index in this.baseModels) {
      if (this.baseModels[index]['id'] === id) {
        return this.baseModels[index];
      }
    }
    return null;
  }

  deleteById(id) {
    for (let index in this.baseModels) {
      if (this.baseModels[index]['id'] === id) {
        this.baseModels.splice(index, 1);
      }
    }
    return;
  }

  all() {
    return this.baseModels;
  }
}
