<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="root">
        <html>
            <head>
                <title>Graph: <xsl:value-of select="id"/></title>
                <link rel="icon" href="../../assets/images/favicon.ico"/>
                <link rel="stylesheet" href="../../style/globalStyle.css" type="text/css"/>
                <link rel="stylesheet" href="../../style/detailsStyle.css" type="text/css"/>
                <link rel="stylesheet" href="../../style/graphsStyle.css" type="text/css"/>

                <!-- Chartist Import -->
                <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"></link>
                <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
                <!-- Chartist Axis Title Plugin (Fork) Import -->
                <script src="https://reichmann-m.github.io/chartist-plugin-axistitle/src/scripts/chartist-plugin-axistitle.js"></script>


                <style>
                    <!-- Rotiere Jahreszahlen -->
                    .ct-label.ct-label.ct-horizontal {
                        position: fixed;
                        justify-content: flex-end;
                        text-align: right;
                        transform-origin: 100% 0;
                        transform: translate(-100%) rotate(-45deg);
                    }

                    <!-- Färbe Graphenlinie -->
                    .ct-series-a .ct-line {
                        stroke: #15744a;
                    }
                    .ct-series-a .ct-line:hover {
                        stroke: #15744a;
                        stroke-width: 5px;
                    }

                    <!-- Färbe Linienpunkte -->
                    .ct-series-a .ct-point {
                        stroke: #15744a;
                    }

                    .ct-series-a .ct-area, .ct-series-a .ct-slice-donut-solid, .ct-series-a .ct-slice-pie {
                        fill: #15744a;
                    }

                    .ct-grids {
                        color: white
                    }
                    .ct-label {
                        color: white;
                    }
                    .ct-axis-title {
                        fill: white;
                    }
                </style>
            </head>
            <body>
                <nav>
                    <div class="logo">
                        <h4>The Nav</h4>
                    </div>
                    <ul class="nav-links">
                        <li>
                            <a href="../../index.html">Home</a>
                        </li>
                        <li>
                            <a href="../details_stations/{id}.xml">Details</a>
                        </li>
                        <li>
                            <a class="active" href="../graph_stations/{id}.xml">Graph</a>
                        </li>
                        <li>
                            <a href="../team/team.xml">About Us</a>
                        </li>
                        <li>
                            <a href="#">Projects</a>
                        </li>
                    </ul>
                    <div class="burger">
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="line3"></div>
                    </div>
                </nav>
                <div class="graph-header">
                    <h1>Ø-Temp für <xsl:value-of select="name"/> (<xsl:value-of select="id"/>)</h1>
                    <p1>Lat: <xsl:value-of select="lat"/>° Lon: <xsl:value-of select="lon"/>° Elevation: <xsl:value-of select="ele"/>m</p1>
                </div>
                <div class="graph-body">
                    <div class="ct-chart"></div>
                </div>

                <script id="setupScript" type='text/javascript'>
                    var years = []
                    var tavgs = []
                </script>

                <xsl:for-each select="year">
                    <xsl:sort select="date"/>
                    <xsl:if test="EMXT != 'undefined'">
                        <script type='text/javascript'>
                            years.push([<xsl:value-of select="date"/>].toString());
                            tavgs.push([<xsl:value-of select="TAVG"/>].toString());
                        </script>
                </xsl:if>
                </xsl:for-each>

                <script>
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
                        low: 0,
                        high: 13,
                        plugins: [
                            Chartist.plugins.ctAxisTitle({
                                axisY: {
                                    axisTitle: "Ø-Temps in °C",
                                    axisClass: "ct-axis-title",
                                    flipTitle: false
                                }
                            })
                        ]
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
                </script>
                <script src="../../js/app.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>