import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define chart options
export const options = (isHourly) => ({
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  scales: {
    x: {
      type: "category",
      display: true,
      title: {
        display: true,
        text: isHourly ? "Time (hours)" : "Date",
      },
    },
    y: {
      type: "linear",
      display: true,
      position: "left",
      title: {
        display: true,
        text: "Wind Speed (km/h)",
      },
      beginAtZero: true, // Ensure the y-axis starts at zero
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      title: {
        display: true,
        text: "Temperature (°C)",
      },
      grid: {
        drawOnChartArea: false,
      },
      beginAtZero: true, // Ensure the y-axis starts at zero
    },
  },
});

// Main App component
const WeatherGraph = ({ isHourly, labels, windSpeedData, temperatureData }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Wind Speed (km/h)",
        data: windSpeedData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Temperature (°C)",
        data: temperatureData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  return <Line options={options(isHourly)} data={data} />;
};
export default WeatherGraph;
