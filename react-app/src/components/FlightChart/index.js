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
  return (
    <ResponsiveContainer aspect={1} minWidth={300}>
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
        <Line
          type="basis"
          dataKey={disc.name}
          dot=""
          stroke="#284b63"
          strokeWidth={5}
          isAnimationActive="false"
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
