export interface IModel {
  all: object,
  create: object,
  update: object,
  readById: object,
  deleteById: object,
}

export interface modelInterface {
  id: string;
  name: string;
  child?: modelInterface;
  related?: modelInterface;
}
