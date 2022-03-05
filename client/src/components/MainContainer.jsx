import React, { useState, useEffect } from 'react';
import GpxParser from 'gpxparser';
import L from 'leaflet';
import Map from './Map';
import MyTracks from './MyTracks';
import EnRoute from './EnRoute';
import Settings from './Settings';
import { getAll } from '../services/ApiService';

// const ActiveTrack = createContext();

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
      const trackData = myTracks.find((element) => element._id === selectedTrack);
      const gpx = new GpxParser();
      gpx.parse(trackData.track);

      const track = L.geoJSON(gpx.toGeoJSON());
      setBounds([
        [track.getBounds()._southWest.lat, track.getBounds()._southWest.lng],
        [track.getBounds()._northEast.lat, track.getBounds()._northEast.lng],
      ]);
    }
  }, [selectedTrack]);

  return (
    <div>
      { menuItem === 'map' || menuItem === 'drawroute' ? <Map bounds={bounds} selectedTrack={selectedTrack} myTracks={myTracks} menuItem={menuItem} /> : ''}
      { menuItem === 'mytracks' ? <MyTracks myTracks={myTracks} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} /> : ''}
      { menuItem === 'enroute' ? <EnRoute /> : ''}
      { menuItem === 'settings' ? <Settings /> : ''}
    </div>
  );
}

export default MainContainer;
