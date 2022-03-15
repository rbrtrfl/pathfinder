import React, { useContext, useEffect, useState } from 'react';
import { Marker, Polyline } from 'react-leaflet';
import * as turf from '@turf/turf';
import moment from 'moment';
import { TracksContext } from '../contexts/Contexts';
import './EnRoute.css';
import getDestinations from '../tools/TimeCalculations';
import CustomMarker from '../components/CustomMarker';
import { coordinatesToGeoJSON } from '../tools/Helpers';
import Track from '../components/Track';

function EnRoute() {
  const { selectedTrack, myTracks } = useContext(TracksContext);

  const location = [46.880946592687366, 8.997399356476118];
  const endHikingTime = '22:00';
  const startHikingTime = '07:00';
  const breakTime = 0.2;
  const hikingDuration = 8;

  const [pastTrack, setPastTrack] = useState(null);
  const [todaysGeoJSON, setTodaysGeoJSON] = useState(null);
  const [destinations, setDestinations] = useState(null);
  const [futureDailyGeoJSON, setFutureDailyGeoJSON] = useState([]);

  useEffect(() => {
    if (selectedTrack) {
      const { geojson } = myTracks.find((element) => element._id === selectedTrack);
      // returns an array of 2d coordinates (omits the optional third number, which is elevation)
      const points = geojson.features.map((feature) => feature.geometry.coordinates.map((c) => [c[1], c[0]])).flat(); // eslint-disable-line
      const line = turf.lineString(points);
      const closest = turf.nearestPointOnLine(line, location, { units: 'kilometers' }).properties.index;
      setPastTrack(points.slice(0, closest));

      const geometryFlat = geojson.features.map((feature) => feature.geometry.coordinates).flat();
      const futureGeoJSON = coordinatesToGeoJSON(geometryFlat.slice(closest));

      const remainingTimeToday = moment(Date.now()); // TODO: calcualate remaining hiking time
      const todaysTrackEnd = getDestinations(futureGeoJSON, 3, 1);

      setTodaysGeoJSON(coordinatesToGeoJSON(geometryFlat.slice(closest, closest + todaysTrackEnd[0][3] - 1)));

      const afterTomorrowGeoJSON = coordinatesToGeoJSON(geometryFlat.slice(todaysTrackEnd[0][3]));

      const daySplitLocations = getDestinations(afterTomorrowGeoJSON, hikingDuration, Infinity);
      console.log(daySplitLocations.length);
      console.log(daySplitLocations[0][3]);

      let startPoint = closest + todaysTrackEnd[0][3] - 1;
      console.log(startPoint);
      for (let i = 0; i < daySplitLocations.length; i++) {
        console.log(coordinatesToGeoJSON(geometryFlat.slice(startPoint, startPoint + daySplitLocations[i][3])));
        setFutureDailyGeoJSON([...futureDailyGeoJSON, coordinatesToGeoJSON(geometryFlat.slice(startPoint, startPoint + daySplitLocations[i][3]))]);
        startPoint += daySplitLocations[i][3];
        console.log(i);
        console.log(futureDailyGeoJSON);
      }

    // setDestinations(getDestinations(futureGeoJSON));
    }
  }, []);

  function createMarker() {
    return new L.divIcon({ // eslint-disable-line
      html: '<svg><text x="100" y="100" fill="blue">⦿</text></svg>',
      iconAnchor: [111, 91],
      className: 'fade',
    });
  }

  const colors = ['purple', 'cyan', 'yellow', 'magenta'];

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
      {(todaysGeoJSON
          && (
          <Track
            geojson={todaysGeoJSON}
            color="purple"
          />
          )
          )}
      {(futureDailyGeoJSON
          && futureDailyGeoJSON.map((geojson, index) => (
            <Track
              key={index}
              geojson={geojson}
              color={colors.index}
            />
          ))
          )}
    </div>
  );
}

export default EnRoute;
