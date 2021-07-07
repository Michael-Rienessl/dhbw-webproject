<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="root">
        <html>
            <head>
                <title>Graph: <xsl:value-of select="id"/></title>
                <link rel="icon" href="../../assets/images/favicon.ico"/>
                <link rel="stylesheet" href="../../style/globalStyle.css" type="text/css"/>
                <link rel="stylesheet" href="../../style/detailsStyle.css" type="text/css"/>

                <!-- Chartist Import -->
                <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"></link>
                <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>

                
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
                        stroke: #D70206;
                    }
                    .ct-series-a .ct-line:hover {
                        stroke: #ab0205;
                        stroke-width: 5px;
                    }

                    <!-- Färbe Linienpunkte -->
                    .ct-series-a .ct-point {
                        stroke: #D70206;
                    }
                </style>
            </head>
            <body>
                <nav>
                    <ul>
                        <li><a href="../../index.html">Home</a></li>
                        <li><a href="../details_stations/{id}.xml">Details</a></li>
                        <li><a class="active" href="">Graph</a></li>
                        <li><a href="">Nav4</a></li>
                    </ul>
                </nav>
                <h1>Ø-Temp für <xsl:value-of select="name"/> (<xsl:value-of select="id"/>)</h1>
                <p1>Lat: <xsl:value-of select="lat"/>° Lon: <xsl:value-of select="lon"/>° Elevation: <xsl:value-of select="ele"/>m</p1>
                
                <div class="ct-chart"></div>

                <script id="setupScript" type='text/javascript'>
                    var years = []
                    var tavgs = []
                </script>

                <xsl:for-each select="year">
                    <xsl:sort select="date"/>
                    <script type='text/javascript'>
                        <xsl:if test="EMXT != 'undefined'">
                            years.push([<xsl:value-of select="date"/>].toString());
                            tavgs.push([<xsl:value-of select="TAVG"/>].toString());
                        </xsl:if>
                    </script>
                </xsl:for-each>

                <script src="../DELETE_ME.js" id="drawScript" type='text/javascript'/>
                
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>