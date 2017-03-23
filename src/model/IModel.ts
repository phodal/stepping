export interface IModel {
  all: object,
  create: object,
  readById: object,
  deleteById: object,
}

export interface modelInterface {
  id: string;
  name: string;
  relatedNodes?: modelInterface[];
  nearNode?: modelInterface[];
}

export interface eventModeInterface extends modelInterface {
  relatedNodes: eventModeInterface[];
  nearNode: eventModeInterface[];
  addRelatedChild(model: modelInterface);
  removeRelatedChild(model: modelInterface);
  updateRelatedChild(model: modelInterface);
}
