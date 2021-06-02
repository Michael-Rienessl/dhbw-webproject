fetch('./assets/json/station1.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        markArr = []
        for (let i=0; i<data.length;i++){
            markArr[i]= L.marker([data[i].LATITUDE, data[i].LONGITUDE]).addTo(Karte);
            let linkText = "<a href=\x22details.html?station="+data[i].STATION+"\x22>"+data[i].STATION+"</a>"
            markArr[i].bindPopup("<b>Details:"+linkText+"</b>")
        }
    })
    .catch(err => console.error(err));