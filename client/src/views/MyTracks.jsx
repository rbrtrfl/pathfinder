import React from 'react';
import './MyTracks.css';
import MyTracksItem from '../components/MyTracksItem';
import FileUploadForm from '../components/FileUploadForm';

function MyTracks({ myTracks, selectedTrack, setSelectedTrack }) {
  function setChosen(id) { // eslint-disable-line
    if (id === selectedTrack) {
      return setSelectedTrack(null);
    }
    setSelectedTrack(id);
  }

  return (
    <div>
      <ul className={(selectedTrack) ? 'track-list-small' : 'track-list-large'}>
        <li className="mytracks-item">
          <h2>My Tracks</h2>
        </li>
        <div className="mytracks-divider" />
        {myTracks.map((item) => (
          <MyTracksItem
            key={item._id}
            data={item.geojson}
            active={item._id === selectedTrack}
            setChosen={() => setChosen(item._id)}
          />
        ))}
        <li className="mytracks-item">
          <h2>File Upload</h2>
        </li>
        <div className="mytracks-divider" />
        <li className="mytracks-item">
          <FileUploadForm />
        </li>
      </ul>
    </div>
  );
}

export default MyTracks;
