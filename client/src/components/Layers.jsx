import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EnRoute from './EnRoute';
import DrawRoute from './DrawRoute';
import CustomMarker from './CustomMarker';

function Layers({
  selectedTrack, myTracks, menuItem, showElevation, setShowElevation,
}) {
  const [displayedTrack, setDisplayedTrack] = useState(null);
  const [endPoints, setEndPoints] = useState({});

  useEffect(() => {
    if (selectedTrack) {
      const { geojson } = myTracks.find((element) => element._id === selectedTrack);
      setDisplayedTrack(geojson);
      const allPoints = geojson.features.map((feature) => feature.geometry.coordinates.map((c) => [c[1], c[0]])).flat(); // eslint-disable-line
      setEndPoints([allPoints[0], allPoints[allPoints.length - 1]]);
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
      {(displayedTrack)
        && (
          <div>
            <CustomMarker
              position={endPoints[0]}
              letter="A"
              color={menuItem === 'enroute' ? 'purple' : 'red'}
            />
            <CustomMarker
              position={endPoints[1]}
              letter="B"
              color={menuItem === 'enroute' ? 'purple' : 'red'}
            />
            {(menuItem !== 'enroute')
               && (
               <GeoJSON
                 data={displayedTrack}
                 pathOptions={{ color: 'red' }}
               />
               )}
          </div>
        )}
      {(menuItem === 'enroute') && <EnRoute /> }
      {(menuItem === 'drawroute') && <DrawRoute /> }
    </div>
  );
}

export default Layers;
