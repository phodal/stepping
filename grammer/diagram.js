function Diagram() {

}

Diagram.store = function (input, input2) {
  console.log(input, input2);
  return input;
};

Diagram.unescape = function (input) {
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
