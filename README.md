[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# pathfinder

Plan your hiking adventures, multi-day-hikes and through-hikes and organize upcoming hiking days according to your progress.

## Main Menu

### Map
Explore your surroundings through zooming and panning. There are five different tile layers to chose from (top right button):
- Thunderforest Landscape
- Open Topo Map
- Esri World Imagery
- Swiss Federal Geoportal - National Mao Color
- Swiss Federal Geoportal - Swissimage

### My Tracks
Display a list of your tracks with detailed information. You can select a track to display it on the map. The form allows you to upload tracks from your device in gpx file format.

### En Route
*En Route* is the core component of pathfinder. It tracks your current location and finds its closest point on an active track. Since tracks have a direction, the track visually divided into two sections: the finished and the upcoming section. On the upcoming section, markers indicate the estimated time of arrival in a given interval.
*En Route* requires a track from your *My Tracks* lis to be selected.

### Draw
Plan new tracks. Draw a route with multiple waypoints and convert it into a track, following mapped paths. The new track is automatically added to *My Tracks*.

### Settings
Adjust settings for *En Route*. Define start and end of each hiking day and a buffer for breaks. Those settings will affect the markers in *En Route*.
Show the functinctionality of *En Route* to your friends without the need of your current location.

## Dev Info

The app uses React on the front end and Express on the back end. You need a MongoDB database running. Mock data can be populated by running `todo`. EsLint configuration files are present in both `client`and `server`folder.
To get started, run `npm i` inside the root, client and server folder. Run `nodemon`inside the server folder to start the back end. Run `npm start` inside the client folder to start the front end.

### .env file example *client*

```
REACT_APP_MAPBOX_TOKEN=
REACT_APP_THUNDERFOREST_TOKEN=
REACT_APP_DB_HOST=
REACT_APP_DB_PORT=
```

### .env file example *server*

```
DB_HOST=
DB_PORT=
DB_PASS=
DB_USER=

EXPRESS_HOST=
EXPRESS_PORT=

```