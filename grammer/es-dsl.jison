
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */

%lex

%options case-insensitive

%%

"title"               return 'title'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%start start

%% /* language grammar */

start
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

%%
