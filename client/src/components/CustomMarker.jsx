import React from 'react';
import { Marker } from 'react-leaflet';
import './CustomMarker.css';

function CustomMarker({
  position, string, color, type,
}) {
  function createMarker(text) {
      if (type === 'oval') return new L.divIcon({ // eslint-disable-line
      html: `<div
      class="marker oval"
      style="background-color:${color};">
      ${text}</div>`,
      iconAnchor: [0, 0],
      className: 'empty',
    });

      return new L.divIcon({ // eslint-disable-line
      html: `<div
        class="marker circle"
        style="background-color:${color};">
        ${text}</div>`,
      iconAnchor: [0, 0],
      className: 'empty',
    });
  }

  return (
    <div>
      <Marker
        position={position}
        icon={createMarker(string)}
      />
    </div>
  );
}

export default CustomMarker;
