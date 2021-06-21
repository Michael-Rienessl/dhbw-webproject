const fs = require("fs");
var request = require("request");
var rp = require("request-promise");


const station_id_list = JSON.parse(fs.readFileSync("german_station_id_list.json"));
let stationJSON = [];


//request lat, lon, name and write into xml
var options = {
	uri: "https://www.ncei.noaa.gov/access/services/data/v1?dataset=daily-summaries&startDate=2020-01-01&endDate=2020-01-01&stations=" + "GM000010147" + "&includeStationLocation=1&includeStationName=true&format=json",
	json: true // Automatically parses the JSON string in the response
};

rp(options)
	.then(function (response) {
		console.log(response)
		//get name, id, lat, lon and save to json
		var dataset = {
			id: response[0].STATION,
			name: response[0].NAME,
			lat: response[0].LATITUDE,
			lon: response[0].LONGITUDE
		};
		console.log(dataset);
		stationJSON.push(dataset);
	})
	.catch(function (err) {
		// delete id?
	});

fs.writeFileSync('station.json', JSON.stringify(stationJSON))