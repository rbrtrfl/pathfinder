import React, { useState, useContext } from 'react';
import {
  useMapEvents, Polyline, GeoJSON,
} from 'react-leaflet';
import * as apiService from '../services/ApiService';
import { MyContext } from '../helpers/Context';

function DrawRoute() {
  const [polyline, setPolyline] = useState([]);
  const [coordinatesString, setCoordinatesString] = useState('');
  // const [geoJson, setGeoJson] = useState(null);

  const { myTracks, setMyTracks, setSelectedTrack } = useContext(MyContext);

  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      setPolyline([...polyline, e.latlng]);
      setCoordinatesString((coordinatesString) ? `${coordinatesString};${e.latlng.lng},${e.latlng.lat}` : `${e.latlng.lng},${e.latlng.lat}`);
    },
  });

  function clickHandler() {
    const croppedCoordinates = coordinatesString.slice(0, coordinatesString.length - (20 * 2));
    apiService.route(croppedCoordinates)
      .then((data) => {
        if (data.code === 'Ok') {
          const geojson = ({
            type: 'FeatureCollection',
            properties: {
              name: 'My first track',
            },
            features: [{
              type: 'Feature',
              geometry: data.routes[0].geometry,
            }],
          });

          // setGeoJson(geojson);

          apiService.postRoute(geojson)
            .then((response) => {
              console.log(response._id);

              setMyTracks([...myTracks, response]);
              setSelectedTrack(response._id);
            });
        }
      });
    setPolyline([]);
    setCoordinatesString('');

    // const elevationData = [];
    // newRoute.forEach(async (point) => {
    //   console.log(point);
    //   await apiService.elevation(point)
    //     .then((result) => elevationData.push(result));
    // });
    // console.log('elevationData ', elevationData);
  }

  return (
    <div>
      <button type="button" onClick={() => clickHandler()} className="get-route-menu">get Route</button>
      <Polyline pathOptions={{ color: 'blue' }} positions={polyline} />
      {/* {(geoJson)
        ? (
          <GeoJSON
            data={geoJson}
            pathOptions={{ color: 'red' }}
          />
        )
        : ''} */}
    </div>
  );
}

export default DrawRoute;
