import {IModel} from "./IModel";

export interface IEventModel extends IModel {
  relatedNodes: IEventModel[];
  nearNode: IEventModel[];
  addRelatedChild(model: IModel);
  removeRelatedChild(model: IModel);
  updateRelatedChild(model: IModel);
}
