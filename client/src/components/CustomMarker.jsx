import React from 'react';
import { CircleMarker, Marker } from 'react-leaflet';

function CustomMarker({ position, letter, color }) {

  function createMarker(letter) {
      return new L.divIcon({ // eslint-disable-line
      html: `<svg><text x="100" y="100" fill="white">${letter}</text></svg>`,
      iconAnchor: [105.5, 94.5],
      className: 'marker',
    });
  }

  return (
    <div>
      <CircleMarker
        center={position}
        pathOptions={{ color, fillColor: color, fillOpacity: 1 }}
        radius={10}
      />
      <Marker
        position={position}
        icon={createMarker(letter)}
      />
    </div>
  );
}

export default CustomMarker;
