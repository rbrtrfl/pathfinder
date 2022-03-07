import React, { useState, useContext } from 'react';
import {
  useMapEvents, Polyline, GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import * as apiService from '../services/ApiService';
import { MyContext } from '../helpers/Context';

function DrawRoute() {
  const [polyline, setPolyline] = useState([]);
  const [coordinatesString, setCoordinatesString] = useState('');
  const [geoJson, setGeoJson] = useState(null);

  const { myTracks, setMyTracks, setSelectedTrack } = useContext(MyContext);

  useMapEvents({
    click: (e) => {
      setPolyline([...polyline, e.latlng]);
      setCoordinatesString((coordinatesString) ? `${coordinatesString};${e.latlng.lng},${e.latlng.lat}` : `${e.latlng.lng},${e.latlng.lat}`);
    },
  });

  function createGeoJSON(data) {
    // TODO: create name inside app
    return {
      type: 'FeatureCollection',
      properties: {
        name: 'My first track',
      },
      features: [{
        type: 'Feature',
        geometry: data,
      }],
    };
  }

  function clickHandler() {
    const croppedCoordinates = coordinatesString.slice(0, coordinatesString.length - (20 * 2));
    apiService.route(croppedCoordinates)
      .then((data) => {
        if (data.code === 'Ok') {
          const geojson = createGeoJSON(data.routes[0].geometry);
          setGeoJson(geojson); // TODO: delete this

          apiService.postRoute(geojson)
            .then((response) => {
              setMyTracks([...myTracks, response]);
              setSelectedTrack(response._id);
            });
        }
      });
    setPolyline([]);
    setCoordinatesString('');
  }

  return (
    <div>
      <button type="button" onClick={() => clickHandler()} className="get-route-menu">get Route</button>
      <Polyline pathOptions={{ color: 'blue' }} positions={polyline} />
      {(geoJson)
        ? (
          <GeoJSON
            data={geoJson}
            pathOptions={{ color: 'red' }}
          />
        )
        : ''}
    </div>
  );
}

export default DrawRoute;
