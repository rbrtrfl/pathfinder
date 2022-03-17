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

function getTime(momentInTime) {
  return moment(momentInTime).format('HH:mm');
}

function getDestinations(geojson) {
  // TODO: if end hiking is in the past, it should be the next day
  let endHikingTime = moment().hour(13).minute(0);
  const startHikingTime = moment();
  let momentInTime = moment(startHikingTime);
  const breakTime = 0.2;
  const interval = 1;
  let intervalCounter = interval;
  const splitTrack = {
    sections: [],
    locations: [],
  };

  const colors = ['blueviolet', 'magenta', 'cadetblue', 'coral'];
  let color = 0;

  const { features } = geojson;
  const positionsFlat = features.map(({ geometry }) => geometry.coordinates.map((c) => [c[0], c[1]])).flat(); //eslint-disable-line
  let polyLineStartIndex = 0;
  // console.log(positionsFlat);
  const elevationsFlat = features.map(({ geometry }) => geometry.coordinates.map((c) => c[2])).flat(); //eslint-disable-line
  const { length } = elevationsFlat;
  // console.log(elevationsFlat);

  let daySplit = 0;
  for (let i = 0; i < length - 3; i += 1) {
    const elesSection = elevationsFlat.slice(daySplit, i + 2);
    // console.log(elesSection);
    const distanceTime = getFlatDuration(positionsFlat.slice(daySplit, i + 2));
    // console.log('distance time: ', distanceTime);
    const ascentTime = getAscentDuration(elesSection);
    // console.log('ascent time: ', ascentTime);
    const descentTime = getDescentDuration(elesSection);
    // console.log('descent time: ', descentTime);
    const totalTime = getTotalDuration(distanceTime, ascentTime, descentTime);

    // add last marker
    if (i === length - 4) {
      splitTrack.sections.push({
        positions: positionsFlat.slice(polyLineStartIndex),
        color: colors[color],
      });
      splitTrack.locations.push({
        position: positionsFlat[length - 1],
        time: getTime(momentInTime),
        color: colors[color],
      });
    }

    momentInTime = moment(startHikingTime).add(totalTime, 'hours');

    // split track into days
    if (momentInTime > endHikingTime) {
      splitTrack.sections.push({
        positions: positionsFlat.slice(polyLineStartIndex, i + 2),
        color: colors[color],
      });
      splitTrack.locations.push({
        position: positionsFlat[i + 2],
        time: getTime(momentInTime),
        color: colors[color],
      });
      polyLineStartIndex = i + 2;
      if (color === colors.length - 1) color = 0;
      else color += 1;
      startHikingTime.hour(9).minute(0).add(1, 'day');
      endHikingTime = moment(endHikingTime).add(1, 'day');
      daySplit = i;
      intervalCounter = interval;
    }

    // populate markers
    if (momentInTime > moment(startHikingTime).add(intervalCounter, 'hour')) {
      splitTrack.locations.push({
        position: positionsFlat[i + 2],
        time: getTime(momentInTime),
        color: colors[color],
      });
      intervalCounter += interval;
    }
  }
  return splitTrack;
}

export default getDestinations;
