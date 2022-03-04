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

  // TODO: make the markers look good
  function createMarker (letter) {
    return new L.divIcon({
    html: `<svg><text x="100" y="100" fill="white">${letter}</text></svg>`,
    iconAnchor: [109, 92],
    className: 'marker'
  })
  }

  return (
    <div>Layers
      {(trackSelected) ?
      <div>
        <CircleMarker
          center={markerPositions[0]}
          pathOptions={{ color: 'red' }}
          radius={20}>
        </CircleMarker>
        <Marker
          position={markerPositions[0]}
          icon={createMarker('A')}
        >
        </Marker>

        <CircleMarker
          center={markerPositions[1]}
          pathOptions={{ color: 'red' }}
          radius={20}>
        </CircleMarker>
        <Marker
          position={markerPositions[1]}
          icon={createMarker('B')}
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