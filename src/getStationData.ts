function getURLParam(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");

  const regexS = `[\\?&amp;]${name}=([^&amp;#]*)`,
    regex = new RegExp(regexS),
    results = regex.exec(window.location.href);

  if (results === null) return "";
  else return results[1];
}

const stationName = getURLParam("station");
let html = "";

const xhr1 = new XMLHttpRequest();
xhr1.open("GET", "./xml/stations.xml");
xhr1.overrideMimeType("text/xml");
xhr1.onload = function () {
  if (xhr1.readyState === xhr1.DONE && xhr1.status === 200) {
    console.log(xhr1.responseXML);
    details(xhr1.responseXML);
  }
};

xhr1.send();

function details(xml) {
  const stations = xml.getElementsByTagName("station");
  for (let i = 0; i < stations.length; i++) {
    if (
      stations[i].getElementsByTagName("name")[0].childNodes[0].nodeValue ===
      stationName
    ) {
      html =
        ` <p>${stationName}</p><table id='detailsTable'><thead>` +
        "  <tr>" +
        "    <th>Year</th>" +
        "    <th>Temp</th>" +
        "  </tr></thead>";
      const [data] = stations[i].getElementsByTagName("data");
      for (let j = 0; j < data.getElementsByTagName("set").length; j++) {
        const set = data.getElementsByTagName("set")[j];
        html +=
          `${"<tr>\n" + "<td>"}${
            set.getElementsByTagName("year")[0].childNodes[0].nodeValue
          }</td>` +
          `<td>${
            set.getElementsByTagName("temp")[0].childNodes[0].nodeValue
          }</td>` +
          "</tr>";
      }
      break;
    }
  }
  html += "</table>";
  document.getElementById("content").innerHTML = html;
  document.title = `Details ${stationName}`;
}
