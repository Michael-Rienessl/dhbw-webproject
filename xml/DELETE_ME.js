var data = {
    labels: years,
    series: [
        tavgs
    ]
};
new Chartist.Line('.ct-chart', data, {
    width: 1000,
    height: 400,
    showArea: true 
});