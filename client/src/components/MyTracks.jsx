import React, { useEffect, useState, useContext } from 'react'
import GpxParser from 'gpxparser'

import MyTracksItem from './MyTracksItem'
import { ActiveTrack } from './MainContainer'
import { getAll } from '../services/ApiService'
import './MyTracks.css';
import L from 'leaflet';
import FileUploadForm from './FileUploadForm'

function MyTracks({ setBounds }) {

  const { selectedTrack, setSelectedTrack } = useContext(ActiveTrack);
  const [ myTracks, setMyTracks ] = useState([]);

  useEffect(() => {
    getAll()
      .then((data) => setMyTracks(data))
  }, [])

  function setChosen(data) {
    const gpx = new GpxParser();
    gpx.parse(data.track);

    const item = {
      _id: data._id,
      gpx: gpx,
    }

    let trackSelected = (Object.keys(selectedTrack).length);
    if (trackSelected) {
      const track = L.geoJSON(selectedTrack.gpx.toGeoJSON());
      console.log(track.getBounds());
      setBounds([
        [track.getBounds()._southWest.lat, track.getBounds()._southWest.lng],
        [track.getBounds()._northEast.lat, track.getBounds()._northEast.lng],
      ]);
    }
    if (item._id === selectedTrack._id) {
      return setSelectedTrack({});
    }
    setSelectedTrack(item);
  }

  return (
    <div>MyTracks
      <ul className="track-list-scroll">
          {myTracks.map((item) => {
            return (
                <MyTracksItem
                  key={item._id}
                  data={item.track}
                  active={item._id === selectedTrack._id}
                  setChosen={() => setChosen(item)}
                />
            );
          })}
      </ul>
      <FileUploadForm></FileUploadForm>
    </div>
  )
}

export default MyTracks