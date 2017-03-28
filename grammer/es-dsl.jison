
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
  if (type === 'aggregate') {
    Diagram.currentDomain.aggregates.push({
      name: value,
      type: type,
      events: [],
      commands: []
    });
    Diagram.aggregateIndex++;
  }

  if (type === 'event') {
    Diagram.currentDomain.aggregates[Diagram.aggregateIndex].events.push({
      name: value,
      type: type
    });
  }

  if (type === 'command') {
    Diagram.currentDomain.aggregates[Diagram.aggregateIndex].commands.push({
      name: value,
      type: type
    });
  }

  return [actor, type, value];
};

Diagram.unescape = function (input) {
  return input;
};

Diagram.signal = function (input) {
  return input;
};

Diagram.createDomain = function (input) {
  if (Diagram.currentDomain.name !== undefined) {
    this.data.push(Diagram.currentDomain);
  }

  Diagram.aggregateIndex = -1;

  Diagram.currentDomain = {
    name: input,
    type: 'domain',
    aggregates: []
  };
};

Diagram.parse = function (input) {
  var parser = new esDsl.Parser();
  parser.yy = new Diagram();
  return parser.parse(input);
};

Diagram.getResult = function () {
  this.data.push(Diagram.currentDomain);
  console.log(JSON.stringify(this.data));
  return this.data;
};

%}


%% /* language grammar */

start
	: document 'EOF' { Diagram.getResult(); return yy.parser.yy; } /* returning parser.yy is a quirk of jison >0.4.10 */
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
	: 'domain'     message { Diagram.createDomain($2) }
  | signal               { $$ = Diagram.signal($$, $1) }
  ;

signal
	: type actor message { $$ = Diagram.store($1, $2, $3) }
	| actor message      { $$ = Diagram.store($$, $1, $2) }
	;

message
	: MESSAGE { $$ = Diagram.unescape($1.substring(1)); }
	;

actor
	: ACTOR { $$=$1; }
	;

type
	: CHILD   { $$ = Diagram.TYPE.CHILD; }
	;

ddd_type
  : DDD_TYPE { $$=$1 }
  ;

%%
