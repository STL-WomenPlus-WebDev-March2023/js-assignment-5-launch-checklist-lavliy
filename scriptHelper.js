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
  

    pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
    copilotStatus.innerHTML = `Co-Pilot ${copilot} is ready`;
    list.style.visibilty = `hidden`;
   
    if(Number(fuelLevel) < 10000){
        fuelStatus.innerHTML = `Not enough fuel for journey`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `#C7254E`;
   }else if(Number(cargoMass) > 10000){
        cargoStatus.innerHTML = `Warning! Reduce cargo weight`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `#C7254E`;        
   } else if(Number(fuelLevel) > 10000 && Number(cargoMass) < 10000){
        fuelStatus.innerHTML = `Enough fuel for TakeOff`;
        cargoStatus.innerHTML = `Enough Cargo weight for TakeOff`;
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        list.style.visibility = `visible`;
        launchStatus.style.color = `#419F6A`;

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
