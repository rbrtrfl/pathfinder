import React, { useState, useEffect } from 'react';
import {
  useMapEvents, Marker, Polyline, GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import GpxParser from 'gpxparser';
import * as apiService from '../services/ApiService';

function DrawRoute() {
  const [polyline, setPolyline] = useState([]);
  const [coordinatesString, setCoordinatesString] = useState('');
  const [newRoute, setNewRoute] = useState([]);

  const [geoJson, setGeoJson] = useState([]);

  useMapEvents({
    click: (e) => {
      setPolyline([...polyline, e.latlng]);
      setCoordinatesString((coordinatesString) ? `${coordinatesString};${e.latlng.lng},${e.latlng.lat}` : `${e.latlng.lng},${e.latlng.lat}`);
    },
  });

  function clickHandler() {
    const croppedCoordinates = coordinatesString.slice(0, coordinatesString.length - (20 * 2));
    apiService.route(croppedCoordinates)
      .then((data) => {
        if (data.code === 'Ok') {
          console.log(data);

          const geoJSONobj = ({
            type: 'FeatureCollection',
            features: [{
              geometry: data.routes[0].geometry,
            }],
          });
          setGeoJson(geoJSONobj);
          console.log(geoJson);
          return;

          const newTempRoute = [];
          // geojson from api fetch has format [[lon,lat],[lon,lat],...]
          // Polyline accepts [[lat,lon],[lat,lon],...]
          data.routes[0].geometry.coordinates.forEach((item) => {
            newTempRoute.push(item.reverse());
          });
          setNewRoute(newTempRoute);
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
      <Polyline pathOptions={{ color: 'yellow' }} positions={polyline} />
      {/* <Polyline pathOptions={{ color: 'lime' }} positions={newRoute} /> */}
      {(geoJson)
        ? (
          <GeoJSON
            data={geoJson} // toGeoJSON()
            pathOptions={{ color: 'red' }}
          />
        )
        : ''}
    </div>
  );

  // return position === null ? null : (
  //   <Marker position={position} />
  // );
}

export default DrawRoute;
