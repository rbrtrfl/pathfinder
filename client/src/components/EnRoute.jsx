import React from 'react';
import { CircleMarker, Marker } from 'react-leaflet';

function EnRoute() {
  const center = [46.86765904130082, 9.008682069560534];
  return (
    <div>
      <Marker position={center} />
      <CircleMarker
        center={center}
        pathOptions={{ color: 'blue' }}
        radius={20}
      />
    </div>
  );
}

export default EnRoute;
