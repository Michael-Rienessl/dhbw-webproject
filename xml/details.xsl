<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="p1"/>
    <xsl:template match="root">
        <html>
            <head>
                <title>Details: <xsl:value-of select="id"/></title>
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
                    <ul>
                        <li><a href="../../index.html">Home</a></li>
                        <li><a href="../graph_stations/{id}.xml">Graphen</a></li>
                        <li><a href="">Nav3</a></li>
                        <li><a href="">Nav4</a></li>
                    </ul>
                </nav>
                <h1>Details für <xsl:value-of select="id"/> - <xsl:value-of select="name"/></h1>
                <p1>Lat: <xsl:value-of select="lat"/>° Lon: <xsl:value-of select="lon"/>° Elevation: <xsl:value-of select="ele"/>m</p1>
                <div id="row">
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
                <div id="mapid"/>
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
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>