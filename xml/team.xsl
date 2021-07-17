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
            </head>
            <body>
                <nav>
                    <div class="logo">
                        <h4>The Nav</h4>
                    </div>
                    <ul class="nav-links">
                        <li>
                            <a class="active" href="../../index.html">Home</a>
                        </li>
                        <li>
                            <a href="#">About Us</a>
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
                <div class="slidershow middle">
                    <div class="slides">
                        <input type="radio" name="r" id="r1" checked="true" />
                        <input type="radio" name="r" id="r2"/>
                        <input type="radio" name="r" id="r3"/>
                        <input type="radio" name="r" id="r4"/>
                        <input type="radio" name="r" id="r5"/>
                        <div class="slide s1">
                            <a href="https://github.com/Reichmann-M">
                                <img src="../../assets/images/team/max.jpg" title="Max Reichmann"/>
                            </a>
                        </div>
                        <div class="slide">
                            <a href="https://github.com/Niklas227">    
                                <img src="../../assets/images/team/niklas.jpg" title="Niklas Wagner"/>
                            </a>
                        </div>
                        <div class="slide">
                            <a href="https://github.com/Michael-Rienessl">
                                <img src="../../assets/images/team/michael.jpg" title="Michael Rienessl"/>
                            </a>
                        </div>
                        <div class="slide">
                            <a href="https://github.com/BluefireXD">
                                <img src="../../assets/images/team/patrick.jpg" title="Patrick Glatt"/>
                            </a>
                        </div>
                        <div class="slide">
                            <a href="https://github.com/sdertman">
                                <img src="../../assets/images/team/oemer.jpg" title="Ömer Güler"/>
                            </a>
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
                <script src="../../js/app.js"/>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>