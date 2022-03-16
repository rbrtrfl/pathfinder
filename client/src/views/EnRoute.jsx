import React, { useContext, useEffect, useState } from 'react';
import { Marker, Polyline } from 'react-leaflet';
import * as turf from '@turf/turf';
import { TracksContext } from '../contexts/Contexts';
import './EnRoute.css';
import getDestinations from '../tools/TimeCalculations';
import CustomMarker from '../components/CustomMarker';
import { coordinatesToGeoJSON } from '../tools/Helpers';

function EnRoute() {
  const { selectedTrack, myTracks } = useContext(TracksContext);

  const location = [46.880946592687366, 8.997399356476118];

  const [pastTrack, setPastTrack] = useState(null);
  const [destinations, setDestinations] = useState(null);
  const [sections, setSections] = useState(null);

  useEffect(() => {
    if (selectedTrack) {
      const { geojson } = myTracks.find((element) => element._id === selectedTrack);
      // returns an array of 2d coordinates (omits the optional third number, which is elevation)
      const points2dFlat = geojson.features.map((feature) => feature.geometry.coordinates.map((c) => [c[1], c[0]])).flat(); // eslint-disable-line
      const line = turf.lineString(points2dFlat);
      const closest = turf.nearestPointOnLine(line, location, { units: 'kilometers' }).properties.index;
      setPastTrack(points2dFlat.slice(0, closest));

      const points3dFlat = geojson.features.map((feature) => feature.geometry.coordinates.map((c) => c)).flat(); // eslint-disable-line
      const futureGeoJSON = coordinatesToGeoJSON(points3dFlat.slice(closest));
      const splitTrack = getDestinations(futureGeoJSON);
      setSections(splitTrack.sections);
      setDestinations(splitTrack.locations);
    }
  }, []);

  function createMarker() {
    return new L.divIcon({ // eslint-disable-line
      html: '<svg><text x="100" y="100" fill="blue">⦿</text></svg>',
      iconAnchor: [111, 91],
      className: 'fade',
    });
  }

  return (
    <div>

      <Marker position={location} icon={createMarker()} />

      {(pastTrack
          && <Polyline pathOptions={{ color: 'purple', dashArray: '5,10' }} positions={pastTrack} />
          )}

      {sections
        && sections.map((item, index) => (
          <Polyline
            key={index}
            pathOptions={{ color: item.color }}
            positions={item.positions.map((point) => [point[1], point[0]])}
          />
        ))}

      {destinations
        && destinations.map((item, index) => (
          <CustomMarker
            key={index}
            // flip coordinates
            position={[item.position[1], item.position[0]]}
            string={item.time}
            color={item.color}
            type="oval"
          />
        ))}
    </div>
  );
}

export default EnRoute;
