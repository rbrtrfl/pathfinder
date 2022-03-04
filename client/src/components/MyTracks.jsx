import React, { useState, useContext } from 'react'
import GpxParser from 'gpxparser'

import MyTracksItem from './MyTracksItem'
import { ActiveTrack } from './MainContainer'
import { db } from '../db/db.mocks';
import './MyTracks.css';
import L from 'leaflet';

function MyTracks({ setBounds }) {

  const mockdata = [];

  db.forEach((element, index) => {
    const gpx = new GpxParser();
    gpx.parse(element);
    mockdata.push({
      index,
      gpx
    });
  });

  const { selectedTrack, setSelectedTrack } = useContext(ActiveTrack);

  function setChosen(item) {
    let trackSelected = (Object.keys(selectedTrack).length);
    if (trackSelected) {
      const track = L.geoJSON(selectedTrack.gpx.toGeoJSON());
      console.log(track.getBounds());
      setBounds([
        [track.getBounds()._southWest.lat, track.getBounds()._southWest.lng],
        [track.getBounds()._northEast.lat, track.getBounds()._northEast.lng],
      ]);
    }
    if (item.index === selectedTrack.index) {
      return setSelectedTrack({});
    }
    setSelectedTrack(item);
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