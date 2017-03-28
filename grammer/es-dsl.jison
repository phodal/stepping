
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */

%lex

kw  (
    'domain'|'aggregate'|'entity'|'model'|'event'|'command'
)

%options case-insensitive

%%

[\r\n]+               return 'NL';
\s+                   /* skip whitespace */
"domain"              return 'domain';
"-"                   return 'CHILD';
"+"                   return 'CHILD';
[^-:]+                return 'ACTOR';
:[^\r\n]+             return 'MESSAGE';
"aggregate"           return 'DDD_TYPE';
"entity"              return 'DDD_TYPE';
"model"               return 'DDD_TYPE';
"event"               return 'DDD_TYPE';
"command"             return 'DDD_TYPE';
<<EOF>>               return 'EOF';
.                     return 'INVALID';

/lex

%start start

/* declarations */

%{

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


%}


%% /* language grammar */

start
	: document 'EOF' { return yy.parser.yy; } /* returning parser.yy is a quirk of jison >0.4.10 */
	;

document
	: /* empty */
	| document line
	;

line
	: statement { }
	| 'NL'
	;

statement
	: 'domain'     message { Diagram.createDomain($1) }
  | signal               { $$ = Diagram.signal($$, $1) }
  ;

signal
	: type actor message { $$ = Diagram.store($1, $2, $3) }
	| actor message      { $$ = Diagram.store($$, $1, $2) }
	;

message
	: MESSAGE { console.log("message:", $$.substring(1) ); $$ = Diagram.unescape($1.substring(1)); }
	;

actor
	: ACTOR { $$=$1; console.log('ACTOR', $$) }
	;

type
	: CHILD   { $$ = Diagram.TYPE.CHILD; }
	;

ddd_type
  : DDD_TYPE { $$=$1 }
  ;

%%
