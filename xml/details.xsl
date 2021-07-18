<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="root">
        <html>
            <head>
                <title>Details: <xsl:value-of select="id"/></title>
                <link rel="icon" href="../../assets/images/favicon.ico"/>
                <link rel="stylesheet" href="../../style/globalStyle.css" type="text/css"/>
                <link rel="stylesheet" href="../../style/detailsStyle.css" type="text/css"/>
                <!-- path root is xml file -->
                <!-- leaflet.css und leaflet.js von externer Quelle einbinden -->
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"/>

                <!--Import mapbox css und js-->
                <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css" rel='stylesheet' />
                <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js"/>
                <script src="https://unpkg.com/mapbox-gl-leaflet/leaflet-mapbox-gl.js"/>
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
                            <a class="active" href="../details_stations/{id}.xml">Details</a>
                        </li>
                        <li>
                            <a href="../graph_stations/{id}.xml">Graph</a>
                        </li>
                        <li>
                            <a href="../../xml/team/team.xml">About Us</a>
                        </li>
                        <li>
                            <a href="../sites/project.html">Projects</a>
                        </li>
                    </ul>
                    <div class="burger">
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="line3"></div>
                    </div>
                </nav>
                <main>
                    <div class="detail-header">
                        <h1>Details für <xsl:value-of select="id"/> - <xsl:value-of select="name"/></h1>
                        <p1>Lat: <xsl:value-of select="lat"/>° Lon: <xsl:value-of select="lon"/>° Elevation: <xsl:value-of select="ele"/>m</p1>
                    </div>
                    <div class="detail-body">
                        <div id="table">
                            <table id="detailsTable">
                                <thead>
                                    <tr>
                                        <th>Jahr</th>
                                        <th>Max. Temp.</th>
                                        <th>Min. Temp.</th>
                                        <th>&#x00D8; max. Temp</th>
                                        <th>&#x00D8; Temp</th>
                                        <th>&#x00D8; min. Temp</th>
                                    </tr>
                                </thead>
                                <xsl:for-each select="year">
                                    <xsl:sort select="date"/>
                                    <xsl:if test="EMXT = 'undefined'">
                                        <tr>
                                            <td><xsl:value-of select="date"/></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="EMXT != 'undefined'">
                                        <tr>
                                            <td><xsl:value-of select="date"/></td>
                                            <td><xsl:value-of select="EMXT"/></td>
                                            <td><xsl:value-of select="EMNT"/></td>
                                            <td><xsl:value-of select="TMAX"/></td>
                                            <td><xsl:value-of select="TAVG"/></td>
                                            <td><xsl:value-of select="TMIN"/></td>
                                        </tr>
                                    </xsl:if>
                                </xsl:for-each>
                            </table>
                        </div>
                        <div class="box">
                            <ul class="list-style-none">
                                <li><div id="mapid"/></li>                               
                                <li class="detail-info">
                                    <ul class="detail-links">
                                        <li>
                                            <a class="btn btn-primary" href="../graph_stations/{id}.xml">Graph</a>
                                        </li>
                                        <li>
                                            <a class="btn btn-primary" href="https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&amp;dataTypes=TMIN,TAVG,TMAX,DX90,EMNT,EMXT&amp;stations={id}&amp;startDate=1970-01-01&amp;endDate=2021-12-31&amp;includeAttributes=false&amp;format=pdf&amp;units=metric&amp;&amp;includeStationName=true">PDF</a>
                                        </li>
                                        <li>
                                            <a class="btn btn-primary" href="https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-year&amp;dataTypes=TMIN,TAVG,TMAX,DX90,EMNT,EMXT&amp;stations={id}&amp;startDate=1970-01-01&amp;endDate=2021-12-31&amp;includeAttributes=false&amp;format=csv&amp;units=metric&amp;&amp;includeStationName=true">CSV</a>
                                        </li>
                                    </ul>
                                </li>                               
                            </ul>
                        </div>
                    </div>
                    <script type='text/javascript'>
                        var Karte = L.map('mapid', {
                            dragging: false,
                            scrollWheelZoom: false,
                            zoomControl: false
                        }).setView([<xsl:value-of select="lat"/>, <xsl:value-of select="lon"/>], 8);
                        var glVecTilesMap = L.mapboxGL({
                            accessToken: "pk.eyJ1IjoiaGFubmVsb3JlMSIsImEiOiJja3E1aTNuNHUwcGVlMnBxejlzOTFyeDQ1In0._2lBK8UGU28XwJjLsrh41w",
                            style: "mapbox://styles/mapbox/dark-v10"
                        }).addTo(Karte);
                        L.marker([<xsl:value-of select="lat"/>, <xsl:value-of select="lon"/>]).addTo(Karte);
                    </script>
                </main>
                <footer class="flexFlowX_SpaceBetween"><!--Fußzeile der Seite-->        
                    <p class="flexFlowX_CenterXY">Weathercard by students of DHBW Karlsruhe</p>    
                    <div class="flexFlowX_CenterXY">                 
                        <a class="" href="https://github.com/Michael-Rienessl/dhbw-webproject" target="_blank"><img src="../../assets/icons/github.png" alt="Git Icon"/></a>  
                        <a class="" href="https://www.karlsruhe.dhbw.de/bachelor/fakultaet-technik/allgemein.html" target="_blank"><img src="../../assets/icons/DHBW.png"/></a>   
                    </div>                        
                </footer> 
                <script src="../../js/app.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>