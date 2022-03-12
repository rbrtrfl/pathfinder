import React, { useContext } from 'react';
import * as apiService from '../services/ApiService';
import { TracksContext } from '../contexts/Contexts';
import '../views/DrawRoute.css';
import { coordinatesToGeoJSON } from '../tools/Helpers';

function DrawRouteMenu({ myTracks, setMyTracks, setSelectedTrack }) {
  const {
    polyline, setPolyline, showSaveForm, setShowSaveForm,
  } = useContext(TracksContext);

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
          const geojson = coordinatesToGeoJSON(data.routes[0].geometry.coordinates, event.target.input.value);

          apiService.postRoute(geojson)
            .then((response) => {
              setMyTracks([...myTracks, response]);
              setSelectedTrack(response._id);
              setPolyline([]);
              setShowSaveForm(false);
            });
        }
      });
  }

  function toggleSaveForm() {
    if (polyline.length > 1) setShowSaveForm(true);
  }

  function revertLastDraw() {
    const minusLast = polyline.slice(0, polyline.length - 1);
    setPolyline(minusLast);
  }

  function abortDraw() {
    setPolyline([]);
    setShowSaveForm(false);
  }

  return (
    <div>
      {(showSaveForm)
        ? (
          <div className="save-form">
            <form onSubmit={convertRouteToTrack}>
              <input
                type="text"
                required
                name="input"
                placeholder="name your track"
              />
              <button
                id="white"
                className={polyline.length > 0 ? 'selected' : ''}
                type="submit"
              >
                ✓
              </button>
              <button
                id="red"
                type="button"
                className={polyline.length > 0 ? 'selected' : ''}
                onClick={abortDraw}
              >
                ✕
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
