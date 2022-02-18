// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    let planetDetails = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src = ${imageUrl}>
    `;
    document.getElementById ("missionTarget").innerHTML = planetDetails;
}

function validateInput(testInput) {
    let transformation = Number(testInput);

   if (transformation == ""){
        return "Empty";
   }

    else if (isNaN(transformation)) {
        return "Not a Number";
}
    else if (isNaN(transformation) == false) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    if (validateInput(pilot) === "Empty" || (validateInput(copilot) === "Empty") || (validateInput(fuelLevel) === "Empty") || (validateInput(cargoLevel) === "Empty")) {
        showAlert ("All fields are required!");
    }

    if (validateInput(pilot) === "Is a Number" || (validateInput(copilot) === "Is a Number") || (validateInput(fuelLevel === "Not a Number") || (validateInput(cargoLevel) === "Not a Number"))) {
        showAlert ("Make sure to enter valid information for each field!");
    }

    document.getElementById ("pilotStatus").innerHTML =  `Pilot ${pilot} is ready for launch.`;
    document.getElementById ("copilotStatus").innerHTML =  `Copilot ${copilot} is ready for launch.`;

    if (fuelLevel < 10000 && cargoLevel <= 10000) {
        list.style.visibility = "visible";
        document.getElementById ("fuelStatus").innerHTML = "Fuel Level is too low for launch.";
        document.getElementById ("cargoStatus").innerHTML = "Cargo Mass is low enough to launch.";
        document.getElementById ("launchStatus").innerHTML = "Shuttle is not ready for launch.";
        document.getElementById ("launchStatus").style.color = "red";
    }

    if (cargoLevel > 10000 && fuelLevel >= 10000) {
        list.style.visibility = "visible";
        document.getElementById ("cargoStatus").innerHTML = "Cargo Mass is too heavy for takeoff.";
        document.getElementById ("fuelStatus").innerHTML = "Fuel level is sufficient for launch."
        document.getElementById ("launchStatus").innerHTML = "Shuttle not ready for launch.";
        document.getElementById ("launchStatus").style.color = "red";
    }

    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        list.style.visibility = "visible";
        document.getElementById ("launchStatus").innerHTML = "Shuttle is ready for launch";
        document.getElementById ("lauchStatus").style.color = "green";
        document.getElementById ("fuelStatus").innerHTML = "Fuel level is sufficient for launch.";
        document.getElementById ("cargoStatus").innerHTML = "Cargo Mass is low enough for launch.";
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
    let index = Math.floor(Math.random()* planets.length);
    return planets[index]
}

// function showAlert(alertMessage) {
//     try{window.alert(alertMessage)
//     }catch(error){};
// };

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
