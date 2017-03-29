var fs = require('fs');
var Parser = require("jison").Parser;

var diagram = require("./diagram");
var bnf = fs.readFileSync('./es-dsl.jison', 'utf8');

function parseDSL(input) {
  parser = new Parser(bnf);
  parser.yy = diagram.Diagram;
  return parser.parse(input);
}

module.exports = parseDSL;


