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
  // -3. set interval, hiking day start time, hiking day end time
  let endHikingTime = moment().hour(11).minute(0);
  console.log('endHikingTime: ', endHikingTime._d);
  let startHikingTime = moment();
  console.log('startHikingTime: ', startHikingTime._d);
  let momentInTime;

  let isToday = true;
  const breakTime = 0.2;
  const interval = 1;
  let intervalCounter = interval;
  const splitTrack = {
    sections: [],
    locations: [],
  };

  // -2. create color array
  const colors = ['purple', 'darkcyan', 'magenta', 'green'];

  // -1. select first item in color array
  let color = 0;

  // 1. start with future geoJSON
  const { features } = geojson;
  const positionsFlat = features.map(({ geometry }) => geometry.coordinates.map((c) => [c[0], c[1]])).flat(); //eslint-disable-line
  let polyLineStartIndex = 0;
  // console.log(positionsFlat);
  const elevationsFlat = features.map(({ geometry }) => geometry.coordinates.map((c) => c[2])).flat(); //eslint-disable-line
  const { length } = elevationsFlat;
  // console.log(elevationsFlat);

  // 2. create sections (0-1, 0-2, 0-3, ...)
  // 3. loop through sections and determine hiking time HH:mm for each section
  for (let i = 0; i < length - 3; i += 1) {
    const elesSection = elevationsFlat.slice(0, i + 2);
    // console.log(elesSection);
    const distanceTime = getFlatDuration(positionsFlat.slice(0, i + 2));
    // console.log('distance time: ', distanceTime);
    const ascentTime = getAscentDuration(elesSection);
    // console.log('ascent time: ', ascentTime);
    const descentTime = getDescentDuration(elesSection);
    // console.log('descent time: ', descentTime);
    const totalTime = getTotalDuration(distanceTime, ascentTime, descentTime);

    // console.log(i);
    // const ms = moment.duration(totalTime, 'hours').asMilliseconds();
    momentInTime = moment(startHikingTime).add(totalTime, 'hours');
    console.log('startHikingTime: ', startHikingTime.format('Do, HH:mm:ss'));
    console.log('momentInTime: ', momentInTime.format('Do, HH:mm:ss'));
    console.log('endHikingTime: ', endHikingTime.format('Do, HH:mm:ss'));

    // 4. if at last section in list
    //   -> return remaining track with color
    //   -> return last location with timestamp and color
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

    // 5. if hiking time HH:mm > {hiking day end time} HH:mm
    //   -> split track at location
    //   -> return track with color
    //   -> return location with HH:mm timestamp and color
    //   -> change color
    //   -> set start time to {hiking day start time}
    // split track into days
    if (momentInTime > endHikingTime) {
      console.error('day split');
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
      color += 1;
      endHikingTime = moment(endHikingTime).add(1, 'day');
      // console.log('endHikingTime: ', endHikingTime._d);

      if (isToday) {
        startHikingTime.hour(7).minute(0).add(1, 'day');
        isToday = false;
      } else {
        startHikingTime = moment().hour(7).minute(0).add(1, 'day');
      }
    }

    // 6. if hiking time HH:mm > start time HH:mm plus set interval {
    //   -> return location with HH:mm timestamp and color

    // populate markers
    if (momentInTime > moment(startHikingTime).add(intervalCounter, 'hour')) {
      console.log('hourly');
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
