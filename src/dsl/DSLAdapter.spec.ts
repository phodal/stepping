import {test} from 'ava';
import {
  DSLAdapter
} from 'stepping';

test('should return current domain', t => {
  let dsl = new DSLAdapter();
  let result = dsl.parseDSL('domain:订单子域');

  t.deepEqual(JSON.stringify(result), '[{\"name\":\"订单子域\",\"type\":\"domain\",\"aggregates\":[]}]');
});

test('should return current domain with aggregate', t => {
  let dsl = new DSLAdapter();
  let result = dsl.parseDSL('domain:订单子域 \r\n aggregate:订单');

  t.deepEqual(JSON.stringify(result), '[{\"name\":\"订单子域 \",\"type\":\"domain\",\"aggregates\":[{\"name\":\"订单\",\"type\":\"aggregate\",\"events\":[],\"commands\":[]}]}]');
});
