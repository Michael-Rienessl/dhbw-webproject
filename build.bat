@echo off
if not exist "./build/dist" mkdir "./build/dist"
echo "------> Created dist folder ✅"

@REM call tsc
@REM echo "------> Compiled typescript ✅"

echo "Copy html to build"
copy .\index.html .\build\
copy .\details.html .\build\


echo "Copy javascript to build"
@REM copy .\js\getStationData.js .\dist\
copy .\src\getStationData.js .\build\dist\
copy .\src\map.js .\build\dist\
echo "------> Copied src scripts into build/dist folder ✅"

echo "Copy css to build"
Xcopy .\style .\build\style /E /C /I

echo "Copy xml to build"
Xcopy .\xml .\build\xml /E /C /I