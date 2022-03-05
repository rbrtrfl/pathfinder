import React, { createContext, useState } from 'react';
import Map from './Map';
import MyTracks from './MyTracks';
import EnRoute from './EnRoute';
import DrawRoute from './DrawRoute';
import Settings from './Settings';

const ActiveTrack = createContext();

function MainContainer({ menuItem }) {
  const [selectedTrack, setSelectedTrack] = useState({});
  // TODO: bounds not updating live
  const [bounds, setBounds] = useState([
    [46.8403752, 9.0290986],
    [46.8403752, 9.0290986],
  ]);

  return (
    <ActiveTrack.Provider value={{ selectedTrack, setSelectedTrack }}>
      { menuItem === 'map' ? <Map bounds={bounds} /> : ''}
      { menuItem === 'mytracks' ? <MyTracks setBounds={setBounds} /> : ''}
      { menuItem === 'enroute' ? <EnRoute /> : ''}
      { menuItem === 'drawroute' ? <DrawRoute /> : ''}
      { menuItem === 'settings' ? <Settings /> : ''}
    </ActiveTrack.Provider>
  );
}

export { MainContainer, ActiveTrack };
