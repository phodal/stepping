import BaseModel from "./BaseModel";

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

class EventModel extends BaseModel {

}
