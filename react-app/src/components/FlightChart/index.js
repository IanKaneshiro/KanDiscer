import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const FlightChart = () => {
  //   const [flightData, setFlightData] = useState([]);

  // Get the flight numbers of the disc golf disc
  const flightNumbers = [5, 2, 0, 3];

  // Calculate the flight path
  const flightPath = flightNumbers.map((number, index) => {
    return {
      x: index,
      y: number,
    };
  });

  // Set the flight data
  //   setFlightData(flightPath);

  return (
    <LineChart width={300} height={500} data={flightPath} layout="vertical">
      <Line type="monotone" dataKey="y" stroke="#ff0000" />
      <XAxis />
      <YAxis />
    </LineChart>
  );
};

export default FlightChart;
