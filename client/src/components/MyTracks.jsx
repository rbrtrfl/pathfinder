import React from 'react';
import './MyTracks.css';
import MyTracksItem from './MyTracksItem';
import FileUploadForm from './FileUploadForm';

function MyTracks({ myTracks, selectedTrack, setSelectedTrack }) {
  function setChosen(id) { // eslint-disable-line
    console.log(id);
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
