import React from 'react';

function MyTracksItem({ data, active, setChosen }) {
  return (
    <div>
      <li
        onClick={setChosen}
        className={active ? 'mytracks-selected' : 'mytracks-item'}
      >
        <ul>
          <li>
            <span className="bold">Name: </span>
            <span>{data.properties.name}</span>
          </li>
          <li>
            <span className="bold">Distance: </span>
            <span>
              {Math.floor(data.properties.distance.total)}
              km
            </span>
          </li>
          <li>
            <span className="bold">Ascent: </span>
            <span>
              {Math.floor(data.properties.elevation.pos)}
              m
            </span>
          </li>
          <li>
            <span className="bold">Descent: </span>
            <span>
              {Math.floor(data.properties.elevation.neg)}
              m
            </span>
          </li>
        </ul>
      </li>
      <div className="mytracks-divider" />
    </div>
  );
}

export default MyTracksItem;
