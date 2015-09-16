

jest.dontMock('../../constants/WorldConstants');
jest.dontMock('../Grid');
jest.dontMock('../Critter');
jest.dontMock('../../components/Vector');
jest.dontMock('object-assign');

describe('Grid', function() {

  var WorldConstants = require('../../constants/WorldConstants');
  var Vector = require('../../components/Vector');
  var AppDispatcher;
  var Grid;
  var callback;
  var content=[
    "####",
    "#* #",
    "# O#",
    "####"
  ];
  var legend={
    "#": 'Wall',
    "*": 'Plant',
    "O": 'PlantEater'
  }

  // mock actions
  var actionMove = {
    actionType: WorldConstants.MOVE,
    position: new Vector(2,2),
    direction: new Vector(0,-1)
  };
  var actionDie = {
    actionType: WorldConstants.DIE,
    position: new Vector(2,2)
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    Grid = require('../Grid');
    Grid.init(content, legend);
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with a small world content', function() {
    expect(Grid.rows()).toEqual(content);
  });

  it('should reflect the moving of the PlantEater', function() {
    callback(actionMove);
    expect(Grid.rows()).toEqual([
      "####",
      "#*O#",
      "#  #",
      "####"
    ]);
  });

  it('should reflect the death of the PlantEater', function() {
    callback(actionDie);
    expect(Grid.rows()).toEqual([
      "####",
      "#* #",
      "#  #",
      "####"
    ]);
  });
});
