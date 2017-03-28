function Diagram() {

}

Diagram.TYPE = {
  CHILD: 'ADD',
};

Diagram.store = function ($1, $2, $3) {
  console.log($1, $2, $3);
  return [$1, $2, $3];
};

Diagram.unescape = function (input) {
  return input;
};

Diagram.signal = function (input, $2) {
  return input;
};

Diagram.createDomain = function (input) {
  return {
    domain: input,
    aggregate: [],
    entity: [],
    model: [],
    event: [],
    command: []
  };
};

Diagram.parse = function (input) {
  let parser = new esDsl.Parser();
  parser.yy = new Diagram();
  return parser.parse(input);
};
