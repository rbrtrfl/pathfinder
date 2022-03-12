import React, { useEffect, useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EnRoute from '../views/EnRoute';
import Map from '../views/Map';
import DrawRoute from '../views/DrawRoute';
import { findSelectedTrack } from '../tools/Helpers';

function Layers({
  selectedTrack, myTracks, menuItem, showElevation, setShowElevation,
}) {
  const [displayedTrack, setDisplayedTrack] = useState(null);

  useEffect(async () => {
    if (selectedTrack) {
      const geojson = await findSelectedTrack(selectedTrack, myTracks);
      setDisplayedTrack(geojson);
    }
  }, [selectedTrack]);

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
        displayedTrack={displayedTrack}
      />
      ) }
      {(menuItem === 'enroute')
      && (
      <EnRoute />
      ) }
      {(menuItem === 'drawroute')
      && (
      <DrawRoute
        displayedTrack={displayedTrack}
      />
      ) }
    </div>
  );
}

export default Layers;
