const fs = require("fs"),
	rp = require("request-promise");


const germanStationIdList = JSON.parse(fs.readFileSync("./german_station_id_list.json"));


async function main() {
	console.log('Started fetching of german weather station data...');
	console.time("fetching");

	//request lat, lon, name and write into xml
	const uriPart = "https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&dataTypes=TMIN,TAVG,TMAX,DX90,EMNT,EMXT&includeStationLocation=1&startDate=1970-01-01&endDate=2021-12-31&includeAttributes=false&format=json&units=metric&&includeStationName=true&stations=",
		stationJSON = [],
		errorStations = [],
		cooldownMs = 4000;

	// Split requests in 50 chunk arrays each because of API limitation
	const perChunk = 50 // items per chunk    
	var chunkedArray = germanStationIdList.reduce((resultArray, item, index) => {
		const chunkIndex = Math.floor(index / perChunk)
		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [] // start a new chunk
		}
		resultArray[chunkIndex].push(item)
		return resultArray
	}, [])
	const requestCount = chunkedArray.length;

	let counter = 0;
	myInterval = setInterval(async () => {

		// Concat all station id's to one string
		let stationId = ''
		for (let s = 0; s < chunkedArray[counter].length; s++) {
			stationId += `,${chunkedArray[counter][s]}`
		}
		stationId = stationId.substring(1, stationId.length);

		console.log(`[${(counter / requestCount * 100).toFixed(1)}/100%] Requesting station data for Stations ${counter*perChunk} to ${counter*perChunk+chunkedArray[counter].length-1} - ETA: ${((((requestCount - counter) * cooldownMs) / 1000)).toFixed(1)} seconds`);

		// Request
		let passed = false,
			response;
		try {
			response = await rp(uriPart + stationId, {
				json: true
			});
			passed = true;
		} catch (error) {
			console.log('error');
			errorStations.push(stationId);
		}

		if (passed) {
			try {
				// console.log(response);
				let currentStationId = 'random string which just needs to be assigned with a value otherwise it wont work 🤦‍♂️'
				let lastStationId = 'this string technically could be empty but i like to assign it with a completely random value 🤔 besides this aint production code so who cares anyways'

				let spefStationObject = {}
				for (let i = 0; i < response.length; i++) {
					currentStationId = response[i].STATION;
					if (lastStationId != currentStationId) {
						// New station found
						if (Object.keys(spefStationObject).length > 0) {
							// Only if station object is not the first
							stationJSON.push(spefStationObject);
						}

						spefStationObject = {}
						spefStationObject.id = response[i].STATION;
						spefStationObject.name = response[i].NAME;
						spefStationObject.lat = response[i].LATITUDE;
						spefStationObject.lon = response[i].LONGITUDE;
						spefStationObject.ele = response[i].ELEVATION;
						spefStationObject.data = [];
					}

					spefStationObject.data.push({
						year: response[i].DATE,
						emxt: response[i].EMXT,
						emnt: response[i].EMNT,
						tmax: response[i].TMAX,
						tmin: response[i].TMIN,
						tavg: response[i].TAVG
					});

					lastStationId = currentStationId;

					// Last station handle
					if (i == (response.length - 1)) {
						stationJSON.push(spefStationObject);
					}
				}

				// console.log(stationJSON);
			} catch (error) {
				console.error(error)
				console.log(`🚨 Some attributes for ${stationId} not available. --> Skipping this station`);
			}
		}

		fs.writeFileSync("YearTempStationData.json", JSON.stringify(stationJSON));
		fs.writeFileSync("errorYearTempStationIDs.json", JSON.stringify(errorStations));

		counter++;

		if (counter === requestCount) {
			console.log('[100.0/100%] Done ✅');
			console.timeEnd("fetching");
			clearInterval(myInterval);
		}
	}, cooldownMs);

}

main();