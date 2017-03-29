import {test} from 'ava';
import {
  DSL
} from 'eventstorming';

test('should enable add related child', t => {
  let dsl = new DSL();
  let result = dsl.parseDSL('domain:订单子域')[0];

  t.deepEqual('订单子域', result.name);
});
