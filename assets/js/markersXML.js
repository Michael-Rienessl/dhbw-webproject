var xhr = new XMLHttpRequest();
xhr.open('GET', './assets/xml/stations.xml');
xhr.overrideMimeType('text/xml');
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        console.log(xhr.responseXML)
        markers(xhr.responseXML);
    }
};

xhr.send();

function markers(xml) {
    var stations = xml.getElementsByTagName("station");
    console.log(stations)
    markArr = []
    for (let i = 0; i < stations.length; i++){
        let name = stations[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        let lat = stations[i].getElementsByTagName("lat")[0].childNodes[0].nodeValue;
        let lon = stations[i].getElementsByTagName("lon")[0].childNodes[0].nodeValue;
        markArr[i]= L.marker([lat, lon]).addTo(Karte);
        let linkText = "<a href=\x22details.html?station="+name+"\x22>"+name+"</a>"
        markArr[i].bindPopup("<b>Details:"+linkText+"</b>")
    }
}