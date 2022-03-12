import { GeoJSON } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import CustomMarker from './CustomMarker';

function Track({ selectedTrack, myTracks, menuItem }) {
  const [displayedTrack, setDisplayedTrack] = useState(null);
  const [endPoints, setEndPoints] = useState({});

  useEffect(() => {
    if (selectedTrack) {
      const { geojson } = myTracks.find((element) => element._id === selectedTrack);
      setDisplayedTrack(geojson);
      const allPoints = geojson.features.map((feature) => feature.geometry.coordinates.map((c) => [c[1], c[0]])).flat(); // eslint-disable-line
      setEndPoints([allPoints[0], allPoints[allPoints.length - 1]]);
    }
  }, [selectedTrack]);
  return (
    (displayedTrack)
      && (
      <div>
        <CustomMarker
          position={endPoints[0]}
          letter="A"
          color={menuItem === 'enroute' ? 'purple' : 'red'}
        />
        <CustomMarker
          position={endPoints[1]}
          letter="B"
          color={menuItem === 'enroute' ? 'purple' : 'red'}
        />
        <GeoJSON
          data={displayedTrack}
          pathOptions={{ color: 'red' }}
        />
      </div>
      ));
}

export default Track;
