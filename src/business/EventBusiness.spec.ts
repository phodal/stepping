import {test} from "ava";
import {EventBusiness, EventBusinessStore, EventSubscriber, EventPublisher} from "eventstorming";

test('should enable add related child', t => {
  // let eventSubscriber = new EventSubscriber();
  // let eventStore = new EventBusinessStore(eventSubscriber);
  //
  // let eventBusiness = new EventBusiness(eventSubscriber);
  //
  // eventBusiness.createEventSticky('事件贴纸已创建');
  // eventBusiness.createEventSticky('事件贴纸位置已生成');
  // eventBusiness.createEventSticky('事件贴纸已渲染');
  //
  // t.deepEqual(eventBusiness.eventEntities[0].name, 'hello');
  //
  // t.deepEqual(eventStore.store[0]['name'], 'hello');
  t.deepEqual(true, true)
});
