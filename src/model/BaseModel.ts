export interface Model {
  create: object,
  read: object,
  update: object,
  delete: object,
}

export default class BaseModel implements Model {
  constructor() {

  }

  model: any = [];

  create(model) {
    return {
      name: 'hello'
    }
  }

  update(id) {

  }

  read(id) {
    return {
      name: 'hello'
    }
  }

  delete(id) {

  }
}
