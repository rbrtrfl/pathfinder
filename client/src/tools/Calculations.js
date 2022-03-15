import * as turf from '@turf/turf';
import moment from 'moment';

// hiking time calculations according to DIN standard 33466

function getFlatTime(pointsArray) {
  const line = turf.lineString(pointsArray);
  // 4km/h in flat terrain
  return turf.length(line, { units: 'kilometers' }) / 4;
}

function getAscentTime(elesArray) {
  function getPos(prev, curr, index, array) {
    if (index === array.length - 1) return prev;
    return ((curr < array[index + 1]) ? (prev + (array[index + 1] - curr)) : prev);
  }
  // 300hm in ascent per hour
  return elesArray.reduce(getPos, 0) / 300;
}

function getDescentTime(elesArray) {
  function getNeg(prev, curr, index, array) {
    if (index === array.length - 1) return prev;
    return ((curr > array[index + 1]) ? (prev + (array[index + 1] - curr)) : prev);
  }
  // 500hm in descent per hour
  return Math.abs(elesArray.reduce(getNeg, 0)) / 500;
}

function getTotalTime(distanceTime, ascentTime, descentTime) {
  // hiking time in flat terrain and hiking time with elevation are calculated seperately
  // the smaller portion is divided by 2 before both portions are summed up
  if (distanceTime < (ascentTime + descentTime)) {
    return (distanceTime / 2 + ascentTime + descentTime);
  } return (distanceTime + (ascentTime + descentTime) / 2);
}

function getTime(timeDecimal) {
  const ms = moment.duration(timeDecimal, 'hours').asMilliseconds();
  const time = moment(Date.now() + ms).format('HH:mm');
  return time;
}

function getDestinations(geojson) {
  const { features } = geojson;
  const locationsFlat = features.map(({ geometry }) => geometry.coordinates.map((c) => [c[0], c[1]])).flat(); //eslint-disable-line
  // console.log(locationsFlat);
  const elevations = features.map(({ geometry }) => geometry.coordinates.map((c) => c[2])).flat();
  // console.log(elevations);
  const { length } = elevations;
  const destinations = [];
  const interval = 1;
  let intervalCounter = interval;

  for (let i = 0; i < length - 3; i++) {
    const elesSection = elevations.slice(0, i + 2);
    // console.log(elesSection);
    const distanceTime = getFlatTime(locationsFlat.slice(0, i + 2));
    // console.log('distance time: ', distanceTime);
    const ascentTime = getAscentTime(elesSection);
    // console.log('ascent time: ', ascentTime);
    const descentTime = getDescentTime(elesSection);
    // console.log('descent time: ', descentTime);
    const totalTime = getTotalTime(distanceTime, ascentTime, descentTime);
    if (totalTime >= intervalCounter) {
      // console.log('total time: ', totalTime);
      destinations.push([locationsFlat[i + 1][0], locationsFlat[i + 1][1], getTime(totalTime)]);
      intervalCounter += interval;
    }
  }
  return destinations;
}

export default getDestinations;
