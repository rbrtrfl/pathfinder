import React, { useContext } from 'react';
import GpxParser from 'gpxparser';
import { gpx } from '@tmcw/togeojson';
import { postTrack } from '../services/ApiService';
import { TracksContext } from '../contexts/Contexts';

function FileUploadForm() {
  const { myTracks, setMyTracks } = useContext(TracksContext);

  function clickHandler(event) {
    event.preventDefault();
    const file = document.getElementById('input').files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.addEventListener('loadend', (data) => {
      const htmlDom = new DOMParser().parseFromString(data.currentTarget.result, 'text/html');
      // console.log(htmlDom.body.innerHTML);
      console.log(typeof htmlDom);
      console.log(gpx(htmlDom));

      const gpy = new GpxParser();
      gpy.parse(data.currentTarget.result);
      console.log(gpy.toGeoJSON());

      // postTrack(gpy.toGeoJSON())
      postTrack(gpx(htmlDom))
        .then((dbResponse) => setMyTracks([...myTracks, dbResponse]));
    });
  // TODO: form reset
  }
  // TODO: form validation
  return (
    <div className="settings-item">
      <form onSubmit={clickHandler}>
        <input type="file" id="input" />
        <button type="submit">UPLOAD</button>
      </form>
    </div>
  );
}

export default FileUploadForm;
