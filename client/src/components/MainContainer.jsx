import React, { createContext, useState, useEffect } from 'react';
import Map from './Map';
import MyTracks from './MyTracks';
import EnRoute from './EnRoute';
import DrawRoute from './DrawRoute';
import Settings from './Settings';
import { getAll } from '../services/ApiService';

// const ActiveTrack = createContext();

function MainContainer({ menuItem }) {
  const [selectedTrack, setSelectedTrack] = useState({});
  const [myTracks, setMyTracks] = useState([]);

  useEffect(() => {
    getAll()
      .then((data) => setMyTracks(data));
  }, []);

  function calculateBounds(selectedTrack) {
    const trackSelected = (Object.keys(selectedTrack).length);
    if (trackSelected) {
      const track = L.geoJSON(selectedTrack.gpx.toGeoJSON());
      console.log(track.getBounds());
      // TODO: bounds not updating live
      setBounds([
        [track.getBounds()._southWest.lat, track.getBounds()._southWest.lng],
        [track.getBounds()._northEast.lat, track.getBounds()._northEast.lng],
      ]);
    }
  }

  // TODO: bounds not updating live
  const [bounds, setBounds] = useState([
    [46.8403752, 9.0290986],
    [46.8403752, 9.0290986],
  ]);
  console.log('bounds: ', bounds);

  return (
    <div>
      { menuItem === 'map' ? <Map bounds={bounds} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} /> : ''}
      { menuItem === 'mytracks' ? <MyTracks myTracks={myTracks} selectedTrack={selectedTrack} /> : ''}
      { menuItem === 'enroute' ? <EnRoute /> : ''}
      { menuItem === 'drawroute' ? <DrawRoute /> : ''}
      { menuItem === 'settings' ? <Settings /> : ''}
    </div>
  );
}

export { MainContainer };
