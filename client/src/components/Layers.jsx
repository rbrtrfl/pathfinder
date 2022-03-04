import React, { useContext } from 'react'
import { Polyline, Marker, GeoJSON, CircleMarker, SVGOverlay} from 'react-leaflet';
import DeleteIcon from '@mui/icons-material/Delete';
import L from 'leaflet';

import { ActiveTrack } from './MainContainer'


function Layers() {

  const { selectedTrack } = useContext(ActiveTrack);
  let trackSelected = (Object.keys(selectedTrack).length);

  const positions = (trackSelected)
    ? selectedTrack.gpx.tracks.map((track) => track.points.map((p) => [p.lat, p.lon])).flat()
    : null;
  const markerPositions = (trackSelected) ? [ positions[0], positions[positions.length-1] ] : null;

  let html = `<svg><text x="100" y="100" fill="red">B</text></svg>`

  const myMarker = new L.divIcon({
    html: html,
    iconAnchor: [110, 90],
    className: 'marker'
  })

  return (
    <div>Layers
      {(trackSelected) ?
      <div>
        <CircleMarker
          center={markerPositions[1]}
          pathOptions={{ color: 'red' }}
          radius={20}>
        </CircleMarker>
        <Marker
          position={markerPositions[1]}
          icon={myMarker}
        >
        </Marker>
        <GeoJSON
          data={selectedTrack.gpx.toGeoJSON()}
          pathOptions={{ color: 'red' }}
        >
        </GeoJSON>
      </div>
      : ''}
    </div>
  )
}

export default Layers