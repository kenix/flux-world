
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Vector=require("../components/Vector");
var WorldConstants=require("../constants/WorldConstants");
var Critter=require("./Critter");
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _width;
var _height;
var _space;

function elementFromChar(ch, legend) {
  if (ch == " ")
    return null;
  var element = new Critter[legend[ch]]();
  return element;
}

function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

var Grid=assign({}, EventEmitter.prototype, {

  init: function(map, legend){ // map is an array of strings, each of which represent a row
    _width=map[0].length;
    _height=map.length;
    _space=new Array(_width*_height);
    var idx=0;
    map.forEach(function(row){
      for(var i=0; i<row.length; i++){
        _space[idx++]=elementFromChar(row.charAt(i), legend);
      }
    });
  },

  isInside: function(vector){
    return vector.x >= 0 && vector.x < _width &&
      vector.y >= 0 && vector.y < _height;
  },

  getCharAt: function(vector){
    return charFromElement(this.get(vector));
  },

  get: function(vector){
    if(!this.isInside(vector)){
      throw new Error(vector+" outside of grid");
    }
    return _space[vector.x+vector.y*_width];
  },

  rows: function(){
    var ret=[];
    for(var y=0; y<_height; y++){
      var str="";
      for(var x=0; x<_width; x++){
        str+=charFromElement(_space[y*_width+x]);
      }
      ret.push(str);
    }
    return ret;
  },

  getCritters: function(){
    var ret=[];
    for(var y=0; y<_height; y++){
      row=[];
      for(var x=0; x<_width; x++){
        row.push(_space[y*_width+x]);
      }
      ret.push(row);
    }
    return ret;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action){
  // console.log(action);
  switch (action.actionType) {
    case WorldConstants.MOVE:
    case WorldConstants.EAT:
      var critter=_space[action.position.x+action.position.y*_width];
      var tar=action.position.plus(action.direction);
      _space[tar.x+tar.y*_width]=critter;
      _space[action.position.x+action.position.y*_width]=null;
      Grid.emitChange();
      break;
    case WorldConstants.DIE:
      _space[action.position.x+action.position.y*_width]=null;
      Grid.emitChange();
      break;
    case WorldConstants.REPRO:
      var tar=action.position.plus(action.direction);
      _space[tar.x+tar.y*_width]=action.child;
      Grid.emitChange();
      break;
    default:
      // no interested
  }
});

module.exports=Grid
