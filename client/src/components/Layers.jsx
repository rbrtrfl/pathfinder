import React from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EnRoute from '../views/EnRoute';
import DrawRoute from '../views/DrawRoute';

import Map from '../views/Map';

function Layers({
  selectedTrack, myTracks, menuItem, showElevation, setShowElevation,
}) {
  function eleButtonHandler() {
    return (showElevation) ? setShowElevation(false) : setShowElevation(true);
  }

  return (
    <div>
      {(menuItem !== 'drawroute' && selectedTrack !== null)
        && (
          <button
            type="button"
            className={showElevation ? 'elevation-button selected' : 'elevation-button'}
            onClick={eleButtonHandler}
          >
            <ShowChartIcon />
          </button>
        )}
      {(menuItem === 'map') && (
      <Map
        selectedTrack={selectedTrack}
        myTracks={myTracks}
      />
      ) }
      {(menuItem === 'enroute') && <EnRoute /> }
      {(menuItem === 'drawroute') && <DrawRoute /> }
    </div>
  );
}

export default Layers;
