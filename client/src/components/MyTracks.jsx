import React, { useState } from 'react'
import GpxParser from 'gpxparser'
import MyTracksItem from './MyTracksItem'
import { db } from '../db/db.mocks';
import './MyTracks.css';

function MyTracks() {

  const [chosen, setChosen] = useState(null);
  const mockdata = [];

  db.forEach((element, index) => {
    const gpx = new GpxParser();
    gpx.parse(element);
    mockdata.push({
      index,
      gpx
    });
  });
  // const positions = gpx.tracks[0].points.map((p) => [p.lat, p.lon]);

  return (
    <div>MyTracks
      <ul>
          {mockdata.map((item) => {
            return (
                <MyTracksItem
                  key={item.index}
                  gpx={item.gpx}
                  active={item.index === chosen}
                  setChosen={() => setChosen(item.index)}
                />
            );
          })}
      </ul>
    </div>
  )
}

export default MyTracks