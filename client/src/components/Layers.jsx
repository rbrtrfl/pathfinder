import React, { useEffect, useState } from 'react';
import {
  Marker, GeoJSON, CircleMarker,
} from 'react-leaflet';
import L from 'leaflet';
import GpxParser from 'gpxparser';
import DrawRoute from './DrawRoute';

function Layers({ selectedTrack, myTracks, menuItem }) {
  const [displayedTrack, setDisplayedTrack] = useState(null);
  const [endPoints, setEndPoints] = useState({});

  useEffect(() => {
    if (selectedTrack) {
      const trackData = myTracks.find((element) => element._id === selectedTrack);
      const gpx = new GpxParser();
      gpx.parse(trackData.track);
      console.log(gpx);
      setDisplayedTrack(gpx);

      const allPoints = gpx.tracks.map((track) => track.points.map((p) => [p.lat, p.lon])).flat(); // eslint-disable-line
      setEndPoints([allPoints[0], allPoints[allPoints.length - 1]]);
    }
  }, []);

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
              radius={20}
            />
            <Marker
              position={endPoints[0]}
              icon={createMarker('A')}
            />

            <CircleMarker
              center={endPoints[1]}
              pathOptions={{ color: 'red' }}
              radius={20}
            />
            <Marker
              position={endPoints[1]}
              icon={createMarker('B')}
            />
            <GeoJSON
              data={displayedTrack.toGeoJSON()}
              pathOptions={{ color: 'red' }}
            />
          </div>
        )
        : ''}
      {(menuItem === 'drawroute') ? <DrawRoute /> : ''}
    </div>
  );
}

export default Layers;
