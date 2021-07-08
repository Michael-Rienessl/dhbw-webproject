// File to create spef details XML for every station

const fs = require('fs');
const filteredYearStationDataJSON = JSON.parse(fs.readFileSync('dev_helper/filteredYearStationData.json'));



const xml_begin = `<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet type="text/xsl" href="../graphs.xsl"?>
<!DOCTYPE super [
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
    <!ELEMENT TAVG (#PCDATA)>\n`;


filteredYearStationDataJSON.forEach(station => {
    let spefStationPart = `
    <!ENTITY data SYSTEM "../stations/${station.id}.xml">
    ]>
    
    <super>
        &data;
    </super>`

    
    fs.writeFileSync(`xml/graph_stations/${station.id}.xml`,xml_begin+spefStationPart);
});


