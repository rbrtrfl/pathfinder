const baseurl = 'http://127.0.0.1:4000'

export function getAll() {
return fetch(`${baseurl}/tracks`)
.then((data) => data.json())
.catch((error) => console.error(error));
}

export function postTrack(gpx) {
return fetch(`${baseurl}/tracks`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: gpx
})
.then((data) => data.json())
.catch((error) => console.error(error));
}
