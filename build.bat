@echo off
if not exist "./dist" mkdir "./dist"
echo "------> Created dist folder ✅"

call tsc
echo "------> Compiled typescript ✅"

copy .\js\getStationData.js .\dist\
copy .\src\map.js .\dist\
echo "------> Copied src scripts into dist folder ✅"