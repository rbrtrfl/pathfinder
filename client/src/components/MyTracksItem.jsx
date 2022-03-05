import GpxParser from 'gpxparser'
import React from 'react'

function MyTracksItem( { data, active, setChosen } ) {

  const gpx = new GpxParser();
  gpx.parse(data);

  return (
    <div>
    <li onClick={setChosen} className={active ? "mytracks-selected" : "mytracks-item"}
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