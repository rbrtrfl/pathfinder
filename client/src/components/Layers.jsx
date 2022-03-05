import React from 'react';
import {
  Marker, GeoJSON, CircleMarker, Rectangle,
} from 'react-leaflet';
import L from 'leaflet';

function Layers({ bounds, selectedTrack }) {
  const trackSelected = (Object.keys(selectedTrack).length);

  const positions = (trackSelected)
    ? selectedTrack.gpx.tracks.map((track) => track.points.map((p) => [p.lat, p.lon])).flat()
    : null;
  const markerPositions = (trackSelected) ? [positions[0], positions[positions.length - 1]] : null;

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
      Layers
      {(trackSelected)
        ? (
          <div>
            <Rectangle bounds={bounds} pathOptions={{ color: 'blue' }} />
            <CircleMarker
              center={markerPositions[0]}
              pathOptions={{ color: 'red' }}
              radius={20}
            />
            <Marker
              position={markerPositions[0]}
              icon={createMarker('A')}
            />

            <CircleMarker
              center={markerPositions[1]}
              pathOptions={{ color: 'red' }}
              radius={20}
            />
            <Marker
              position={markerPositions[1]}
              icon={createMarker('B')}
            />
            <GeoJSON
              data={selectedTrack.gpx.toGeoJSON()}
              pathOptions={{ color: 'red' }}
            />
          </div>
        )
        : ''}
    </div>
  );
}

export default Layers;
