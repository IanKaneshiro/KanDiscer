import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { calculateFlightChart } from "../../utils/calculateFlightPath";

const FlightChart = ({ discs }) => {
  let data = [];
  discs.forEach((disc) => {
    const flightPath = calculateFlightChart(disc.info);
    flightPath.forEach((path, i) => {
      data[i] = { ...data[i], ...flightPath[i] };
    });
  });
  console.log(data);
  return (
    <ResponsiveContainer minWidth={100}>
      <LineChart
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {discs.map((disc) => (
          <Line
            type="basis"
            dataKey={disc.info.name}
            dot=""
            stroke={disc.color}
            strokeWidth={5}
            legendType="circle"
            label={disc.info.name}
          />
        ))}
        <XAxis
          type="number"
          domain={[-12, 12]}
          reversed="true"
          hide="true"
          tickCount={10}
        />
        <YAxis
          dataKey="distance"
          reversed="true"
          label={{
            value: "Distance (FT)",
            angle: -90,
            position: "insideLeft",
          }}
          tickCount="6"
          domain={[0, "maxData"]}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FlightChart;
