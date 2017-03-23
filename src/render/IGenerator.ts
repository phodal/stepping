import {EventPositionEntity} from "../entity/EventPositionEntity";

export interface IGenerator {
  build(entities: EventPositionEntity[]) : any
}
