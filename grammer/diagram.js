function Diagram() {

}

Diagram.data = [];
Diagram.currentDomain = {};

Diagram.TYPE = {
  CHILD: 'ADD',
};

Diagram.store = function (actor, type, value) {
  let items = {};
  items[type + ''] = value;
  Diagram.currentDomain[type].push(items);
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
    domain: input,
    aggregate: [],
    entity: [],
    model: [],
    event: [],
    command: []
  };

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
