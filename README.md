# Stepping - write a dsl, run on any framework.

Stepping a tools for code design, event storming, domain model generate. 
 
Features:

 - create ``architecture`` image by a DSL
 - create Event Storming model by DSL
 - generate Django & Angular 2 code by DSL
 - create API & mock API by DSL

Usage
---

1.Install

```
yarn global add stepping
```

or 

```
npm install -g 
```

2.Run

```
stepping FILE_NAME
```

example ``stepping`` file: ``ddd.ing``

```
domain: 库存子域
  aggregate: 库存
    event: 库存已增加
    event: 库存已恢复
    event: 库存已扣减
    event: 库存已锁定
    command: 编辑库存

  aggregate: 商品
    event: 商品已创建
    command: 添加商品

domain: 订单子域
  aggregate: 订单
    event: 订单已创建
    event: 订单已支付
    event: 订单已撤销
    event: 订单已投拆
    command: 提交订单
    command: 提交投诉
```

Result:

![DDD Example](./graphics/example.png)

create demo app with Django & Angular 2 

```
...

aggregate-detail: 商品
  model: product
    field: 
      id: int
      name: string
      number: string
      manufacturers: string
    getter:
      name
    setter:
      name
    method:                  
      - get_name_by_id
      - get_manufacturer_by_id

  display:
    router: id
    field:
      name: string
      number: string                
```

Resources
---

![Event Storming Example](./graphics/event-storming.png)

领域事件

![Architecture](./graphics/domain-event.png)

From: "Implementing Domain-Driven Design"

Book: [Handbook of Graph Drawing and Visualization](https://cs.brown.edu/~rt/gdhandbook/)

Drawing algorithms: Force-directed drawing algorithms

Thanks
---

TypeScript DDD Base: [https://github.com/yaakaito/typescript-dddbase](https://github.com/yaakaito/typescript-dddbase)

Springy: [https://github.com/dhotson/springy](https://github.com/dhotson/springy)

Jison: [https://github.com/zaach/jison](https://github.com/zaach/jison)

js-sequence-diagrams: [https://bramp.github.io/js-sequence-diagrams/](https://bramp.github.io/js-sequence-diagrams/)

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2017 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.

[待我代码编成，娶你为妻可好](http://www.xuntayizhan.com/blog/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)
