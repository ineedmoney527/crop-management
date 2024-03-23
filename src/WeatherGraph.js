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
export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  scales: {
    x: {
      type: "linear",
      display: true,
      title: {
        display: true,
        text: "Time (hours)",
      },
      ticks: {
        stepSize: 3, // Set the step size to 3 to display labels for every 3 hours
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
};

// Generate random data for demonstration
const labels = ["00", "03", "06", "09", "12", "15", "18", "21"];

const windSpeedData = [4, 7, 6, 5, 10, 8, 5, 7]; // Average wind speed in km/h
const temperatureData = [27, 27, 28, 29, 30, 29, 28, 27]; // Average temperature in °C

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

// Main App component
const WeatherGraph = () => {
  return <Line options={options} data={data} />;
};
export default WeatherGraph;
