import React, { useState, useEffect } from 'react';
import {
  useMapEvents, Marker, Polyline, GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import * as apiService from '../services/ApiService';

function DrawRoute() {
  const [polyline, setPolyline] = useState([]);
  const [coordinatesString, setCoordinatesString] = useState('');
  const [newRoute, setNewRoute] = useState([]);

  useMapEvents({
    click: (e) => {
      setPolyline([...polyline, e.latlng]);
    },
  });

  function clickHandler() {
    const croppedCoordinates = polyline.slice(0, polyline.length - 3);
    console.log(croppedCoordinates);
    croppedCoordinates.forEach((element) => {
      console.log(element);
      setCoordinatesString((coordinatesString) ? `${coordinatesString};${element.lng},${element.lat};` : `${element.lng},${element.lat}`);
    });
    console.log(coordinatesString);

    apiService.route(coordinatesString)
      .then((data) => {
        if (data.code === 'Ok') {
          console.log(data);
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
      <Polyline pathOptions={{ color: 'lime' }} positions={newRoute} />
      {/* {(geoJson)
        ? (
          <GeoJSON
            data={geoJson} // toGeoJSON()
            pathOptions={{ color: 'red' }}
          />
        )
        : ''} */}
    </div>
  );

  // return position === null ? null : (
  //   <Marker position={position} />
  // );
}

export default DrawRoute;
