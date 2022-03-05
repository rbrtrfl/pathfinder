const baseUrlDb = 'http://127.0.0.1:4000';
const baseUrlMapbox = 'https://api.mapbox.com/directions/v5/mapbox/walking/';
const token = 'pk.eyJ1IjoicmJydHJmbCIsImEiOiJja3p5Mjd6cmowN2JjMnZtbzE4emFuYnE1In0.h6w9OdIpTljCcOVWzexbtw';

export function getAll() {
  return fetch(`${baseUrlDb}/tracks`)
    .then((data) => data.json())
    .catch((error) => console.error(error)); // eslint-disable-line no-console
}

export function postTrack(file) {
  const dbEntry = {
    track: file,
  };

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
