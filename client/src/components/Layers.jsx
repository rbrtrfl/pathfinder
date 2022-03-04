import React, { useContext } from 'react'
import { Polyline, Marker } from 'react-leaflet';

import { ActiveTrack } from './MainContainer'

function Layers() {

  const { selectedTrack, setSelectedTrack } = useContext(ActiveTrack);
  let trackSelected = (Object.keys(selectedTrack).length);

  // const positions = (trackSelected)
  //   ? selectedTrack.gpx.tracks[0].points.map((p) => [p.lat, p.lon])
  //   : null;
  const positions = (trackSelected)
    ? selectedTrack.gpx.tracks.map((track) => track.points.map((p) => [p.lat, p.lon])).flat()
    : null;
  console.log(positions);


  return (
    <div>Layers
      {(trackSelected) ?
      <Polyline
        pathOptions={{color: 'red' }}
        positions={positions}
      >
      </Polyline>
      : ''}
    </div>
  )
}

export default Layers