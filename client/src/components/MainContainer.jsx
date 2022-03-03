import React, { createContext, useState } from 'react'
import Map from './Map'
import MyTracks from './MyTracks'
import EnRoute from './EnRoute'
import DrawRoute from './DrawRoute'
import Settings from './Settings'

const ActiveTrack = createContext();

function MainContainer( { menuItem } ) {

  const [selectedTrack, setSelectedTrack] = useState();
  console.log(selectedTrack);

  return (
    <ActiveTrack.Provider value={{selectedTrack, setSelectedTrack}}>
      { menuItem === 'map' ? <Map></Map> : ''}
      { menuItem === 'mytracks' ? <MyTracks></MyTracks> : ''}
      { menuItem === 'enroute' ? <EnRoute></EnRoute> : ''}
      { menuItem === 'drawroute' ? <DrawRoute></DrawRoute> : ''}
      { menuItem === 'settings' ? <Settings></Settings> : ''}
    </ActiveTrack.Provider>
  )
}

export  { MainContainer, ActiveTrack }