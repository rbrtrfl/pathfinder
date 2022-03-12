import React from 'react';
import { CircleMarker, Marker } from 'react-leaflet';

function CustomMarker({
  position, string, color, type,
}) {
  function createMarker(text) {
      if (type === 'oval') return new L.divIcon({ // eslint-disable-line
      html: `<svg>
      <rect x="97" y="85" width="50" height="20" rx="10" fill="${color}"/>
      <text x="103" y="99.5" fill="white">${text}</text>
      </svg>`,
      iconAnchor: [120, 95.5],
      className: 'marker',
    });

      return new L.divIcon({ // eslint-disable-line
      html: `<svg>
      <circle cx="120" cy="91" r="10" fill="${color}">
      <text x="115" y="99" fill="white">${text}</text>
        </svg>`,
      iconAnchor: [120, 95.5],
      className: 'marker',
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
