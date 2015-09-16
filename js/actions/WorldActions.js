
var AppDispatcher = require('../dispatcher/AppDispatcher');
var WorldConstants = require('../constants/WorldConstants');

var WorldActions = {
  move: function(pos, dir) {
    AppDispatcher.dispatch({
      actionType: WorldConstants.MOVE,
      position: pos,
      direction: dir
    });
  },

  die: function(pos) {
    AppDispatcher.dispatch({
      actionType: WorldConstants.DIE,
      position: pos
    });
  },

  eat: function(pos, dir) {
    AppDispatcher.dispatch({
      actionType: WorldConstants.EAT,
      position: pos,
      direction: dir
    });
  },

  repro: function(pos, dir, critter) {
    AppDispatcher.dispatch({
      actionType: WorldConstants.REPRO,
      position: pos,
      direction: dir,
      child: critter
    });
  }
};

module.exports = WorldActions;
