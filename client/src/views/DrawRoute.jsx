import React, { useContext } from 'react';
import { useMapEvents, Polyline } from 'react-leaflet';
import { TracksContext } from '../contexts/Contexts';
import CustomMarker from '../components/CustomMarker';
import './DrawRoute.css';

function DrawRoute() {
  const { polyline, setPolyline } = useContext(TracksContext);

  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      setPolyline([...polyline, e.latlng]);
    },
  });

  return (
    <div>
      <Polyline pathOptions={{ color: 'blue' }} positions={polyline} />
      {polyline && polyline.map((item, index) => (
        <CustomMarker
          key={index}
          position={item}
          letter={index}
          color="blue"
        />
      ))}
    </div>
  );
}

export default DrawRoute;
