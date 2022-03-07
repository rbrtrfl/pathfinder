import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis,
} from 'recharts';
import * as turf from '@turf/turf';

function ElevationProfile({ selectedTrack, myTracks }) {
  const [data, setData] = useState([]);

  function getData() {
    if (selectedTrack) {
      const result = myTracks.find((element) => element._id === selectedTrack);
      const coordsFlat = result.geojson.features.map((element) => element.geometry.coordinates).flat(); //eslint-disable-line

      // redece array to fixed length
      const step = Math.floor(coordsFlat.length / 200);
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
          length: lengthSums[i].toFixed(1),
          elevation: coordsFlat[i][2].toFixed(0),
        });
      }
      console.log(rechartData);
      return rechartData;
    }
  }

  useEffect(() => {
    setData(getData());
  }, [selectedTrack]);

  return (
    <div className="elevation-container">
      <LineChart width={370} height={150} data={data}>
        <Line type="monotone" dataKey="elevation" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="length" tickCount={5} minTickGap={20} />
        <YAxis domain={['dataMin', 'dataMax']} />
      </LineChart>
    </div>
  );
}

export default ElevationProfile;
