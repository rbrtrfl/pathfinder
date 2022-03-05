import React, { useState } from 'react';
import {
  useMapEvents, Marker, Polyline, GeoJSON,
} from 'react-leaflet';
import * as apiService from '../services/ApiService';

function DrawRoute() {
  const [positionCoordinates, setPositionCoordinates] = useState(null);
  const [drawPolyline, setdrawPolyline] = useState([]);
  const [newRoute, setNewRoute] = useState([]);

  const [geoJson, setGeoJson] = useState(null);

  useMapEvents({
    click: (e) => {
      setPositionCoordinates(e.latlng);
      setdrawPolyline([...drawPolyline, e.latlng]);
    },
  });

  function clickHandler() {
    let coordinatesString = '';

    drawPolyline.forEach((item) => {
      // osrm/mapbox accepts {lon,lat;lon,lat;...}
      coordinatesString += `${item.lng},${item.lat};`;
    });

    apiService.route(coordinatesString.slice(0, coordinatesString.length - 1))
      .then((data) => {
        console.log(data);
        console.log(data.toGeoJSON());
        setGeoJson(data);
        console.log(setGeoJson(data));
        const newTempRoute = [];
        // geojson from api fetch has format [[lon,lat],[lon,lat],...]
        // Polyline accepts [[lat,lon],[lat,lon],...]
        data.routes[0].geometry.coordinates.forEach((item) => {
          newTempRoute.push(item.reverse());
        });
        setNewRoute(newTempRoute);
      });
    setdrawPolyline([]);

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
      <Polyline pathOptions={{ color: 'yellow' }} positions={drawPolyline} />
      <Polyline pathOptions={{ color: 'lime' }} positions={newRoute} />
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
