import React from 'react'
import Map from './Map'
import MyTracks from './MyTracks'
import EnRoute from './EnRoute'
import DrawRoute from './DrawRoute'
import Settings from './Settings'

function MainContainer( { menuItem } ) {

  return (
    <div>
      { menuItem === 'map' ? <Map></Map> : ''}
      { menuItem === 'mytracks' ? <MyTracks></MyTracks> : ''}
      { menuItem === 'enroute' ? <EnRoute></EnRoute> : ''}
      { menuItem === 'drawroute' ? <DrawRoute></DrawRoute> : ''}
      { menuItem === 'settings' ? <Settings></Settings> : ''}
    </div>
  )
}

export default MainContainer