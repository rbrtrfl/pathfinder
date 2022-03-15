import 'regenerator-runtime/runtime';
import Topography from 'leaflet-topography';
import L from 'leaflet';

const options = {
  token: process.env.REACT_APP_MAPBOX_TOKEN,
};

async function getElevation(coordinate) {
  const latlng = L.latLng([coordinate[1], coordinate[0]]);
  const topography = await Topography.getTopography(latlng, options);
  return Number(topography.elevation.toFixed(2));
}

async function addElevation(geojson) {
  const mutatedGeoJSON = geojson;
  mutatedGeoJSON.features = await Promise.all(geojson.features.map(async (feature) => {
    const featureCopy = feature;
    featureCopy.geometry.coordinates = await Promise.all(feature.geometry.coordinates.map(async (coordinate, index) =>[
      coordinate[0],
      coordinate[1],
      await getElevation(coordinate),
    ]));
    return featureCopy;
  }));
  return mutatedGeoJSON;
}

export default addElevation;
