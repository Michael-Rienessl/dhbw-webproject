// File to create XML for every station

const fs = require('fs');
const filteredYearStationDataJSON = JSON.parse(fs.readFileSync('dev_helper/filteredYearStationData.json'));



const xml_begin = `<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet type="text/xsl" href="../details.xsl"?>
<!DOCTYPE root [
        <!ELEMENT root (id|name|lat|lon|ele|year)*>
        <!ELEMENT id (#PCDATA)>
        <!ELEMENT name (#PCDATA)>
        <!ELEMENT lat (#PCDATA)>
        <!ELEMENT lon (#PCDATA)>
        <!ELEMENT ele (#PCDATA)>
        <!ELEMENT year (date|EMNT|EMXT|TMAX|TMIN|TAVG)*>
        <!ELEMENT date (#PCDATA)>
        <!ELEMENT EMNT (#PCDATA)>
        <!ELEMENT EMXT (#PCDATA)>
        <!ELEMENT TMAX (#PCDATA)>
        <!ELEMENT TMIN (#PCDATA)>
        <!ELEMENT TAVG (#PCDATA)>
        ]>
<root>`;


filteredYearStationDataJSON.forEach(station => {
    let spefStationPart = `
    <id>${station.id}</id>
    <name>${station.name}</name>
    <lat>${station.lat}</lat>
    <lon>${station.lon}</lon>
    <ele>${station.ele}</ele>`

    station.data.forEach(yearData => {
        spefStationPart += `
    <year>
        <date>${yearData.year}</date>
        <EMNT>${yearData.emnt}</EMNT>
        <EMXT>${yearData.emxt}</EMXT>
        <TMAX>${yearData.tmax}</TMAX>
        <TMIN>${yearData.tmin}</TMIN>
        <TAVG>${yearData.tavg}</TAVG>
    </year>`
    });

    fs.writeFileSync(`xml/stations/${station.id}.xml`, xml_begin+spefStationPart+'\n</root>');
});


