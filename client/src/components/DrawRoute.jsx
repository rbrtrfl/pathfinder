import React, { useState, useContext} from 'react';
import { useMapEvents, Polyline } from 'react-leaflet';
import * as apiService from '../services/ApiService';
import { MyContext } from '../helpers/Context';
import CustomMarker from './CustomMarker';
import './DrawRoute.css';

function DrawRoute() {
  const [polyline, setPolyline] = useState([]);
  const [showSaveForm, setShowSaveForm] = useState(false);

  const { myTracks, setMyTracks, setSelectedTrack } = useContext(MyContext);

  useMapEvents({
    click: (e) => {
      setPolyline([...polyline, e.latlng]);
    },
  });

  function createGeoJSON(data) {
    // TODO: create name inside app
    return {
      type: 'FeatureCollection',
      properties: {
        name: 'My first track',
      },
      features: [{
        type: 'Feature',
        geometry: data,
      }],
    };
  }

  function convertRouteToTrack() {
    // TODO: draw multiple tracks after another
    setSelectedTrack(null);
    let string = polyline.map((e) => `${e.lng},${e.lat};`).join('');
    const splitChar = ';';

    function trimAtCharFromBack(str, char) {
      const revString = str.split('').reverse().join('');
      const pos = revString.indexOf(char);
      string = revString.slice(pos + 1, revString.length).split('').reverse().join('');
    }
    trimAtCharFromBack(string, splitChar);
    trimAtCharFromBack(string, splitChar);

    apiService.route(string)
      .then((data) => {
        if (data.code === 'Ok') {
          const geojson = createGeoJSON(data.routes[0].geometry);

          apiService.postRoute(geojson)
            .then((response) => {
              setMyTracks([...myTracks, response]);
              setSelectedTrack(response._id);
            });
        }
      });
    setPolyline([]);
  }

  function revertLastDraw() {
    const minusLast = polyline.slice(0, polyline.length - 2);
    setPolyline(minusLast);
  }

  function toggleSaveForm() {
    setShowSaveForm(true);
  }

  function abortDraw() {
    setPolyline([]);
  }

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
      {(showSaveForm)
        ? (
          <div className="save-form" id="menu-overlay">
            <form>
              <input />
              <button
                className={polyline.length > 0 ? 'selected' : ''}
                type="button"
                onClick={() => convertRouteToTrack()}
              >
                ✓
              </button>
            </form>
          </div>
        ) : (
          <div className="get-route-menu" id="menu-overlay">
            <button
              className={polyline.length > 0 ? 'selected' : ''}
              type="button"
              onClick={() => toggleSaveForm()}
            >
              ✓
            </button>
            <button
              className={polyline.length > 0 ? 'selected' : ''}
              type="button"
              onClick={() => revertLastDraw()}
            >
              ↩
            </button>
            <button
              className={polyline.length > 0 ? 'selected' : ''}
              type="button"
              onClick={() => abortDraw()}
            >
              ✕
            </button>
          </div>
        )}
    </div>
  );
}

export default DrawRoute;
