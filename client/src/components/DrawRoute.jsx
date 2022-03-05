import React from 'react';
import { Polyline } from 'react-leaflet';

const polyline = [
  [46.84, 9.02],
  [46.94, 9.02],
  [46.84, 9.12],
];

const limeOptions = { color: 'lime' };

function DrawRoute() {
  return (
    <div>
      <Polyline pathOptions={limeOptions} positions={polyline} />
    </div>
  );
}

export default DrawRoute;
