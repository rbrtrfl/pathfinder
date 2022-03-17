const baseUrlDb = `http://${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}`;
const baseUrlMapbox = 'https://api.mapbox.com/directions/v5/mapbox/walking/';
const baseUrlOSRM = 'http://router.project-osrm.org/match/v1/foot/';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

export function getAll() {
  return fetch(`${baseUrlDb}/tracks`)
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}

export function postTrack(file) {
  const dbEntry = {
    geojson: {
      properties: {
        name: file.features[0].properties.name,
      },
    },
  };
  Object.assign(dbEntry.geojson, file);
  console.log(dbEntry);
  // if (!dbEntry.geojson.properties.name) {
  //   dbEntry.geojson.properties.name = dbEntry.geojson.features[0].properties.name;
  // }
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

export function routeMapbox(coordinates) {
  console.log(coordinates);
  return fetch(`${baseUrlMapbox}${coordinates}?access_token=${mapboxToken}&geometries=geojson`)
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}

export function routeOSRM(coordinates) {
  return fetch(`${baseUrlOSRM}${coordinates}?geometries=geojson`)
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}
