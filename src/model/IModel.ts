export interface IModel {
  id: string;
  name: string;
  relatedNodes?: IModel[];
  nearNode?: IModel[];
}

export interface IEventModel extends IModel {
  relatedNodes: IEventModel[];
  nearNode: IEventModel[];
  addRelatedChild(model: IModel);
  removeRelatedChild(model: IModel);
  updateRelatedChild(model: IModel);
}
