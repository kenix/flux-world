
var Vector=require("../components/Vector");
var WorldConstants=require("../constants/WorldConstants");
var WorldActions=require("../actions/WorldActions");
var AppDispatcher = require('../dispatcher/AppDispatcher');

function Wall(){
  this.originChar='#';
  this.generation=0;
}

function Plant(){
  this.originChar='*';
  this.generation=0;
  this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act=function(ctx){
  var baby=new Plant();
  if (this.energy > 2*baby.energy) {
    var space = ctx.find(" ");
    if (space){
      baby.generation=this.generation+1;
      this.energy-=baby.energy;
      WorldActions.repro(ctx.position, space, baby);
    }
  }else if (this.energy < 20){ // grow
    this.energy+=0.5;
  }
}

function PlantEater() {
  this.originChar='O';
  this.generation=0;
  this.energy = 20;
}

PlantEater.prototype.act=function(ctx){
  var space = ctx.find(" ");
  if (this.energy > 60 && space){
    var baby=new PlantEater();
    baby.generation=this.generation+1;
    this.energy-=baby.energy;
    WorldActions.repro(ctx.position, space, baby);
    return;
  }
  var plant = ctx.find("*");
  if (plant) {
    this.energy+=ctx.get(plant).energy;
    WorldActions.eat(ctx.position, plant);
    return;
  }
  if(this.energy<=0){
    WorldActions.die(ctx.position);
    return;
  }
  if (space){
    this.energy-=2;
    WorldActions.move(ctx.position, space);
  }else{
    this.energy-=0.5;
  }
}

module.exports={
  "Wall": Wall,
  "Plant": Plant,
  "PlantEater": PlantEater
}
