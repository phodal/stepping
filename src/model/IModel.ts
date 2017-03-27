export interface IModel {
  id: string;
  name: string;
  relatedNodes?: IModel[];
  nearNode?: IModel[];
}

export interface eventModeInterface extends IModel {
  relatedNodes: eventModeInterface[];
  nearNode: eventModeInterface[];
  addRelatedChild(model: IModel);
  removeRelatedChild(model: IModel);
  updateRelatedChild(model: IModel);
}
