//Leaflet Map erstellen
var Karte = L.map("mapid", {tap: false, scrollWheelZoom: false}).setView([51, 10.3], 6);
Karte.options.minZoom = 2;

//Zoom Scrollrad aktivieren/Deaktiveren durck Klicken
Karte.on('click', function() {	
	Karte.scrollWheelZoom.enable(); /*Immer aktivieren nach dem ersten Klick*/
	/*Toggle
	Karte.scrollWheelZoom.enabled()? Karte.scrollWheelZoom.disable() : Karte.scrollWheelZoom.enable();*/
});

// Suchfunktionalität
var markersLayer = new L.LayerGroup();
Karte.addLayer(markersLayer);
var controlSearch = new L.Control.Search({
	position:'topright',		
	layer: markersLayer,
	initial: true,
	zoom: 12,
	marker: false
});
Karte.addControl(controlSearch);


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

		markArr[i] = new L.marker([lat, lon], {title: name})
		markersLayer.addLayer(markArr[i])
		// const linkText = `<a href=\x22xml/stations/${id}.xml\x22>${id}</a>`;
		const linkText = `<a href=\x22xml/details_stations/${id}.xml\x22>${id}</a>`;
		markArr[i].bindPopup(`<b>${name}</b> \n <b>Details: ${linkText}</b>`);
	}
}
