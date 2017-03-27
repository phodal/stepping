export interface IModel {
  id: string;
  name: string;
  relatedNodes?: IModel[];
  nearNode?: IModel[];
}
