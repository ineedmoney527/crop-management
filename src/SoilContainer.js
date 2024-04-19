import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Radar } from "react-chartjs-2";
import GaugeComponent from "react-gauge-component";
import "./SoilContainer.css";
import PHChart from "./PHChart.js";
// import ReactApexChart from "react-apexcharts";

const SoilContainer = () => {
  const [soilData, setSoilData] = useState(null);
  const [alert_message, setAlertMessage] = useState("");
  const [moisture, setMoisture] = useState(0); // Soil moisture percentage
  const [isRotating, setIsRotating] = useState(false);

  const handleAlert = (humidity) => {
    // Define threshold values for alert messages
    const suitableMin = 20;
    const suitableMax = 80;

    if (humidity < suitableMin) {
      setAlertMessage("Soil moisture is too low!"); // Show alert for low humidity
    } else if (humidity > suitableMax) {
      setAlertMessage("Soil moisture is too high!"); // Show alert for very high humidity
    } else {
      setAlertMessage(""); // Reset alert message
    }
  };

  // Check for alerts when the component renders
  useEffect(() => {
    handleAlert(moisture);
  }, [moisture]);

  const getMoisture = () => {
    setIsRotating(true);
    // fetch("http://raspberrypi.local:3000/api/getHumidity/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setMoisture(data.humidity);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error.message);
    //   });
    setMoisture(Math.floor(Math.random() * 100)); // Simulate random soil moisture data
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  useEffect(() => {
    getMoisture();
  }, []);

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
    <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
      <h1>Soil Management Dashboard</h1>

      {soilData && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* pH Level and Nutrient Value */}
          <div style={{ display: "flex", gap: "20px" }}>
            <div
              className="gauge-container"
              style={{
                borderRadius: "15px",
                border: "2px solid #000",
                padding: "25px",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "10px",
                border: "1px solid #000",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
                height: "90vh",
                width: "40vw",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <label className="card-header">Soil moisture value</label>
                <button
                  className={`${isRotating ? "rotate-animation" : ""}`}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={getMoisture}
                >
                  <img
                    className="refresh-button"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "transparent",
                    }}
                    src="refresh.svg"
                    alt="refresh"
                  />
                </button>
              </div>
              <GaugeComponent
                style={{
                  marginBottom: "50px",
                  marginTop: "50px",
                }}
                minValue={0}
                maxValue={100}
                height={100}
                width={100}
                value={moisture}
                type="radial"
                labels={{
                  tickLabels: {
                    type: "inner",
                  },
                }}
                arc={{
                  subArcs: [
                    {
                      limit: 20,
                      color: "red",
                      showTick: true,
                    }, // Customize your arc colors and limits as needed
                    {
                      limit: 40,
                      color: "orange",
                      showTick: true,
                    },
                    {
                      limit: 60,
                      color: "yellow",
                      showTick: true,
                    },
                    {
                      limit: 80,
                      color: "green",
                      showTick: true,
                    },
                    { limit: 100, color: "blue", showTick: true },
                  ],
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0.3,
                }}
              />
              {alert_message && (
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      className="alert-icon"
                      src="alert.svg"
                      alt="alert"
                      style={{
                        height: "30px",
                        width: "30px",
                        backgroundColor: "transparent",
                      }}
                    />
                    <label
                      style={{
                        color: "red",
                        fontWeight: "bolder",
                        fontSize: "x-large",
                      }}
                    >
                      {alert_message}
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                borderRadius: "15px",
                padding: "25px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Horizontally center content
                border: "1px solid #000",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                width: "60vw",
                height: "90vh",
              }}
            >
              <div style={{ alignSelf: "flex-start" }}>
                <label className="card-header">Soil Health Indicators</label>
              </div>
              <Radar
                style={{
                  width: "30%",
                  height: "80%",
                  maxHeight: "90%",
                }}
                title="Soil Nutrient Content"
                data={chartData}
              />
            </div>
          </div>

          {/* Temperature and Moisture Chart */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <div
              style={{
                borderRadius: "15px",
                border: "2px solid #000",
                padding: "25px",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                border: "1px solid #000",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
                width: "70%",
              }}
            >
              <label className="card-header">
                Soil Moisture and Temperature
              </label>
              <p>Moisture: {soilData.soilMoisture}%</p>
              <p>Temperature: {soilData.soilTemperature}°C</p>
              <TemperatureMoistureChart data={soilData.tempMoisture} />
            </div>
            <div
              style={{
                borderRadius: "15px",
                border: "2px solid #000",
                padding: "25px",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                border: "1px solid #000",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
                width: "30%",
              }}
            >
              <div style={{ flex: "1" }}>
                <label className="card-header">Soil pH Value</label>
              </div>
              <PHChart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SoilContainer;
