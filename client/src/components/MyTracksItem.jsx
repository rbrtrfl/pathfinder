import React, { useContext }  from 'react'
import { ActiveTrack } from './MainContainer'

function MyTracksItem( { gpx, active, setChosen } ) {

  // const { setSelectedTrack } = useContext(ActiveTrack);

  return (
    <div>
    <li onClick={setChosen} className={active ? "mytracks-selected" : "mytracks-item"}
        // return setSelectedTrack(gpx);
       >
      <ul>
        <li>
          <span className="bold">Name: </span>
          <span>{gpx.tracks[0].name}</span>
        </li>
        <li>
          <span className="bold">Distance: </span>
          <span>{Math.floor(gpx.tracks[0].distance.total)}m</span>
        </li>
        <li>
          <span className="bold">Ascent: </span>
          <span>{Math.floor(gpx.tracks[0].elevation.pos)}m</span>
        </li>
        <li>
          <span className="bold">Descent: </span>
          <span>{Math.floor(gpx.tracks[0].elevation.neg)}m</span>
        </li>
      </ul>
    </li>
      <div className="mytracks-divider"></div>
    </div>
  )
}

export default MyTracksItem