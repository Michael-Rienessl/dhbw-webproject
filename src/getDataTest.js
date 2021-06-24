// get URL parameter
function getURLParam(name) {
	name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");

	const regexS = `[\\?&amp;]${name}=([^&amp;#]*)`,
		regex = new RegExp(regexS),
		results = regex.exec(window.location.href);

	if (results === null) {
		return "";
	} else {
		return results[1];
	}
}

const stationID = getURLParam("station");
// request
let html = "<p>" + stationID + "</p><table id='detailsTable'><thead><tr><th>Jahr</th><th>Maximal Temperatur</th></tr></thead>";
const request = new XMLHttpRequest(),
	requestURL = `https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&dataTypes=TMIN,TAVG,TMAX,DX90,EMNT,EMXT&stations=${stationID}&startDate=1970-01-01&endDate=2021-12-31&includeAttributes=false&format=json&units=metric`;
request.open("GET", requestURL);
request.responseType = "json";
request.send();


request.onload = function () {
	const data = request.response;
	console.log(data)
	data.forEach(year => {
		console.log("a");
		let date = year.DATE;
		let emxt = year.EMXT;
		html += "<tr><td>" + date + "</td><td>" + emxt + "</td>";
	});
	html += "</table>";
	console.log(html);
	document.getElementById("content").innerHTML = html;
	document.title = `Details ${stationID}`;
};