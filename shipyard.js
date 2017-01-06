var launchPad;
var ourShip;
var crewNames;
var crewMembers;
var fleet;

crewNames = ["Kyle", "Keyon", "Mike", "Russel", "Jon", "Jeff"];

function Ship(name){
  this.name = name;
  this.crew = [];
  this.captain = null;
  this.propulsion = null;
}

function CrewMember(name){
  this.name = name;
  this.trained = false;
}

function Rocket(){
  this.fuel = 0;
  this.addFuel = function(newFuel){
    this.fuel += newFuel;
    console.log(newFuel + " fuel has been added to rocket.");
    console.log("Current fuel is: " + this.fuel);
  }
  this.fire = function(){
    if(this.fuel > 0){
      this.fuel -= 1;
      console.log("The engines have been fired!");
      return true;
    }
    else{
      console.log("The engines have failed");
      return false;
    }
  }
}

trainCrew = function(crew){
  var trainedCrew = [];
  for(var i = 0; i < crew.length; i++){
    trainedCrew.push(new CrewMember(crew[i]));
    trainedCrew[i].trained = true;
  }
  return trainedCrew;
}

Ship.prototype.loadCrew = function(newCrew){
  for(var i = 0; i < newCrew.length; i++){
    this.crew.push(newCrew[i]);
    console.log("Welcome to the ship, " + newCrew[i].name + "!");
  }
}

Ship.prototype.setCaptain = function(){
  var crewCount = this.crew.length;
  return this.crew[Math.floor(Math.random() * crewCount)];
}

Ship.prototype.mountPropulsion = function(propulsionItem){
  this.propulsion = propulsionItem;
}

Ship.prototype.takeOff = function(){
  if(this.propulsion.fire()){
    console.log("brhbrhbhhrbhooooooommmmmmm!\n");
  }else{
    console.log("ppppffffffffff...\n");
  }
}

launchPad = function(ships, crew){
  for(var i = 0; i < ships.length; i++){
    console.log(ships[i].name + " is preparing for takeoff.");
    ships[i].loadCrew(crew);
    ships[i].captain = ships[i].setCaptain();
    console.log(ships[i].captain.name + " is the captain!");
    ships[i].mountPropulsion(new Rocket());
    ships[i].propulsion.addFuel(10);
    ships[i].takeOff();
  }
}

crewMembers = trainCrew(crewNames);

fleet = {
  name: "Kyle's Fleet",
  ships: [],
  build: function(shipNames){
    for(var i = 0; i < shipNames.length; i++){
      this.ships.push(new Ship(shipNames[i]));
      console.log("Welcome to the fleet, " + shipNames[i] + "!");
    }
    console.log("All ships are added to the fleet.\n");
  }
}

fleet.build(["The Explorer", "The Fighter", "The Miner", "The Researcher"]);
console.log("Welcome to the space station!\n");
launchPad(fleet.ships, crewMembers);
