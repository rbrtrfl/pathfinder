import React, { useContext } from 'react';
import { useMapEvents, Polyline } from 'react-leaflet';
import { TracksContext } from '../contexts/Contexts';
import CustomMarker from '../components/CustomMarker';
import Track from '../components/Track';
import './DrawRoute.css';

function DrawRoute({ displayedTrack }) {
  const { polyline, setPolyline } = useContext(TracksContext);

  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      setPolyline([...polyline, e.latlng]);
    },
  });

  return (
    <div>
      {(displayedTrack)
      && (
      <Track
        geojson={displayedTrack}
        color="grey"
      />
      )}
      {(polyline)
      && polyline.map((item, index) => (
        <CustomMarker
          key={index}
          position={item}
          string={index}
          color="blue"
        />
      ))}
      {(polyline)
      && <Polyline pathOptions={{ color: 'blue' }} positions={polyline} />}
    </div>
  );
}

export default DrawRoute;
