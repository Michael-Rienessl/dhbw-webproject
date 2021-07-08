var data = {
    labels: years,
    series: [
        tavgs
    ]
};
var temp_diagram = new Chartist.Line('.ct-chart', data, {
    width: 1000,
    height: 400,
    showArea: true,
    low: -5,
    high: 15
});

temp_diagram.on('draw', function(data) {
    if(data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    }
  });