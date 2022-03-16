import * as turf from '@turf/turf';
import moment from 'moment';

// hiking time calculations according to DIN standard 33466

function getFlatDuration(pointsArray) {
  const line = turf.lineString(pointsArray);
  // 4km/h in flat terrain
  return turf.length(line, { units: 'kilometers' }) / 4;
}

function getAscentDuration(elesArray) {
  function getPos(prev, curr, index, array) {
    if (index === array.length - 1) return prev;
    return ((curr < array[index + 1]) ? (prev + (array[index + 1] - curr)) : prev);
  }
  // 300hm in ascent per hour
  return elesArray.reduce(getPos, 0) / 300;
}

function getDescentDuration(elesArray) {
  function getNeg(prev, curr, index, array) {
    if (index === array.length - 1) return prev;
    return ((curr > array[index + 1]) ? (prev + (array[index + 1] - curr)) : prev);
  }
  // 500hm in descent per hour
  return Math.abs(elesArray.reduce(getNeg, 0)) / 500;
}

function getTotalDuration(distanceTime, ascentTime, descentTime) {
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
  // -3. set interval, hiking day start time, hiking day end time
  const endHikingTime = '22:00';
  const startHikingTime = '07:00';
  const breakTime = 0.2;
  const interval = 1;
  const result = {
    polylines: [],
    locations: [],
  };

  // -2. create color array
  const colors = ['purple', 'cyan', 'yellow', 'magenta'];

  // -1. select first item in color array
  let color = 0;

  // 0. set start time to current time
  let startTime = Date.now;

  // 1. start with future geoJSON
  const { features } = geojson;
  const locationsFlat = features.map(({ geometry }) => geometry.coordinates.map((c) => [c[0], c[1]])).flat(); //eslint-disable-line
  // console.log(locationsFlat);
  const elevationsFlat = features.map(({ geometry }) => geometry.coordinates.map((c) => c[2])).flat(); //eslint-disable-line
  const { length } = elevationsFlat;
  // console.log(elevationsFlat);
  const destinations = [];
  let intervalCounter = interval;
  let round = 0;

  // 2. create sections (0-1, 0-2, 0-3, ...)
  // 3. loop through sections and determine hiking time HH:mm for each section
  for (let i = 0; i < length - 2 && round < iterations; i++) {
    const elesSection = elevationsFlat.slice(0, i + 2);
    // console.log(elesSection);
    const distanceTime = getFlatDuration(locationsFlat.slice(0, i + 2));
    // console.log('distance time: ', distanceTime);
    const ascentTime = getAscentDuration(elesSection);
    // console.log('ascent time: ', ascentTime);
    const descentTime = getDescentDuration(elesSection);
    // console.log('descent time: ', descentTime);
    const totalTime = getTotalDuration(distanceTime, ascentTime, descentTime);
    if (totalTime >= intervalCounter) {
      // console.log('total time: ', totalTime);
      destinations.push([locationsFlat[i + 1][0], locationsFlat[i + 1][1], getTime(totalTime), i]);
      intervalCounter += interval;
      round += 1;
    }
  }
  if (destinations.length === 0) {
    const distanceTime = getFlatTime(locationsFlat);
    const ascentTime = getAscentTime(elevationsFlat);
    const descentTime = getDescentTime(elevationsFlat);
    const totalTime = getTotalTime(distanceTime, ascentTime, descentTime);
    destinations.push([locationsFlat[length - 1][0], locationsFlat[length - 1][1], getTime(totalTime), length - 1]);
  }
  return destinations;
  // 4. if at last section in list {
  //   -> return last location with timestamp and color
  // }
  // 5. if hiking time HH:mm > {hiking day end time} HH:mm {
  //   -> split track at location
  //   -> return track with color
  //   -> return location with HH:Mmm timestamp and color
  //   -> change color
  //   -> set start time to {hiking day start time}
  // }
  // 6. if hiking time HH:mm > start time HH:mm plus set interval {
  //   -> return location with HH:mm timestamp and color


}

export default getDestinations;


}
