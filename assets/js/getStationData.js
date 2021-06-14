

function get_url_param(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

    var regexS = "[\\?&amp;]" + name + "=([^&amp;#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);

    if (results == null)
        return "";
    else
        return results[1];
}

let stationName = get_url_param('station')
let html = "";

var xhr = new XMLHttpRequest();
xhr.open('GET', './assets/xml/stations.xml');
xhr.overrideMimeType('text/xml');
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        console.log(xhr.responseXML)
        details(xhr.responseXML);
    }
};

xhr.send();

function details(xml) {
    var stations = xml.getElementsByTagName("station");
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].getElementsByTagName("name")[0].childNodes[0].nodeValue === stationName) {
           console.log(stations[i].getElementsByTagName("name")[0].childNodes[0].nodeValue)
            break;
        }
    }
}