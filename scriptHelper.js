// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}'>`
 }

function validateInput(testInput) {
    if(testInput === "" || testInput === "null" || testInput === "0"){
        return "Empty";
    } else if(isNaN(testInput)){
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   let launchStatus = document.getElementById('launchStatus');
  

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    list.style.visibilty = 'hidden';
   
    if(Number(fuelLevel) < 10000 ){
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = `rgb(199, 37, 78)`;
        //cargoStatus.innerHTML = `Cargo mass low enough for launch`;
   }else if(Number(cargoMass) > 10000 ){
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = `rgb(199, 37, 78)`; 
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
   } else if(Number(fuelLevel) < 10000 && Number(cargoMass) > 10000){
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = `rgb(199, 37, 78)`; 
   } else {
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        launchStatus.innerHTML = `Shuttle is Ready for Launch`;
        list.style.visibility = `visible`;
        launchStatus.style.color = `rgb(65, 159, 106)`;
   }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
       return response.json();
});

    return planetsReturned;
}

function pickPlanet(planets) {
    let pickedPlanet = Math.floor(Math.random() * planets.length);
    return planets[pickedPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
