
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
	: document 'EOF' { yy.parser.yy.getResult(); return yy.parser.yy; } /* returning parser.yy is a quirk of jison >0.4.10 */
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
	: 'domain'     message { yy.parser.yy.createDomain($2) }
  | signal               { $$ = yy.parser.yy.signal($$, $1) }
  ;

signal
	: type actor message { $$ = yy.parser.yy.store($1, $2, $3) }
	| actor message      { $$ = yy.parser.yy.store($$, $1, $2) }
	;

message
	: MESSAGE { $$ = yy.parser.yy.unescape($1.substring(1)); }
	;

actor
	: ACTOR { $$=$1; }
	;

type
	: CHILD   { $$ = yy.parser.yy.TYPE.CHILD; }
	;

ddd_type
  : DDD_TYPE { $$=$1 }
  ;

%%
