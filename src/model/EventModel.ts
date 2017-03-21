import { BaseModel } from "./BaseModel";

type Event = {
  id: string,
  name: string,
  dependence: {
    id: string,
    type: string
  },
}

enum EventType {

}

export class EventModel extends BaseModel {
  addRelatedChild() {

  }
}
