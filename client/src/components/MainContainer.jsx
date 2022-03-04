import React, { createContext, useState } from 'react'
import Map from './Map'
import MyTracks from './MyTracks'
import EnRoute from './EnRoute'
import DrawRoute from './DrawRoute'
import Settings from './Settings'

const ActiveTrack = createContext();

function MainContainer( { menuItem } ) {

  const [selectedTrack, setSelectedTrack] = useState({});
  const [bounds, setBounds] = useState([
    [46.8403752, 9.0290986],
    [46.8403752, 9.0290986]
  ])

  return (
    <ActiveTrack.Provider value={{selectedTrack, setSelectedTrack}}>
      { menuItem === 'map' ? <Map bounds={bounds}></Map> : ''}
      { menuItem === 'mytracks' ? <MyTracks setBounds={setBounds}></MyTracks> : ''}
      { menuItem === 'enroute' ? <EnRoute></EnRoute> : ''}
      { menuItem === 'drawroute' ? <DrawRoute></DrawRoute> : ''}
      { menuItem === 'settings' ? <Settings></Settings> : ''}
    </ActiveTrack.Provider>
  )
}

export  { MainContainer, ActiveTrack }