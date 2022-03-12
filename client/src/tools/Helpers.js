function findSelectedTrack(selectedTrack, myTracks) {
  const { geojson } = myTracks.find((element) => element._id === selectedTrack);
  return geojson;
}
function getEndPoints(geojson) {
  const allPoints = geojson.features.map((feature) => feature.geometry.coordinates.map((c) => [c[1], c[0]])).flat(); // eslint-disable-line
  return ([allPoints[0], allPoints[allPoints.length - 1]]);
}
function coordinatesToGeoJSON(points, name) {
  return {
    type: 'FeatureCollection',
    properties: {
      name,
    },
    features: [{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: points,
      },
    }],
  };
}

export { findSelectedTrack, getEndPoints, coordinatesToGeoJSON };
