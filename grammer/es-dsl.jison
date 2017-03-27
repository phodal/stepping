
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
"-"                   return 'ACTOR';
:[^\r\n]+             return 'MESSAGE';
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
  | signal               { Diagram.signal($1) }
  ;

message
	: MESSAGE { $$ = Diagram.unescape($1.substring(1)); }
	;

actor_pair
	: actor             { $$ = $1; }
  ;

actor
	: ACTOR { console.log('ACTOR') }
	;

signal
	: actor MESSAGE { console.log($1, $2) }
	;

%%
