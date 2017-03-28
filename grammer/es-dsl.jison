
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
