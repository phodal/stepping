import {BaseModel} from "./BaseModel";
import {eventModeInterface, modelInterface} from "./IModel";
import {EventEntity} from "../entity/EventEntity";
import {LocalStorageRepository} from "../store/LocalStorageRepository";

export class EventModel extends BaseModel {
  private localStorageRepository;

  baseModels: eventModeInterface[];
  mapper = {
    stringify: (entity: EventEntity) => {
      return JSON.stringify(entity);
    }
  };

  constructor() {
    super();
    this.localStorageRepository = new LocalStorageRepository(this.mapper);
  }

  createStore(entity: modelInterface, store: modelInterface[]) {
    this.localStorageRepository.store(entity);
    this.localStorageRepository.storeListInGroup('event.store', store);
  }

  updateStore(entity: modelInterface, store: modelInterface[]) {
    this.localStorageRepository.store(entity);
    this.localStorageRepository.storeListInGroup('event.store', store);
  }

  getRelatedChildById(id: string) {
    let result: modelInterface = {id: '', name: ''};
    for (let index in this.baseModels) {
      if (this.baseModels[index]['id'] === id) {
        result = this.baseModels[index];
      }
    }

    return result;
  }
}
