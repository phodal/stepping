function Diagram() {

}

Diagram.unescape = function (input) {
  console.log(input);
  return input;
};

Diagram.parse = function (input) {
  let parser = new esDsl.Parser();
  parser.yy = new Diagram();
  return parser.parse(input);
};
