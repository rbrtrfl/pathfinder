import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import MyMapContainer from './MyMapContainer';
import MyTracks from '../views/MyTracks';
import Settings from '../views/Settings';
import { getAll } from '../services/ApiService';
import { TracksContext } from '../contexts/Contexts';
import ElevationProfile from './ElevationProfile';
import DrawRouteMenu from './DrawRouteMenu';

function MainContainer({ menuItem, setMenuItem }) {
  const [polyline, setPolyline] = useState([]);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [myTracks, setMyTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showElevation, setShowElevation] = useState(false);
  const [bounds, setBounds] = useState([
    [46.82, 9.02],
    [46.89, 9.01],
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
    <TracksContext.Provider
      value={{
        selectedTrack,
        setSelectedTrack,
        myTracks,
        setMyTracks,
        polyline,
        setPolyline,
        showSaveForm,
        setShowSaveForm,
      }}
    >
      {(((menuItem === 'map' || menuItem === 'enroute') && showElevation === true) || menuItem === 'mytracks') && selectedTrack !== null && (
      <ElevationProfile
        selectedTrack={selectedTrack}
        myTracks={myTracks}
      />
      )}
      { (menuItem === 'map' || menuItem === 'drawroute' || menuItem === 'enroute')
          && (
            <MyMapContainer
              bounds={bounds}
              selectedTrack={selectedTrack}
              menuItem={menuItem}
              myTracks={myTracks}
              showElevation={showElevation}
              setShowElevation={setShowElevation}
            />
          )}
      { menuItem === 'mytracks'
          && (
            <MyTracks
              myTracks={myTracks}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
            />
          )}
      { menuItem === 'settings' && <Settings />}
      { menuItem === 'drawroute'
         && (
         <DrawRouteMenu
           myTracks={myTracks}
           setMyTracks={setMyTracks}
           setSelectedTrack={setSelectedTrack}
           setMenuItem={setMenuItem}
         />
         )}
    </TracksContext.Provider>
  );
}

export default MainContainer;
