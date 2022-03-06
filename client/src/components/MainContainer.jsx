import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import Map from './Map';
import MyTracks from './MyTracks';
import EnRoute from './EnRoute';
import Settings from './Settings';
import { getAll } from '../services/ApiService';
import { MyContext } from '../helpers/Context';

function MainContainer({ menuItem }) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [myTracks, setMyTracks] = useState([]);
  const [bounds, setBounds] = useState([
    [46.84, 9.02],
    [46.89, 9.02],
  ]);

  useEffect(() => {
    getAll()
      .then((data) => setMyTracks(data));
  }, []);

  useEffect(() => {
    if (selectedTrack) {
      const result = myTracks.find((element) => element._id === selectedTrack);
      const track = L.geoJSON(result.geojson);
      setBounds([
        [track.getBounds()._southWest.lat, track.getBounds()._southWest.lng],
        [track.getBounds()._northEast.lat, track.getBounds()._northEast.lng],
      ]);
    }
  }, [selectedTrack]);

  return (
    <MyContext.Provider value={{selectedTrack, setSelectedTrack, myTracks, setMyTracks}}> {/*eslint-disable-line*/}
      { menuItem === 'map' || menuItem === 'drawroute' ? <Map bounds={bounds} selectedTrack={selectedTrack} menuItem={menuItem} myTracks={myTracks} /> : ''}
      { menuItem === 'mytracks' ? <MyTracks myTracks={myTracks} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} /> : ''}
      { menuItem === 'enroute' ? <EnRoute /> : ''}
      { menuItem === 'settings' ? <Settings /> : ''}
    </MyContext.Provider>
  );
}

export default MainContainer;
