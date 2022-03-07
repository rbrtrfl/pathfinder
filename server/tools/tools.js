const turf = require('@turf/turf');

module.exports = function addMetadata(body) {
  const result = body;
  result.geojson.properties.distance = { total: turf.length(body.geojson, { units: 'kilometers' }) };
  const { features } = body.geojson;

  const getMax = (acc, coords) => (acc[2] < coords[2] ? acc[2] : coords[2]);
  const getMin = (acc, coords) => (acc[2] > coords[2] ? acc[2] : coords[2]);
  const max = features.map(({ geometry }) => geometry.coordinates.reduce(getMax))[0];
  const min = features.map(({ geometry }) => geometry.coordinates.reduce(getMin))[0];

  const getPos = (prev, curr, index, array) => {
    if (index === array.length - 1) return prev;
    return ((curr[2] < array[index + 1][2]) ? (prev + (array[index + 1][2] - curr[2])) : prev);
  };
  const getNeg = (prev, curr, index, array) => {
    if (index === array.length - 1) return prev;
    return ((curr[2] > array[index + 1][2]) ? (prev + (array[index + 1][2] - curr[2])) : prev);
  };
  const pos = features.map(({ geometry }) => geometry.coordinates.reduce(getPos, 0))[0];
  const neg = features.map(({ geometry }) => geometry.coordinates.reduce(getNeg, 0))[0];

  const elevation = {
    max,
    min,
    neg,
    pos,
  };
  result.geojson.properties.elevation = elevation;

  console.log(elevation);

  return result;
};
