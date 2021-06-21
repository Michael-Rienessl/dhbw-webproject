const fs = require("fs");
var request = require("request");
var rp = require("request-promise");


const german_station_id_list = JSON.parse(fs.readFileSync("german_station_id_list.json"));


async function main() {
	//request lat, lon, name and write into xml
	const uriPart = "https://www.ncei.noaa.gov/access/services/data/v1?dataset=daily-summaries&startDate=2020-01-01&endDate=2020-01-01&includeStationLocation=1&includeStationName=true&format=json&stations="
	let stationJSON = [];

	let counter = 0;
	myInterval = setInterval(async () => {

		if (counter == german_station_id_list.length) {
			fs.writeFileSync('stationData.json', JSON.stringify(stationJSON))
			clearInterval(myInterval)
		}

		let station_id = german_station_id_list[counter]
		console.log(`Requesting station data for: ${station_id}`);
		var response = await rp(uriPart + station_id, { json: true });

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

		counter++;
	}, 3000)
}


main()


