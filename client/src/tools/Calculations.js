import * as turf from '@turf/turf';

function getDistance(pointsArray) {
  return turf.length(pointsArray, { units: 'kilometers' });
}

function getAscent(elesArray) {
  const getPos = (prev, curr, index, array) => {
    if (index === array.length - 1) return prev;
    return ((curr < array[index + 1]) ? (prev + (array[index + 1] - curr)) : prev);
  };
  return elesArray.reduce(getPos, 0);
}

function getDescent(elesArray) {
  const getNeg = (prev, curr, index, array) => {
    if (index === array.length - 1) return prev;
    return ((curr > array[index + 1]) ? (prev + (array[index + 1] - curr)) : prev);
  };
  return Math.abs(elesArray.reduce(getNeg, 0));
}

function getTotalTime(distanceTime, ascentTime, descentTime) {
  if (distanceTime < (ascentTime + descentTime)) {
    return (distanceTime / 2 + ascentTime + descentTime);
  } return (distanceTime + (ascentTime + descentTime) / 2);
}

function getDestinations(geojson) {
  const { features } = geojson;
  const locationsFlat = features.map(({ geometry }) => geometry.coordinates.map((c) => [c[0], c[1]])).flat(); //eslint-disable-line
  const elevations = features.map(({ geometry }) => geometry.coordinates.map((c) => c[2])).flat();
  const { length } = elevations;

  for (let i = 0; i < 1; i++) {
    const elesSection = elevations.slice(i, length - 1);
    const distanceTime = getDistance(turf.lineString(locationsFlat.slice(i, length - 1))) / 4;
    console.log(distanceTime);
    const ascentTime = (getAscent(elesSection) / 300);
    console.log(ascentTime);
    const descentTime = (getDescent(elesSection) / 500);
    console.log(descentTime);
    const totalTime = getTotalTime(distanceTime, ascentTime, descentTime);
    if (totalTime >= 1) return totalTime;
  }
}

export default getDestinations;
