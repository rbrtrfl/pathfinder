import React, { useContext, useEffect, useState } from 'react';
import { CircleMarker, Marker, Polyline } from 'react-leaflet';
import { TracksContext } from '../contexts/Contexts';
import './EnRoute.css';

function EnRoute() {
  const location = [46.86765904130082, 9.008682069560534];

  const [closestPoint, setClosestPoint] = useState(location);
  const [pastTrack, setPastTrack] = useState(null);
  const [futureTrack, setFutureTrack] = useState(null);

  const { selectedTrack, myTracks } = useContext(TracksContext);

  function distance(p) {
    return Math.sqrt((location[0] - p[0]) ** 2 + (location[1] - p[1]) ** 2);
  }

  useEffect(() => {
    if (selectedTrack) {
      const { geojson } = myTracks.find((element) => element._id === selectedTrack);
      const points = geojson.features.map((feature) => feature.geometry.coordinates.map((c) => [c[1], c[0]])).flat(); // eslint-disable-line
      const closest = points.reduce((a, b, i) => distance(a) < distance(b) ? a : b); // eslint-disable-line
      setClosestPoint(closest);

      const index = points.findIndex((element) => element === closest);
      setPastTrack(points.slice(0, index));
      setFutureTrack(points.slice(index));
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
      <div className="fade">
        <Marker position={location} icon={createMarker()} />
      </div>
      <CircleMarker
        center={closestPoint}
        pathOptions={{ color: 'blue' }}
        radius={20}
      />
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
