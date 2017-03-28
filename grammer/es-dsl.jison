
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
"aggregate"           return 'aggregate';
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
	: 'domain'     message { Diagram.createDomain($1) }
  | signal               { $$ = Diagram.signal($$, $1) }
  ;

signal
	: type aggregate actor message { $$ = Diagram.store($1, $2, $3, $4) }
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

aggregate
  : { $$=$1 }
  ;

%%
