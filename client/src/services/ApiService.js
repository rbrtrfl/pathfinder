import GpxParser from 'gpxparser';

const baseurl = 'http://127.0.0.1:4000';

export function getAll() {
  return fetch(`${baseurl}/tracks`)
    .then((data) => data.json())
    .catch((error) => console.error(error));
}

export function postTrack(file) {
  // const gpx = new GpxParser();
  // gpx.parse(file);
  // console.log(gpx);
  const data = {
    track: file,
  };

  return fetch(`${baseurl}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((data) => data.json())
    .catch((error) => console.error(error));
}
