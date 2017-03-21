import { EventPublisher, EventModel } from 'eventstorming'

function log (str: string) {
  console.log(str)
}

log('Output:');

let eventModel = new EventModel;
let event = eventModel.create({
  name: "event should be created"
});

let eventRead = eventModel.read(event['id']);

console.log(eventRead)
