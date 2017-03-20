import BaseModel from "./BaseModel";

type Event = {
    id: string,
    name: string,
    dependence: {
        id: string,
        type: string
    },
}

class EventModel extends BaseModel {

}