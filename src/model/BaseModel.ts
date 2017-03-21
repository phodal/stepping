import {sha256} from "../lib/hash";
import {IModel} from "./IModel";
import {modelInterface} from "../../build/main/model/BaseModel";

export default class BaseModel implements IModel {
  constructor() {

  }

  baseModels: any = [];

  create(model) {
    let id = sha256(model.name);
    model.id = id;
    this.baseModels.push(model);
    return model
  }

  update(model: modelInterface) {
    let result: modelInterface = {id: '', name: ''};
    for (let index in this.baseModels) {
      if (this.baseModels[index]['id'] === model['id']) {
        result = model
      }
    }
    return result;
  }

  readById(id): modelInterface {
    let result: modelInterface = {id: '', name: ''};
    for (let index in this.baseModels) {
      if (this.baseModels[index]['id'] === id) {
        result = this.baseModels[index];
      }
    }
    return result;
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
