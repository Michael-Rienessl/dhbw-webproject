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
xhr.open('GET', './xml/stations.xml');
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
            html = " <p>" + stationName + "</p><table id='detailsTable'><thead>" +
                "  <tr>" +
                "    <th>Year</th>" +
                "    <th>Temp</th>" +
                "  </tr></thead>"
            let data = stations[i].getElementsByTagName("data")[0];
            for (let j = 0; j < data.getElementsByTagName("set").length; j++) {
                let set = data.getElementsByTagName("set")[j];
                html += "<tr>\n" +
                    "<td>" + set.getElementsByTagName("year")[0].childNodes[0].nodeValue + "</td>" +
                    "<td>" + set.getElementsByTagName("temp")[0].childNodes[0].nodeValue + "</td>" +
                    "</tr>"
            }
            break;
        }
    }
    html += "</table>"
    document.getElementById("content").innerHTML = html;
    document.title = "Details " + stationName;
}