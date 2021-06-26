const fs = require("fs"),
 rp = require("request-promise");


const germanStationIdList = JSON.parse(fs.readFileSync("./german_station_id_list.json"));


async function main() {
	console.time("fetching");
	
	//request lat, lon, name and write into xml
	const uriPart = "https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&dataTypes=TMIN,TAVG,TMAX,DX90,EMNT,EMXT&startDate=1970-01-01&endDate=2021-12-31&includeAttributes=false&format=json&units=metric&&includeStationName=true&stations=",
		stationJSON = [],
		errorStations = [],
		requestCount = germanStationIdList.length,
		cooldownMs = 3000;
	let counter = 0;
	myInterval = setInterval(async () => {

		if (counter === requestCount) {
			fs.writeFileSync("YearTempStationData.json", JSON.stringify(stationJSON));
			fs.writeFileSync("errorYearTempStationIDs.json", JSON.stringify(errorStations));
			console.timeEnd("fetching");
			clearInterval(myInterval);
		}

		const stationId = germanStationIdList[counter];
		console.log(`[${(counter / requestCount * 100).toFixed(1)}/100%] Requesting station data for: ${stationId}, ETA: ${((((requestCount - counter) * cooldownMs) / 1000) / 60).toFixed(1)} mins`);
		
		let passed = false,
		response;
		try {
			response = await rp(uriPart + stationId, { json: true });
			passed = true;
		} catch (error) {
			errorStations.push(stationId);
		}
	
		if (passed) {
			try {
                const spefStationYearData = [];
                response.forEach(yearData => {
                    spefStationYearData.push({
                        year: yearData.DATE,
                        emxt: yearData.EMXT,
                        emnt: yearData.EMNT
                    });
                });
                stationJSON.push({id: response[0].STATION, name: response[0].NAME, data: spefStationYearData});
			} catch (error) {
				console.log(`🚨 Some attributes for ${stationId} not available. --> Skipping this station`);
			}
		}

		fs.writeFileSync("YearTempStationData.json", JSON.stringify(stationJSON));
		fs.writeFileSync("errorYearTempStationIDs.json", JSON.stringify(errorStations));

		counter++;
	}, cooldownMs);

}

main();
