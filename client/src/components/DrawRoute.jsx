import React, { useState } from 'react';
import {
  useMapEvents, Polyline, GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
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
          console.log(data.routes)
          const geojson = ({
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: data.routes[0].geometry,
            }],
          });
          console.log(geojson);
          // const track = L.geoJSON(geojson);

          setGeoJson(geojson);
          apiService.postRoute(geojson);

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
}

export default DrawRoute;
