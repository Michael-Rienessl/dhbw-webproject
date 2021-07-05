// get URL parameter
function getURLParam(name) {
	name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");

	const regexS = `[\\?&amp;]${name}=([^&amp;#]*)`,
		regex = new RegExp(regexS),
		results = regex.exec(window.location.href);

return results === null ? "" : results[1];
}

const stationID = getURLParam("station");
// request
const request = new XMLHttpRequest(),
	requestURL = `https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&dataTypes=TMIN,TAVG,TMAX,DX90,EMNT,EMXT&stations=${stationID}&startDate=1970-01-01&endDate=2021-12-31&includeAttributes=false&format=json&units=metric&&includeStationName=true`;
request.open("GET", requestURL);
request.responseType = "json";
request.send();


request.onload = function () {
	const data = request.response;
	let name = data[0].NAME;
	name = name.replace(/,.*/, "");
	let html = `<p>${stationID} - ${name}</p><table id='detailsTable'><thead><tr><th>Jahr</th><th>Minimale Temperatur</th><th>Maximal Temperatur</th></tr></thead>`;
	console.log(data);
	data.forEach(year => {
		const date = year.DATE,
			emxt = year.EMXT,
			emnt = year.EMNT;
		html += `<tr><td>${date}</td><td>${emnt}</td><td>${emxt}</td></tr>`;
	});
	html += "</table>";
	console.log(html);
	document.getElementById("content").innerHTML = html;
	document.title = `Details ${stationID}`;
};