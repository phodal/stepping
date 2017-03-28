function Diagram() {

}

Diagram.data = [];
Diagram.currentDomain = {};
Diagram.currentLevel = undefined;
Diagram.lastType = {
  key: '',
  value: []
};

Diagram.TYPE = {
  CHILD: 'ADD',
};

Diagram.TYPE_TO_LEVEL = {
  'domain': 1,
  'aggregate': 2,
  'entity': 3,
  'model': 4,
  'event': 5,
  'command': 6,
};

Diagram.LEVEL_MAP = [
  '',
  'domain',
  'aggregate',
  'entity',
  'model',
  'event',
  'command',
];

Diagram.currentLevel = function (type) {
  return Diagram.TYPE_TO_LEVEL[type];
};

Diagram.isSubLevel = function (type1, type2) {
  return Diagram.TYPE_TO_LEVEL[type1] < Diagram.TYPE_TO_LEVEL[type2];
};

Diagram.isSameLevel = function (type1, type2) {
  return Diagram.TYPE_TO_LEVEL[type1] === Diagram.TYPE_TO_LEVEL[type2];
};

Diagram.getParentLevel = function (type1) {
  return Diagram.LEVEL_MAP[Diagram.TYPE_TO_LEVEL[type1] - 1];
};

Diagram.store = function (actor, type, value) {
  let items = {};
  items[type + ''] = value;

  let isSubLevel = Diagram.isSubLevel(Diagram.lastType['key'], type);
  let isSameLevel = Diagram.isSameLevel(Diagram.lastType['key'], type);
  let parentLevel = Diagram.getParentLevel(type);

  if(Diagram.currentLevel === undefined) {
    
  }

  console.log(Diagram.lastType['key'], type);
  console.log(isSubLevel, isSameLevel);

  if (isSubLevel) {
    Diagram.lastType[type + ''] = {
      key: '',
      value: []
    };
    Diagram.lastType[type + '']['value'].push(items);
  } else if (isSameLevel) {
    Diagram.lastType['key'] = type;
    Diagram.lastType['value'].push(items);
  } else {
    console.log(isSubLevel);
    console.log(isSameLevel);
    console.log(type)
  }

  Diagram.currentDomain[type + ''] = items;
  Diagram.lastType['key'] = type;

  return [actor, type, value];
};

Diagram.unescape = function (input) {
  return input;
};

Diagram.signal = function (input, $2) {
  return input;
};

Diagram.storeLastDomain = function () {
  if (Diagram.currentDomain.domain !== undefined) {
    this.data.push(Diagram.currentDomain);
  }
};

Diagram.createDomain = function (input) {
  this.storeLastDomain();

  let currentDomain = {
    domain: {

    }
  };

  Diagram.lastType['key'] = 'domain';
  Diagram.currentDomain = currentDomain;
};

Diagram.parse = function (input) {
  let parser = new esDsl.Parser();
  parser.yy = new Diagram();
  return parser.parse(input);
};

Diagram.getResult = function () {
  this.data.push(Diagram.currentDomain);
  return this.data;
};
