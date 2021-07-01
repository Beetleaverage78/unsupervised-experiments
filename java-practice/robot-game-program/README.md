# Robot Game
A small java game that parses a custom language into robot actions.
The goal of the game is to see which robot can survive the longest by not running out of fuel.

I encourage you to make a program of your own.

**Use:** Download `robotGame.jar`, as well as the `assets` & `robot-program` folders. Double click the jar to run.
Below is the grammar used, it is essentially another form of a simple programming language.
Examples can be found in the `robot-programs` folder
```
  PROG  ::= STMT*
  STMT  ::= ACT ";" | LOOP | IF | WHILE
  ACT   ::= "move" [ "(" EXP ")" ] | "turnL" | "turnR" | "turnAround" | 
            "shieldOn" | "shieldOff" | "takeFuel" | "wait" [ "(" EXP ")" ]
  LOOP  ::= "loop" BLOCK
  IF    ::= "if" "(" COND ")" BLOCK [ "else" BLOCK ]
  WHILE ::= "while" "(" COND ")" BLOCK
  BLOCK ::= "{" STMT+ "}"
  EXP   ::= NUM | SEN | OP "(" EXP "," EXP ")"  
  SEN   ::= "fuelLeft" | "oppLR" | "oppFB" | "numBarrels" |
      "barrelLR" | "barrelFB" | "wallDist"
  OP    ::= "add" | "sub" | "mul" | "div"
  COND  ::= "and" "(" COND "," COND ")" | "or" "(" COND "," COND ")" | "not" "(" COND ")"  | 
            RELOP "(" EXP "," EXP ")
  RELOP ::= "lt" | "gt" | "eq"
  NUM   ::= "-?[1-9][0-9]*|0"
```
