import React, { useState, useContext } from 'react'
import GpxParser from 'gpxparser'

import MyTracksItem from './MyTracksItem'
import { ActiveTrack } from './MainContainer'
import { db } from '../db/db.mocks';
import './MyTracks.css';

function MyTracks() {

  const { selectedTrack, setSelectedTrack } = useContext(ActiveTrack);
  const mockdata = [];

  db.forEach((element, index) => {
    const gpx = new GpxParser();
    gpx.parse(element);
    mockdata.push({
      index,
      gpx
    });
  });

  function setChosen(item) {
    if (item.index === selectedTrack.index) {
      setSelectedTrack({});
    } else {
      setSelectedTrack(item);
    }
  }

  return (
    <div>MyTracks
      <ul>
          {mockdata.map((item) => {
            return (
                <MyTracksItem
                  key={item.index}
                  gpx={item.gpx}
                  active={item.index === selectedTrack.index}
                  setChosen={() => setChosen(item)}
                />
            );
          })}
      </ul>
    </div>
  )
}

export default MyTracks