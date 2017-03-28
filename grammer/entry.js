var Diagram = require('./Diagram');
var esDsl = require('./es-dsl');

Diagram.parse("domain: 订单子域\r\n   - aggregate: 聚合\r\n   - entity:实体\r\n   - entity:实体");
Diagram.getResult();

