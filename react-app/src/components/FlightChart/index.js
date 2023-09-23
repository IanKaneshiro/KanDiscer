import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { calculateFlightChart } from "../../utils/calculateFlightPath";

const FlightChart = ({ disc }) => {
  const data = calculateFlightChart(disc);
  console.log(data);
  return (
    <ResponsiveContainer width="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          type="basis"
          dataKey="number"
          dot=""
          stroke="#000000"
          strokeWidth={5}
        />
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
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FlightChart;
