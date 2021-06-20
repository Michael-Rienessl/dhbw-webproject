var Karte = L.map('mapid').setView([49.011753, 8.403854], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        'attribution':  'Kartendaten &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        'useCache': true
}).addTo(Karte);

const xhr = new XMLHttpRequest();
xhr.open("GET", "./xml/stations.xml");
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
    const name =
        stations[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
      lat = stations[i].getElementsByTagName("lat")[0].childNodes[0].nodeValue,
      lon = stations[i].getElementsByTagName("lon")[0].childNodes[0].nodeValue;
    markArr[i] = L.marker([lat, lon]).addTo(Karte);
    const linkText = `<a href=\x22details.html?station=${name}\x22>${name}</a>`;
    markArr[i].bindPopup(`<b>Details:${linkText}</b>`);
  }
}
