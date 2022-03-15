import React, { useContext, useEffect, useState } from 'react';
import { CircleMarker, Marker, Polyline } from 'react-leaflet';
import * as turf from '@turf/turf';
import { TracksContext } from '../contexts/Contexts';
import './EnRoute.css';
import getDestinations from '../tools/Calculations';
import CustomMarker from '../components/CustomMarker';
import { coordinatesToGeoJSON } from '../tools/Helpers';
import Track from '../components/Track';

function EnRoute() {
  const { selectedTrack, myTracks } = useContext(TracksContext);

  const location = [46.880946592687366, 8.997399356476118];

  const [closestPoint, setClosestPoint] = useState(location);
  const [pastTrack, setPastTrack] = useState(null);
  const [futureGeoJSON, setFutureGeoJSON] = useState(null);
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    if (selectedTrack) {
      const { geojson } = myTracks.find((element) => element._id === selectedTrack);
      // returns an array of 2d coordinates (omits the optional third number, which is elevation)
      const points = geojson.features.map((feature) => feature.geometry.coordinates.map((c) => [c[1], c[0]])).flat(); // eslint-disable-line
      const geometryFlat = geojson.features.map((feature) => feature.geometry.coordinates).flat();

      const line = turf.lineString(points);
      const closest = turf.nearestPointOnLine(line, location, { units: 'kilometers' });

      setClosestPoint(closest.geometry.coordinates);

      setPastTrack(points.slice(0, closest.properties.index));

      const geoJSONSection = coordinatesToGeoJSON(geometryFlat.slice(closest.properties.index));
      setFutureGeoJSON(geoJSONSection);
      setDestinations(getDestinations(geoJSONSection));
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
      {destinations
        && destinations.map((item, index) => (
          <CustomMarker
            key={index}
            // flip coordinates
            position={[item[1], item[0]]}
            string={item[2]}
            color="purple"
            type="oval"
          />
        ))}
      {(pastTrack
          && <Polyline pathOptions={{ color: 'purple', dashArray: '5,10' }} positions={pastTrack} />
          )}
      {(futureGeoJSON
          && (
          <Track
            geojson={futureGeoJSON}
            color="purple"
          />
          )
          )}
    </div>
  );
}

export default EnRoute;
