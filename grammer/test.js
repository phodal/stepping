var fs = require('fs');
var Parser = require("jison").Parser;

var diagram = require("./diagram");
var bnf = fs.readFileSync(__dirname + '/es-dsl.jison', 'utf8');

var esDsl = {
  parse: function (input) {
    var parser = new Parser(bnf);
    parser.yy = diagram.Diagram;

    parser.yy.currentDomain = [];
    parser.yy.data = [];

    var result = parser.parse(input);
    console.log(result.data);
    return result;
  }
};

var fs = require('fs');
var path = require('path');
var raw = fs.readFileSync(path.normalize('./phodal.ddd'), 'utf8');

esDsl.parse(raw);

