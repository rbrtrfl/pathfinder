import GpxParser from 'gpxparser';

const baseUrlDb = `http://${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}`;
const baseUrlMapbox = 'https://api.mapbox.com/directions/v5/mapbox/walking/';
const token = process.env.REACT_APP_MAPBOX_TOKEN;

export function getAll() {
  return fetch(`${baseUrlDb}/tracks`)
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}

export function postTrack(file) {
  const gpx = new GpxParser();
  gpx.parse(file);
  const dbEntry = {
    geojson: gpx.toGeoJSON(),
  };
  if (!dbEntry.geojson.properties.name) {
    dbEntry.geojson.properties.name = dbEntry.geojson.features[0].properties.name;
  }
  return fetch(`${baseUrlDb}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbEntry),
  })
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}

export function postRoute(geojson, name) {
  const dbEntry = {
    geojson,
  };
  return fetch(`${baseUrlDb}/route`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbEntry),
  })
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}

export function route(coordinates) {
  return fetch(`${baseUrlMapbox}${coordinates}?access_token=${token}&geometries=geojson`)
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}
