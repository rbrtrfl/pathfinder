import React, { useState, useContext } from 'react';
import * as apiService from '../services/ApiService';
import { TracksContext } from '../contexts/Contexts';
import './DrawRoute.css';

function DrawRouteMenu({ myTracks, setMyTracks, setSelectedTrack }) {
  const { polyline, setPolyline } = useContext(TracksContext);
  const [showSaveForm, setShowSaveForm] = useState(false);

  function createGeoJSON(data, name) {
    // TODO: create name inside app
    return {
      type: 'FeatureCollection',
      properties: {
        name,
      },
      features: [{
        type: 'Feature',
        geometry: data,
      }],
    };
  }

  function convertRouteToTrack(event) {
    event.preventDefault();
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
          const geojson = createGeoJSON(data.routes[0].geometry, event.target.input.value);

          apiService.postRoute(geojson)
            .then((response) => {
              setMyTracks([...myTracks, response]);
              setSelectedTrack(response._id);
            });
        }
      });
    setPolyline([]);
    setShowSaveForm(false);
  }

  function revertLastDraw() {
    const minusLast = polyline.slice(0, polyline.length - 1);
    setPolyline(minusLast);
  }

  function toggleSaveForm() {
    if (polyline.length > 1) setShowSaveForm(true);
  }

  function abortDraw() {
    setPolyline([]);
  }

  return (
    <div>
      {(showSaveForm)
        ? (
          <div className="save-form">
            <form onSubmit={convertRouteToTrack}>
              <input type="text" name="input" />
              <button
                className={polyline.length > 0 ? 'selected' : ''}
                type="submit"
              >
                ✓
              </button>
            </form>
          </div>
        ) : (
          <div className="get-route-menu">
            <button
              className={polyline.length > 1 ? 'selected' : ''}
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

export default DrawRouteMenu;
