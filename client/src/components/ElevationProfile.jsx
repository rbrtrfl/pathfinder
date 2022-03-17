import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis,
} from 'recharts';
import * as turf from '@turf/turf';

function ElevationProfile({ selectedTrack, myTracks }) {
  const [data, setData] = useState([]);

  function getData() {
    if (selectedTrack) {
      const result = myTracks.find((element) => element._id === selectedTrack);
      const coordsFlat = result.geojson.features.map((element) => element.geometry.coordinates).flat(); //eslint-disable-line

      // reduce array to fixed length
      // TODO: reduce points without losing relevant data
      const step = Math.ceil(coordsFlat.length / 500);
      const coordFlatSmall = [];
      for (let i = 0; i < coordsFlat.length; i + step) {
        coordFlatSmall.push(coordsFlat[i]);
        i += step;
      }

      // populate coordinate pairs
      const coordPairs = [];
      for (let i = 0; i < coordFlatSmall.length - 1; i++) {
        coordPairs.push([
          [coordFlatSmall[i][0], coordFlatSmall[i][1]],
          [coordFlatSmall[i + 1][0], coordFlatSmall[i + 1][1]],
        ]);
      }

      // calculate lengths
      const lengths = coordPairs.map((coordPair) => turf.length(turf.lineString(coordPair), { units: 'kilometers' }));
      const lengthSums = lengths.map(((a) => (b) => a += b)(0));

      const rechartData = [];
      for (let i = 0; i < coordFlatSmall.length - 1; i++) {
        rechartData.push({
          length: Number(lengthSums[i].toFixed(1)),
          elevation: parseInt(coordsFlat[i][2]),
        });
      }
      return rechartData;
    }
  }

  useEffect(() => {
    setData(getData());
  }, [selectedTrack]);

  return (
    <div className="elevation-container">
      <AreaChart
        width={window.innerWidth * 0.95}
        height={window.innerHeight * 0.2 * 0.95}
        data={data}
      >
        <Area type="monotone" dataKey="elevation" stroke="white" strokeWidth={3} fillOpacity={1} fill="grey" />
        <CartesianGrid stroke="grey" />
        <XAxis dataKey="length" minTickGap={20} stroke="white" />
        <YAxis domain={['dataMin', 'dataMax']} stroke="white" />
      </AreaChart>
    </div>
  );
}

export default ElevationProfile;
