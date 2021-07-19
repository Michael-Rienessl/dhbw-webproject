<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="root">
        <html>
            <head>
                <title>About Us</title>
                <link rel="icon" href="../../assets/images/favicon.ico"/>
                <link rel="stylesheet" href="../../style/globalStyle.css" type="text/css"/>
                <link rel="stylesheet" href="../../style/indexStyle.css" type="text/css"/>
                <!--This font is for icons-->
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                <style>
                .about-header {
                    margin-top: 60px;
                    text-align: center;
                }      
                </style>
            </head>
            <body>
                <nav>
                    <div class="logo">
                        <h4>Climatic Map</h4>
                    </div>
                    <ul class="nav-links">
                        <li>
                            <a class="active" href="../../index.html">Home</a>
                        </li>
                        <li>
                            <a href="#">About Us</a>
                        </li>
                        <li>
                            <a href="../../sites/project.html">About This Page</a>
                        </li>
                    </ul>
                    <div class="burger">
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="line3"></div>
                    </div>
                </nav>
                <div class="about-header">
                    <h1>Das Team</h1>
                </div>
                <div class="slidershow middle">
                    <div class="slides">
                        <input type="radio" name="r" id="r1" checked="true" />
                        <input type="radio" name="r" id="r2"/>
                        <input type="radio" name="r" id="r3"/>
                        <input type="radio" name="r" id="r4"/>
                        <input type="radio" name="r" id="r5"/>
                        <div class="slide s1">
                            <div class="img-container">
                            <a href="https://github.com/Reichmann-M">
                                <img class="slide-image" src="https://github.com/reichmann-m.png" title="Max Reichmann"/>
                                <div class="img-overlay">
                                    <div class="git-name">Max Reichmann</div>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div class="slide">
                            <div class="img-container">
                            <a href="https://github.com/Niklas227">    
                                <img class="slide-image" src="https://github.com/niklas227.png" title="Niklas Wagner"/>
                                <div class="img-overlay">
                                    <div class="git-name">Niklas Wagner</div>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div class="slide">
                            <div class="img-container">
                            <a href="https://github.com/Michael-Rienessl">
                                <img class="slide-image" src="https://github.com/Michael-Rienessl.png" title="Michael Rienessl"/>
                                <div class="img-overlay">
                                    <div class="git-name">Michael Rienessl</div>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div class="slide">
                            <div class="img-container">
                            <a href="https://github.com/BluefireXD">
                                <img class="slide-image" src="https://github.com/BluefireXD.png" title="Patrick Glatt"/>
                                <div class="img-overlay">
                                    <div class="git-name">Patrick Glatt</div>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div class="slide">
                            <div class="img-container">
                            <a href="https://github.com/sdertman">
                                <img class="slide-image" src="https://github.com/sdertman.png" title="Ömer Güler"/>
                                <div class="img-overlay">
                                    <div class="git-name">Ömer Güler</div>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div class="navigation">
                            <label for="r1" class="bar"></label>
                            <label for="r2" class="bar"></label>
                            <label for="r3" class="bar"></label>
                            <label for="r4" class="bar"></label>
                            <label for="r5" class="bar"></label>
                        </div>
                    </div>
                </div>
                <footer class="flexFlowX_SpaceBetween">
                    <!--Fußzeile der Seite-->
                    <p class="flexFlowX_CenterXY">Climatic map by students of DHBW Karlsruhe</p>
                    <div class="flexFlowX_CenterXY">
                        <a class="" href="https://github.com/Michael-Rienessl/dhbw-webproject" target="_blank"><img
                                src="../../assets/icons/github.png" alt="Git Icon" /></a>
                        <a class="" href="https://www.karlsruhe.dhbw.de/bachelor/fakultaet-technik/allgemein.html"
                           target="_blank"><img src="../../assets/icons/DHBW.png" alt="DHBW Icon"/></a>
                    </div>
                </footer>
                <script src="../../js/app.js"/>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>