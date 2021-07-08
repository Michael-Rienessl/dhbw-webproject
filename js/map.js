//Leaflet Map erstellen
var Karte = L.map("mapid").setView([51, 10.3], 6);
Karte.options.minZoom = 2;

//Standard OpenStreet Map Aussehen
/*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        'attribution':  'Kartendaten &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        'useCache': true
}).addTo(Karte);*/

//DarkMode komatibel mit leaflet. Ist allerdings unscharf. Ggf. noch nach Configs suchen
/*
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        'attribution':  'Kartendaten &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        'useCache': true
}).addTo(Karte);

 */

//MapBox Styles. Nutzt WebGL zur Darstellung. Es können Auch andere Style z.B. von https://openmaptiles.org/styles/ genommen werden
//MapBox DarkMode

var glVecTilesMap = L.mapboxGL({
	accessToken: "pk.eyJ1IjoiaGFubmVsb3JlMSIsImEiOiJja3E1aTNuNHUwcGVlMnBxejlzOTFyeDQ1In0._2lBK8UGU28XwJjLsrh41w",
	style: "mapbox://styles/mapbox/dark-v10"
}).addTo(Karte);


const xhr = new XMLHttpRequest();
xhr.open("GET", "./xml/filteredStations_markers.xml");
// xhr.open("GET", "./BACKUP/stationsGer.xml");
xhr.overrideMimeType("text/xml");
xhr.onload = function () {
	if (xhr.readyState === xhr.DONE && xhr.status === 200) {
		console.log(xhr.responseXML);
		markers(xhr.responseXML);
	}
};

xhr.send();

function markers(xml) {
	const stations = xml.getElementsByTagName("station");
	console.log(stations);
	const markArr = [];
	for (let i = 0; i < stations.length; i++) {
		const
			id = stations[i].getElementsByTagName("id")[0].childNodes[0].nodeValue,
			lat = stations[i].getElementsByTagName("lat")[0].childNodes[0].nodeValue,
			lon = stations[i].getElementsByTagName("lon")[0].childNodes[0].nodeValue,
			name = stations[i].getElementsByTagName("name")[0].childNodes[0].nodeValue.replace(/,.*/, "");

		markArr[i] = L.marker([lat, lon]).addTo(Karte);
		// const linkText = `<a href=\x22xml/stations/${id}.xml\x22>${id}</a>`;
		const linkText = `<a href=\x22xml/details_stations/${id}.xml\x22>${id}</a>`;
		markArr[i].bindPopup(`<b>${name}</b> \n <b>Details: ${linkText}</b>`);
	}
}
