const turf = require('@turf/turf');

module.exports = function addMetadata(body) {
  const result = body;
  result.geojson.properties.distance = { total: turf.length(body.geojson, { units: 'kilometers' }) };
  const { features } = body.geojson;

  const getMax = (acc, coords) => {
    // console.log(coords);
    return (acc[2] < coords[2] ? acc[2] : coords[2]);
  };
  const getMin = (acc, coords) => (acc[2] > coords[2] ? acc[2] : coords[2]);
  const max = features.map(({geometry}) => geometry.coordinates.reduce(getMax)); // eslint-disable-line
  const min = features.map(({geometry}) => geometry.coordinates.reduce(getMin)); // eslint-disable-line

  const positive = [2000, 2005, 2010, 2008, 2006].reduce((acc, ele) => {
    console.log(acc);
    console.log(ele);
    return acc;
  });
  console.log(positive);

  // const getNeg =
  // const max = features.map(({geometry}) => geometry.coordinates.reduce(getNet, 0)); // eslint-disable-line

  // const neg = body.geojson.features.map((feature) => feature.geometry.coordinates.reduce((a, b) => (a[2] > b[2] ? a[2] : b[2]))); // eslint-disable-line

  const elevation = {
    max,
    min,
    neg: 0,
    pos: 0,
  };
  result.geojson.properties.elevation = elevation;

  return result;
};
