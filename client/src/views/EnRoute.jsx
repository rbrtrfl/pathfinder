import React, { useContext, useEffect, useState } from 'react';
import { CircleMarker, Marker, Polyline } from 'react-leaflet';
import * as turf from '@turf/turf';
import { TracksContext } from '../contexts/Contexts';
import './EnRoute.css';
import getDestinations from '../tools/Calculations';
import CustomMarker from '../components/CustomMarker';

function EnRoute() {
  const location = [46.880946592687366, 8.997399356476118];

  const [closestPoint, setClosestPoint] = useState(location);
  const [pastTrack, setPastTrack] = useState(null);
  const [futureTrack, setFutureTrack] = useState(null);
  const [destinations, setDestinations] = useState(null);

  const { selectedTrack, myTracks } = useContext(TracksContext);

  function distance(p) {
    // calculates distance between two points
    return Math.sqrt((location[0] - p[0]) ** 2 + (location[1] - p[1]) ** 2);
  }

  function pointsArrToGeoJSON(points) {
    return {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: points,
        },
      }],
    };
  }

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
      setFutureTrack(points.slice(closest.properties.index));

      const futureGeoJSON = pointsArrToGeoJSON(geometryFlat.slice(closest.properties.index));
      setDestinations(getDestinations(futureGeoJSON));
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
      <div>
        <Marker position={location} icon={createMarker()} />
      </div>
      <CircleMarker
        center={closestPoint}
        pathOptions={{ color: 'blue' }}
        radius={20}
      />
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
        ? <Polyline pathOptions={{ color: 'purple', dashArray: '5,10' }} positions={pastTrack} />
        : '')}
      {(futureTrack
        ? <Polyline pathOptions={{ color: 'purple' }} positions={futureTrack} />
        : '')}
    </div>
  );
}

export default EnRoute;
