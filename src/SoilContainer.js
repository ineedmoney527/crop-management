import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Radar } from "react-chartjs-2";
import GaugeComponent from "react-gauge-component";
import ReactApexChart from "react-apexcharts";

const SoilContainer = () => {
  const [soilData, setSoilData] = useState(null);

  useEffect(() => {
    // Simulate fetching detailed soil data from an API or database
    const simulatedData = {
      pH: 6.8,
      nitrogen: 35,
      phosphorus: 25,
      potassium: 45,
      soilMoisture: 65, // Percentage
      soilTemperature: 28, // Celsius
      soilHealth: {
        microbialActivity: 80, // Percentage
        earthwormPopulations: 120, // Count per square meter
      },
      previousCropHistory: ["Corn", "Wheat", "Soybeans", "Barley"],
      soilErosionRisk: "Low to Moderate",
      fertilityMap: [
        { zone: "Zone A", pH: 6.5, nitrogen: 40 },
        { zone: "Zone B", pH: 6.2, nitrogen: 35 },
        { zone: "Zone C", pH: 6.8, nitrogen: 30 },
      ],
      tempMoisture: [
        { name: "Jan", moisture: 40, temperature: 25 },
        { name: "Feb", moisture: 35, temperature: 27 },
        { name: "Mar", moisture: 42, temperature: 26 },
        { name: "Apr", moisture: 38, temperature: 28 },
        { name: "May", moisture: 45, temperature: 30 },
        { name: "Jun", moisture: 48, temperature: 31 },
        { name: "Jul", moisture: 50, temperature: 32 },
        { name: "Aug", moisture: 46, temperature: 30 },
        { name: "Sep", moisture: 43, temperature: 29 },
        { name: "Oct", moisture: 40, temperature: 27 },
        { name: "Nov", moisture: 38, temperature: 26 },
        { name: "Dec", moisture: 42, temperature: 28 },
      ],
      nigrogen: 70,
      phosphorus: 22,
      potassium: 170,
    };

    // Set state with simulated data
    setSoilData(simulatedData);
  }, []);

  const TemperatureMoistureChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (chartRef && chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map((item) => item.name),
            datasets: [
              {
                label: "Temperature",
                data: data.map((item) => item.temperature),
                borderColor: "rgb(255, 99, 132)", // Red color for temperature
                fill: false,
              },
              {
                label: "Moisture",
                data: data.map((item) => item.moisture),
                borderColor: "rgb(54, 162, 235)", // Blue color for moisture
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }, [data]);

    return <canvas ref={chartRef} />;
  };
  const chartData = {
    options: {
      scale: {
        ticks: {
          display: false, // Disable the display of labels on the radar chart
        },
      },
    },
    labels: [
      "Nitrogen",
      "Phosphorus",
      "Potassium",
      "Calcium",
      "Magnesium",
      "Sulfur",
    ],
    datasets: [
      {
        label: "Nutrient Values",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        data: [70, 22, 170, 100, 50, 30], // Example data values for each nutrient,
      },
    ],
  };
  const heatChartData = {
    options: {
      chart: {
        type: "heatmap",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["red", "yellow", "green"], // Heatmap color
      xaxis: {
        categories: [
          ["Zone A"],
          ["Zone B"],
          ["Zone C"],

          // Add more groups of three zones as needed
        ],
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: true,
          colorScale: {
            ranges: [
              {
                from: -30,
                to: 5,
                name: "extreme",
                color: "#00A100",
              },
              {
                from: 6,
                to: 20,
                name: "high",
                color: "#128FD9",
              },
              {
                from: 21,
                to: 45,
                name: "medium",
                color: "#FFB200",
              },
              {
                from: 46,
                to: 55,
                name: "low",
                color: "#FF0000",
              },
            ],
          },
        },
      },
      title: {
        text: "Soil Fertility Heat Map",
        align: "center",
      },
    },
    series: [
      {
        name: "Row 1",
        data: [
          {
            x: "W1",
            y: 22,
          },
          {
            x: "W2",
            y: 2,
          },
          {
            x: "W3",
            y: 50,
          },
          {
            x: "W4",
            y: 32,
          },
        ],
      },
      {
        name: "Series 2",
        data: [
          {
            x: "W1",
            y: 3,
          },
          {
            x: "W2",
            y: 10,
          },
          {
            x: "W3",
            y: 12,
          },
          {
            x: "W4",
            y: 43,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Soil Management Dashboard</h1>

      {soilData && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2>pH Level</h2>
          <div
            style={{
              flex: 1,
              width: "400px",
              height: "200px",
            }}
          >
            <GaugeComponent
              minValue={0}
              maxValue={14}
              height={200}
              width={200}
              value={2}
              type="radial"
              labels={{
                tickLabels: {
                  type: "inner",
                },
              }}
              arc={{
                subArcs: [
                  { limit: 2, color: "red", showTick: true }, // pH between 0 and 3 (Red)
                  { limit: 4, color: "orange", showTick: true }, // pH between 3 and 5 (Orange)
                  { limit: 6, color: "yellow", showTick: true }, // pH betcween 5 and 7 (Yellow)
                  { limit: 8, color: "green", showTick: true }, // pH between 7 and 9 (Green)
                  { limit: 10, color: "#0496C7", showTick: true }, // pH between 9 and 11 (Blue)
                  { limit: 12, color: "BLUE", showTick: true }, // pH between 11 and 14 (Violet)
                  { limit: 14, color: "purple", showTick: true },
                ],
              }}
              pointer={{
                elastic: true,
                animationDelay: 0.3,
              }}
            />
            <p style={{ fontSize: "25px" }}>pH: {soilData.pH.toFixed(1)}</p>
          </div>
          {/* Display Soil Moisture and Temperature */}
          <div
            style={{
              flex: 1,
              width: "500px",
              height: "600px",
            }}
          >
            <h2>Soil Moisture and Temperature</h2>
            <p>Moisture: {soilData.soilMoisture}%</p>
            <p>Temperature: {soilData.soilTemperature}°C</p>
            <TemperatureMoistureChart data={soilData.tempMoisture} />
          </div>
          {/* Display Soil Health Indicators */}
          <div
            style={{
              flex: 1,
              width: "400px",
              height: "200px",
            }}
          >
            <h2>Soil Health Indicators</h2>
            <Radar
              style={{
                flex: 1,
                width: "400px",
                height: "200px",
              }}
              title="Soil Nutrient Content"
              data={chartData}
            />
            {/* /* <p>Microbial Activity: {soilData.soilHealth.microbialActivity}%</p>
            <p>
              Earthworm Populations: {soilData.soilHealth.earthwormPopulations}{" "}
              per sqm
            </p> */}
          </div>
          {/* Display Soil Erosion Risk */}
          {/* <div>
            <h2>Soil Erosion Risk</h2>
            <p>{soilData.soilErosionRisk}</p>
          </div> */}{" "}
          */
          {/* Display Soil Fertility Map */}
          <div>
            <h2>Soil Fertility Map</h2>
            <ReactApexChart
              options={heatChartData?.options}
              series={heatChartData?.series}
              type="heatmap"
              height={350}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default SoilContainer;
