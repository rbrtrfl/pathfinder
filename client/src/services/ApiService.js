import GpxParser from 'gpxparser';

const baseUrlDb = 'http://127.0.0.1:4000';
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
  console.log(dbEntry);

  // TODO: calculate distance, ascent, descent
  if (!dbEntry.geojson.properties.name) dbEntry.geojson.properties.name = 'no name given';

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

export function postRoute(geojson) {
  const dbEntry = {
    geojson,
  };
  console.log(dbEntry);

  // TODO: calculate distance, ascent, descent
  // dbEntry.geojson.properties.name = 'no name given';

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

export function route(coordinates) {
  return fetch(`${baseUrlMapbox}${coordinates}?access_token=${token}&geometries=geojson`)
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}

export function elevation(coordinates) {
  return fetch(`https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/
      ${coordinates}.json?access_token=${token}`)
    .then((data) => data.json())
    .then((data) => console.log('data: ', data)) // eslint-disable-line no-console
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}
