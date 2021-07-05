const fs = require('fs')

const station_id_list = JSON.parse(fs.readFileSync('./station_id_list.json'))

let germanStationIDs = []
station_id_list.forEach(station => {
    if (station.key.startsWith('GM')) germanStationIDs.push(station.key)
});

fs.writeFileSync('german_station_id_list.json', JSON.stringify(germanStationIDs))