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

  return (
    <div style={{ margin: "10px" }}>
      <h1 style={{ marginBottom: "20px" }}>Soil Management Dashboard</h1>

      {soilData && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* pH Level and Nutrient Value */}
          <div style={{ display: "flex", gap: "20px" }}>
            <div
              className="gauge-container"
              style={{
                borderRadius: "15px",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                border: "1px solid #d2d2d2",
                boxShadow: "5px 8px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div>
                <h2 style={{ marginLeft: "30px", fontWeight: "bold" }}>
                  pH value
                </h2>
              </div>
              <GaugeComponent
                style={{
                  marginBottom: "100px",
                }}
                minValue={0}
                maxValue={14}
                height={200}
                width={200}
                value={3}
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
                    { limit: 6, color: "yellow", showTick: true }, // pH between 5 and 7 (Yellow)
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
              <div
                class="alert-container"
                style={{
                  width: "80%",
                  marginLeft: "45px",
                  backgroundColor: "#f0f0f0",
                  border: "3px solid #ccc",
                  borderRadius: "10px",
                  backgroundColor: "lightyellow",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3 style={{ color: "red", fontWeight: "bolder" }}>
                  Alert : ph Value too low !
                </h3>
              </div>
            </div>
            <div
              style={{
                borderRadius: "15px",
                border: "1px solid #d2d2d2",
                padding: "10px",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // gap: "10px",
                boxShadow: "5px 8px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div>
                <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Soil Health Indicators
                </h2>
              </div>
              <Radar
                style={{ flex: "1", height: "300px" }}
                title="Soil Nutrient Content"
                data={chartData}
              />
            </div>
          </div>

          {/* Temperature and Moisture Chart */}
          <div
            style={{
              borderRadius: "15px",
              border: "2px solid #000",
              padding: "50px",
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
              border: "1px solid #000",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>
              Soil Moisture and Temperature
            </h2>
            <p>Moisture: {soilData.soilMoisture}%</p>
            <p>Temperature: {soilData.soilTemperature}°C</p>
            <div style={{ width: "100%", height: "100%" }}>
              <TemperatureMoistureChart data={soilData.tempMoisture} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SoilContainer;
