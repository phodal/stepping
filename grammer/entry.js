var fs = require('fs');
var Parser = require("jison").Parser;

var diagram = require("./diagram");
var bnf = fs.readFileSync(__dirname + '/es-dsl.jison', 'utf8');

var esDsl = {
  parse: function(input) {
    parser = new Parser(bnf);
    parser.yy = diagram.Diagram;
    
    parser.yy.currentDomain = [];
    parser.yy.data = [];

    return parser.parse(input);
  }
};

exports.esDsl = esDsl;
