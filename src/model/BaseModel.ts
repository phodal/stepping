import {sha256} from "../lib/hash";

export interface Model {
  all: object,
  create: object,
  update: object,
  readById: object,
  deleteById: object,
}

export interface modelInterface {
  id?: string;
  name?: string;
  child?: string;
  related?: string;
}

export default class BaseModel implements Model {
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
