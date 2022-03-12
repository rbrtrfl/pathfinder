import React from 'react';
import { GeoJSON } from 'react-leaflet';
import CustomMarker from './CustomMarker';
import { getEndPoints } from '../tools/Helpers';

function Track({ geojson, color }) {
  return (
    <div>
      <CustomMarker
        position={getEndPoints(geojson)[0]}
        letter="ABC"
        color={color}
      />
      <CustomMarker
        position={getEndPoints(geojson)[1]}
        letter="B"
        color={color}
      />
      <GeoJSON
        data={geojson}
        pathOptions={{ color }}
      />
    </div>
  );
}

export default Track;
