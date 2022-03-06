import React from 'react';

import MyTracksItem from './MyTracksItem';
import './MyTracks.css';
import FileUploadForm from './FileUploadForm';

function MyTracks({ myTracks, selectedTrack, setSelectedTrack }) {
  function setChosen(id) { // eslint-disable-line
    if (id === selectedTrack) {
      return setSelectedTrack(null);
    }
    setSelectedTrack(id);
  }

  return (
    <div>
      MyTracks
      <ul className="track-list-scroll">
        {myTracks.map((item) => (
          <MyTracksItem
            key={item._id}
            data={item.geojson}
            active={item._id === selectedTrack}
            setChosen={() => setChosen(item._id)}
          />
        ))}
      </ul>
      <FileUploadForm />
    </div>
  );
}

export default MyTracks;
