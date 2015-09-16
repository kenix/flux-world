
var React = require('react');
var ReactPropTypes = React.PropTypes;
var Grid = require('../stores/Grid');
var Context= require('./Context');
var Vector= require('./Vector');
var classNames = require('classnames');

function getGridState() {
  return {
    rows: Grid.getCritters()
    };
}

function getStyleClass(critter){
  if(!critter){
    return "empty";
  }
  switch (critter.originChar) {
    case "#":
      return "wall";
    case "*":
      return "plant";
    case "O":
      return "plantEater";
    default:
      throw new Error("unknown space type "+critter.originChar)
  }
}

function getGeneration(critter){
  if(!critter){
    return "";
  }
  return critter.generation;
}

var _handleTO;
var _handleIV;
var _context;

var World=React.createClass({
  propTypes: {
    map: ReactPropTypes.array.isRequired,
    legend: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    Grid.init(this.props.map, this.props.legend);
    return getGridState();
  },

  componentDidMount: function() {
    Grid.addChangeListener(this._onChange);
    _context=new Context(Grid);
    _handleTO=setTimeout(this._start, 1000);
  },

  componentWillUnmount: function() {
    Grid.removeChangeListener(this._onChange);
    clearTimeout(_handleTO);
    clearInterval(_handleIV);
  },

  render: function(){
    var lines=[];
    for(var i=0; i<this.state.rows.length; i++){
      var row=this.state.rows[i];
      var lineKey="r"+i;
      var line=[];
      for(var j=0; j<row.length; j++){
        var key=i+'.'+j;
        var cn="space "+getStyleClass(row[j]);
        line.push(<div key={key} className={cn}><span>{getGeneration(row[j])}</span></div>);
      }
      lines.push(<div key={lineKey} className="line">{line}</div>)
    }

    return (
      <div className="map">
        {lines}
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getGridState());
  },
  _start: function(){
    _handleIV=setInterval(this._turn, 500);
    clearTimeout(_handleTO);
  },
  _turn: function(){
    var done=[];
    var critters=Grid.getCritters();
    for(var y=0; y<critters.length; y++){
      var line=critters[y];
      for(var x=0; x<line.length; x++){
        if(line[x] && line[x].act && done.indexOf(line[x])<0){
          _context.set(new Vector(x, y));
          // console.log(x,y,line[x])
          line[x].act(_context);
          done.push(line[x]);
        }
      }
    }
  }
});

module.exports=World
