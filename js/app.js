

var React = require('react');
var World = require('./components/World.react');

var content=[ // 28*28 map
"############################",
"##### ************* *  #####",
"##   ***                **##",
"#   *##**         **  O  *##",
"#    ***     O    ##**    *#",
"#       O         ##***    #",
"#                 ##**     #",
"#   O     **        ##*O   #",
"#   O     **        ##*O   #",
"#   O     **        ##*O   #",
"#                 ##****   #",
"# ****    O          ##**  #",
"#   **            ##** O **#",
"#     *    *       ##*    *#",
"#                 ##** O   #",
"#                 ##** O   #",
"#                 ##** O   #",
"#                 ##**     #",
"#   O       #*             #",
"#    O      #*             #",
"#           #*             #",
"#        O  #*             #",
"#*          #**       O    #",
"#***        ##**    O    **#",
"#***        ##**    O    **#",
"#***        ##**    O    **#",
"##****     ###***       *###",
"############################"
];
var legend={
  "#": 'Wall',
  "*": 'Plant',
  "O": 'PlantEater'
}

React.render(
  <World map={content} legend={legend} />,
  document.getElementById('world')
);
