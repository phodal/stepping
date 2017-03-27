import {BaseModel} from "./BaseModel";
import {IModel} from "./IModel";
import {IEventModel} from "./IEventModel";
import {EventEntity} from "../entity/EventEntity";
import {LocalStorageRepository} from "../store/LocalStorageRepository";

export class EventModel extends BaseModel {
  baseModels: IEventModel[];
  mapper = {
    stringify: (entity: EventEntity) => {
      return JSON.stringify(entity);
    }
  };
  private localStorageRepository;

  constructor() {
    super();
    this.localStorageRepository = new LocalStorageRepository(this.mapper);
  }

  createStore(entity: IModel, store: IModel[]) {
    this.localStorageRepository.store(entity);
    this.localStorageRepository.storeListInGroup('event.store', store);
  }

  updateStore(entity: IModel, store: IModel[]) {
    this.localStorageRepository.store(entity);
    this.localStorageRepository.storeListInGroup('event.store', store);
  }

  getRelatedChildById(id: string) {
    let result: IModel = {id: '', name: ''};
    for (let index in this.baseModels) {
      if (this.baseModels[index]['id'] === id) {
        result = this.baseModels[index];
      }
    }

    return result;
  }
}
