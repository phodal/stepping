import {EventEntity} from "../entity/EventEntity";
export default class Renderer {
  createEntity(node: EventEntity, nodes: EventEntity[]) {

    this.calculatePositions(nodes);
  }

  updateEntity(node: EventEntity, nodes: EventEntity[]) {

    this.calculatePositions(nodes);
  }

  calculatePositions(nodes: EventEntity[]) {

  }
  
  build() {

  }
}
