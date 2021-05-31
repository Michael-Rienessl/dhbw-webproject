fetch('./assets/json/markers.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        markArr = []
        for (let i=0; i<data.length;i++){
          markArr[i]= L.marker([data[i].lat, data[i].lon]).addTo(Karte)
          markArr[i].bindPopup("<b>"+data[i].desc+"</b>")
        }
    })
    .catch(err => console.error(err));