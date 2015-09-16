
var Grid = require('../stores/Grid');
var Vector = require('./Vector');

var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

function Context(grid) {
  this.grid = grid;
  this.position = new Vector(0,0);
}

Context.prototype.set=function(vector){
  this.position=vector;
}

Context.prototype.look = function(dir) {
  var target = this.position.plus(directions[dir]);
  if (this.grid.isInside(target))
    return this.grid.getCharAt(target);
  else
    return "#";
};

Context.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions){
    if (this.look(dir) == ch){
      found.push(directions[dir]);
    }
  }
  return found;
};

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

Context.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  return randomElement(found);
};

Context.prototype.get=function(dir){
  var target = this.position.plus(dir)
  if (this.grid.isInside(target))
    return this.grid.get(target);
  else
    return null;
}

module.exports=Context
