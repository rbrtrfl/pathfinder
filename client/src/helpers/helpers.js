import GpxParser from 'gpxparser';

export default function getGpxById(selectedTrack, myTracks) {
  const trackData = myTracks.find((element) => element._id === selectedTrack);
  const gpx = new GpxParser();
  return gpx.parse(trackData.track);
}
