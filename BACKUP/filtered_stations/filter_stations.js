const fs = require('fs');

const weatherDataJSON = JSON.parse(fs.readFileSync('../YearTempStationData.json'));

const stationsEverythingOk = [];
const stationsWhereSomeYearsMissing = [];



// 1. Filter every station even if it has already one undefined
// --> stationsEverythingOk

weatherDataJSON.forEach(station => {
    let oneYearUndefined = false;
    for (let i = 0; i < station.data.length; i++) {
        if (yearHasUndefinedAttribute(station.data[i])) {
            oneYearUndefined = true
            break
        }
    }
    if (!oneYearUndefined) {
        stationsEverythingOk.push({
            id: station.id,
            name: station.name,
            lat: station.lat,
            lon: station.lon
        });
    }
});

// 2. Filter every station only if it has no values at all
// --> stationsWhereSomeYearsMissing

weatherDataJSON.forEach(station => {
    let valuesFound = false
    for (let i = 0; i < station.data.length; i++) {
        if (yearHasAtLeastOneValue(station.data[i])) {
            valuesFound = true;
            break;
        }
    }
    if (valuesFound) {
        stationsWhereSomeYearsMissing.push({
            id: station.id,
            name: station.name,
            lat: station.lat,
            lon: station.lon
        });
    }
});



// Information
console.log(`Unfiltered stations: ${weatherDataJSON.length}`)
console.log(`Stations with no missing data at all: ${stationsEverythingOk.length}`) //markersXML_1
console.log(`Stations with some years missing: ${stationsWhereSomeYearsMissing.length}`) //markersXML_2

let markersXML_1 = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE root [
        <!ELEMENT root (station)*>
        <!ELEMENT station (id|name|lat|lon)*>
        <!ELEMENT id (#PCDATA)>
        <!ELEMENT name (#PCDATA)>
        <!ELEMENT lat (#PCDATA)>
        <!ELEMENT lon (#PCDATA)>
        ]>
<root>`
let markersXML_2 = markersXML_1;

stationsEverythingOk.forEach(station => {
    markersXML_1 += `
    <station>
        <id>${station.id}</id>
        <name>${station.name}</name>
        <lat>${station.lat}</lat>
        <lon>${station.lon}</lon>
    </station>`
});
markersXML_1 += `\n</root>`


stationsWhereSomeYearsMissing.forEach(station => {
    markersXML_2 += `
    <station>
        <id>${station.id}</id>
        <name>${station.name}</name>
        <lat>${station.lat}</lat>
        <lon>${station.lon}</lon>
    </station>`
});
markersXML_2 += `\n</root>`


// fs.writeFileSync('stationsEverythingOk.xml',markersXML_1); // Group decided for version 2
fs.writeFileSync('filteredStations.xml',markersXML_2);



// Helper functions

function yearHasUndefinedAttribute(yearData) {
    if (yearData.emxt == undefined ||
        yearData.emnt == undefined ||
        yearData.tmax == undefined ||
        yearData.tmin == undefined ||
        yearData.tavg == undefined) {
        return true
    }
    return false
}

function yearHasAtLeastOneValue(yearData) {
    if (yearData.emxt != undefined ||
        yearData.emnt != undefined ||
        yearData.tmax != undefined ||
        yearData.tmin != undefined ||
        yearData.tavg != undefined) {
        return true
    }
    return false
}