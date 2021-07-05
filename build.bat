@echo off
if not exist "./build/js" mkdir "./build/js"
echo "------> Created js folder ✅"


echo "Copy html to build"
copy .\index.html .\build\
copy .\details.html .\build\


echo "Copy javascript to build"
copy .\js\getStationData.js .\build\js\
copy .\js\map.js .\build\js\
echo "------> Copied js scripts into build/js folder ✅"

echo "Copy css to build"
Xcopy .\style .\build\style /E /C /I /Y

echo "Copy xml to build"
Xcopy .\xml .\build\xml /E /C /I /Y


echo "Copy assets to build"
Xcopy .\assets .\build\assets /E /C /I /Y