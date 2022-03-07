const turf = require('@turf/turf');

module.exports = function addMetadata(body) {
  const result = body;
  result.geojson.properties.distance = { total: turf.length(body.geojson, { units: 'kilometers' }) };
  const { features } = body.geojson;

  const elevations = features.map(({ geometry }) => geometry.coordinates.map((c) => c[2])).flat();

  const getMax = (acc, coords) => (acc > coords ? acc : coords);
  const getMin = (acc, coords) => (acc > coords ? coords : acc);

  const max = elevations.reduce(getMax);
  const min = elevations.reduce(getMin);

  const getPos = (prev, curr, index, array) => {
    if (index === array.length - 1) return prev;
    return ((curr < array[index + 1]) ? (prev + (array[index + 1] - curr)) : prev);
  };
  const getNeg = (prev, curr, index, array) => {
    if (index === array.length - 1) return prev;
    return ((curr > array[index + 1]) ? (prev + (array[index + 1] - curr)) : prev);
  };
  const pos = elevations.reduce(getPos, 0);
  const neg = elevations.reduce(getNeg, 0);

  const elevation = {
    max,
    min,
    neg,
    pos,
  };
  result.geojson.properties.elevation = elevation;

  return result;
};
