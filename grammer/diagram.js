function Diagram() {

}

Diagram.data = [];

Diagram.TYPE = {
  CHILD: 'ADD',
};

Diagram.store = function (actor, type, value) {
  this.data[0][type].push({$2: value});
  return [actor, type, value];
};

Diagram.unescape = function (input) {
  return input;
};

Diagram.signal = function (input, $2) {
  return input;
};

Diagram.createDomain = function (input) {
  this.data.push({
    domain: input,
    aggregate: [],
    entity: [],
    model: [],
    event: [],
    command: []
  });
};

Diagram.parse = function (input) {
  let parser = new esDsl.Parser();
  parser.yy = new Diagram();
  return parser.parse(input);
};

Diagram.getResult = function () {
  return this.data;
};
