import React from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import Layers from './Layers';

function Map({
  bounds, selectedTrack, myTracks, menuItem, showElevation, setShowElevation,
}) {
  // const center = [46.8403752, 9.0290986];
  const thunderforestToken = process.env.REACT_APP_THUNDERFOREST_TOKEN;

  const thunderforestUrl = `https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${thunderforestToken}`;

  return (
    <div className="map">
      <MapContainer bounds={bounds} tap={false} zoomSnap={0.2}>
        <Layers
          selectedTrack={selectedTrack}
          myTracks={myTracks}
          menuItem={menuItem}
          showElevation={showElevation}
          setShowElevation={setShowElevation}
        />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Thunderforest_Landscape">
            <TileLayer
            // attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={thunderforestUrl}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenTopoMap">
            {' '}
            <TileLayer
              maxNativeZoom={17}
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri_WorldImagery">
            <TileLayer
              maxZoom={20}
            // attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS,
            // AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
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
              maxZoom={20}
            // attribution='&copy; <a href="https://www.swisstopo.admin.ch/">swisstopo</a>'
              url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default Map;
