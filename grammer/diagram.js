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

Diagram.getLevelByType = function (type) {
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
  let result = {};

  let isSubLevel = Diagram.isSubLevel(Diagram.lastType, type);
  let isSameLevel = Diagram.isSameLevel(Diagram.lastType, type);
  let parentLevel = Diagram.getParentLevel(type);

  console.log(type, value, isSubLevel);

  if (Diagram.currentLevel === undefined) {
    Diagram.currentLevel = 2;
  } else if (isSubLevel) {
    Diagram.currentLevel++;
  }

  Diagram.currentType = Diagram.LEVEL_MAP[Diagram.currentLevel];

  result = {
    type: value,
    name: Diagram.currentType,
    childs: []
  };

  Diagram.lastType = Diagram.currentType;
  Diagram.currentDomain.childs.push(result);

  return [actor, type, value];
};

Diagram.unescape = function (input) {
  return input;
};

Diagram.signal = function (input) {
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
    name: input,
    type: 'domain',
    childs: []
  };

  Diagram.lastType = 'domain';
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
