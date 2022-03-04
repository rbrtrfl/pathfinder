import React, { useContext, useEffect } from 'react'
import Layers from './Layers'
import {
  LayersControl,
  MapContainer,
  TileLayer,
} from 'react-leaflet'
import { ActiveTrack } from './MainContainer'


function Map() {

  // const { selectedTrack, setSelectedTrack } = useContext(ActiveTrack);

  const center = [46.8403752, 9.0290986]
  // const center = [51.505, -0.09]

  return (
    <div className='map'>
      <MapContainer center={center} zoom={14}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Thunderforest_Landscape">
          <TileLayer
            // attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png" // ?apikey={apikey} {/*TODO: api key}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenTopoMap"> {/*TODO: zoom level above 17 crashes*/}
          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Esri_WorldImagery">
          <TileLayer
            // attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="SwissFederalGeoportal_NationalMapColor">
          <TileLayer
            // attribution='&copy; <a href="https://www.swisstopo.admin.ch/">swisstopo</a>'
            url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="SwissFederalGeoportal_SWISSIMAGE">
          <TileLayer
            // attribution='&copy; <a href="https://www.swisstopo.admin.ch/">swisstopo</a>'
            url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <Layers />
      </MapContainer>
    </div>
  )
}

export default Map