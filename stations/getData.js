const fs = require("fs");
var request = require("request");
var rp = require("request-promise");


const station_id_list = JSON.parse(fs.readFileSync("german_station_id_list.json"));


async function main() {
	//request lat, lon, name and write into xml
	const uriPart = "https://www.ncei.noaa.gov/access/services/data/v1?dataset=daily-summaries&startDate=2020-01-01&endDate=2020-01-01&includeStationLocation=1&includeStationName=true&format=json&stations="
	let stationJSON = [];
	
	
	let station_id = 'GM000003342'
	console.log(`Requesting station data for: ${station_id}`)
	const response = await rp(uriPart + station_id, { json: true });
	
	stationJSON.push({
		id: response[0].STATION,
		name: response[0].NAME,
		lat: response[0].LATITUDE,
		lon: response[0].LONGITUDE
	})

	fs.writeFileSync('stationData.json', JSON.stringify(stationJSON))
}


main()
