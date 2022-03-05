import React, { useEffect, useState, useContext } from 'react';
import GpxParser from 'gpxparser';

import L from 'leaflet';
import MyTracksItem from './MyTracksItem';
import './MyTracks.css';
import FileUploadForm from './FileUploadForm';

function MyTracks({ myTracks, selectedTrack, setSelectedTrack }) {

  function setChosen(data) { // eslint-disable-line
    const gpx = new GpxParser();
    gpx.parse(data.track);

    const item = {
      _id: data._id,
      gpx,
    };
    
    if (item._id === selectedTrack._id) {
      return setSelectedTrack({});
    }
    setSelectedTrack(item);
  }

  return (
    <div>
      MyTracks
      <ul className="track-list-scroll">
        {myTracks.map((item) => (
          <MyTracksItem
            key={item._id}
            data={item.track}
            active={item._id === selectedTrack._id}
            setChosen={() => setChosen(item)}
          />
        ))}
      </ul>
      <FileUploadForm />
    </div>
  );
}

export default MyTracks;
