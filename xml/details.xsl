<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="root">
        <html>
            <head>
                <title>Details: <xsl:value-of select="id"/></title>
                <link rel="stylesheet" href="../../style/globalStyle.css" type="text/css"/>
                <link rel="stylesheet" href="../../style/detailsStyle.css" type="text/css"/>
                <!-- path root is xml file -->
            </head>
            <body>
                <nav>
                    <ul>
                        <li><a href="../../index.html">Home</a></li>
                        <li><a href="">Nav2</a></li>
                        <li><a href="">Nav3</a></li>
                        <li><a href="">Nav4</a></li>
                    </ul>
                </nav>
                <h1>Details für <xsl:value-of select="id"/> - <xsl:value-of select="name"/></h1>
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
                        <tr>
                            <td><xsl:value-of select="date"/></td>
                            <td><xsl:value-of select="EMXT"/></td>
                            <td><xsl:value-of select="EMNT"/></td>
                            <td><xsl:value-of select="TMAX"/></td>
                            <td><xsl:value-of select="TAVG"/></td>
                            <td><xsl:value-of select="TMIN"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>