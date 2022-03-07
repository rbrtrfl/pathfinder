import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis,
} from 'recharts';

function ElevationProfile() {
  const [data, setData] = useState([{
    name: 'Page A', uv: 400, pv: 2400, amt: 2400,
  }]);

  useEffect(() => {
    const data = [400, 500, 600, 700];
    setData([{
      name: 'Page A', uv: 400, pv: 2400, amt: 2400,
    }, data]);
  }, []);

  return (
    <div className="elevation-container">
      <LineChart width={390} height={150} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
}

export default ElevationProfile;
