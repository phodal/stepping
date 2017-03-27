
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */

%lex

%options case-insensitive

%%

\s+                   /* skip whitespace */
"domain"              return 'domain';
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
	: 'domain' message { $2; }
  ;

message
	: MESSAGE { $$ = Diagram.unescape($1.substring(1)); }
	;

%%
