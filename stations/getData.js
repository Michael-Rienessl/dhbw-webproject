const fs = require("fs");
var request = require("request");
var rp = require("request-promise");


const german_station_id_list = JSON.parse(fs.readFileSync("german_station_id_list.json"));


async function main() {
	console.time('fetching')
	
	//request lat, lon, name and write into xml
	const uriPart = "https://www.ncei.noaa.gov/access/services/data/v1?dataset=daily-summaries&startDate=2020-01-01&endDate=2020-01-01&includeStationLocation=1&includeStationName=true&format=json&stations="
	let stationJSON = [];
	let errorStations = []

	const request_count = german_station_id_list.length;
	const cooldownMs = 3000;
	let counter = 0;
	myInterval = setInterval(async () => {

		if (counter == request_count) {
			fs.writeFileSync('stationData.json', JSON.stringify(stationJSON))
			fs.writeFileSync('errorStationIDs.json', JSON.stringify(errorStations))
			console.timeEnd('fetching')
			clearInterval(myInterval)
		}

		let station_id = german_station_id_list[counter]
		console.log(`[${(counter / request_count*100).toFixed(1)}/100%] Requesting station data for: ${station_id}, ETA: ${((((request_count-counter) * cooldownMs) /1000) / 60).toFixed(1)} mins`);
		// TODO: ETA
		
		try {
			var response = await rp(uriPart + station_id, { json: true });
		} catch (error) {
			errorStations.push(station_id)
		}
		
		try {
			stationJSON.push({
				id: response[0].STATION,
				name: response[0].NAME,
				lat: response[0].LATITUDE,
				lon: response[0].LONGITUDE
			})
		} catch (error) {
			console.log(`🚨 Some attributes for ${station_id} not available. --> Skipping this station`)
		}

		fs.writeFileSync('stationData.json', JSON.stringify(stationJSON))
		fs.writeFileSync('errorStationIDs.json', JSON.stringify(errorStations))

		counter++;
	}, cooldownMs)

}

main()


