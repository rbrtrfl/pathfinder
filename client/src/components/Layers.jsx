import React, { useEffect, useState } from 'react';
import {
  Marker, GeoJSON, CircleMarker,
} from 'react-leaflet';
import L from 'leaflet';
import DrawRoute from './DrawRoute';
import EnRoute from './EnRoute';

function Layers({ selectedTrack, myTracks, menuItem }) {
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

  // TODO: make the markers look good
  function createMarker(letter) {
    return new L.divIcon({ // eslint-disable-line
      html: `<svg><text x="100" y="100" fill="white">${letter}</text></svg>`,
      iconAnchor: [109, 92],
      className: 'marker',
    });
  }

  return (
    <div>
      {(displayedTrack)
        ? (
          <div>
            <CircleMarker
              center={endPoints[0]}
              pathOptions={{ color: 'red' }}
              radius={15}
            />
            <Marker
              position={endPoints[0]}
              icon={createMarker('A')}
            />

            <CircleMarker
              center={endPoints[1]}
              pathOptions={{ color: 'red' }}
              radius={15}
            />
            <Marker
              position={endPoints[1]}
              icon={createMarker('B')}
            />
            {(menuItem === 'enroute') ? ''
              : (
                <GeoJSON
                  data={displayedTrack}
                  pathOptions={{ color: 'red' }}
                />
              )}
          </div>
        )
        : ''}
      {(menuItem === 'drawroute') ? <DrawRoute /> : ''}
      {(menuItem === 'enroute') ? <EnRoute /> : ''}
    </div>
  );
}

export default Layers;
