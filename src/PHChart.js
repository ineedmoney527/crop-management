import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const dataset = [
  {
    date: "1/4/2024",
    pHValue: 5.8,
  },
  {
    date: "2/4/2024",
    pHValue: 6.2,
  },
  {
    date: "3/4/2024",
    pHValue: 5.5,
  },
  {
    date: "4/4/2024",
    pHValue: 6.0,
  },
  {
    date: "5/4/2024",
    pHValue: 5.7,
  },
  {
    date: "6/4/2024",
    pHValue: 5.9,
  },
  {
    date: "7/4/2024",
    pHValue: 6.1,
  },
  {
    date: "8/4/2024",
    pHValue: 5.8,
  },
  {
    date: "9/4/2024",
    pHValue: 5.7,
  },
  {
    date: "10/4/2024",
    pHValue: 5.9,
  },
  // Add more data points as needed
];

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: "pH Value",
    },
  ],
  series: [{ dataKey: "pHValue", label: "pH Value", valueFormatter }],
  height: 300,
};

export default function PHChart() {
  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "date",
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
