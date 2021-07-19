<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="root">
        <html lang="de">
            <head>
                <meta charset="UTF-8"/>
                <title>Klimakarte (DHBW Webproject)</title>
                                <link rel="icon" href="../../assets/images/favicon.ico"/>
                <link rel="stylesheet" href="../../style/globalStyle.css" type="text/css"/>
                <link rel="stylesheet" href="../../style/indexStyle.css" type="text/css"/>
                <!--This font is for icons-->
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
            </head>
            <body>
                <nav>
                    <!--Navigationsleiste/Menuebar der Seite-->
                    <div class="logo">
                        <h4>Climatic Map</h4>
                    </div>
                    <ul class="nav-links">
                        <li>
                            <a class="active" href="../../index.html">Home</a>
                        </li>
                        <li>
                            <a href="../team/team.xml">Über Uns</a>
                        </li>
                        <li>
                            <a href="#">Über Diese Seite</a>
                        </li>
                    </ul>
                    <div class="burger">
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="line3"></div>
                    </div>
                </nav>
                <main class="flexFlowX_CenterXY">
                    <!--Hauptinhalt der Seite-->
                    <article class="flexFlowY_CenterXY">
                        <img class="" src="../../assets/images/team.png" height="200px" alt="Team"/>
                        <p style="text-align: justify; margin: 10px">Herzlich Willkommen bei unserem Web-Engineering / Projektmanagement - Programmierprojekt. Unter HOME finden Sie eine Karte von allen 677 deutschen Wetterstationen als Marker. Wenn Sie eine Station auswählen, öffnet sich ein Popup mit einem Link zu der korrespondierenden Detailsseite mit den Temperaturdaten von 1970 bis heute. Auf dieser Detailseite befindet sich dann ein Link zum Diagramm für die Temperaturentwicklung.</p>
                            <div class="card-link">
                                <a href="../../index.html" class="btn btn-primary" style="margin-bottom: 5px">Home</a>
                            </div>
                    </article>
                </main>
                <footer class="flexFlowX_SpaceBetween">
                    <!--Fußzeile der Seite-->
                    <p class="flexFlowX_CenterXY">Wetterkarte von DHBW Karlsruhe Studenten</p>
                    <div class="flexFlowX_CenterXY">
                        <a class="" href="https://github.com/Michael-Rienessl/dhbw-webproject" target="_blank"><img
                                src="../../assets/icons/github.png" alt="Git Icon" /></a>
                        <a class="" href="https://www.karlsruhe.dhbw.de/bachelor/fakultaet-technik/allgemein.html"
                           target="_blank"><img src="../../assets/icons/DHBW.png" alt="DHBW Icon"/></a>
                    </div>
                </footer>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>