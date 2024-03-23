import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import AddFertilization from "./AddFertilization";
import TodoList from "./TodoList";
import { green } from "@mui/material/colors";
const FertilizationPage = () => {
  // State variables for form inputs
  const [fertilizer, setFertilizer] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");
  const [fertilizerAmount, setFertilizerAmount] = useState("");
  const [fertilizationDate, setFertilizationDate] = useState("");
  const [showAddFertilization, setShowAddFertilization] = useState("");

  // Function to handle form submission

  const handleSelect = () => {
    setShowAddFertilization(true);
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
  const FertilizationHistoryTable = ({ fertilizationHistory }) => {
    return (
      <div className="harvest-table">
        <h2 style={{ marginTop: "50px" }}>Fertilization History</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Zone</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {fertilizationHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.zone}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  const fertilizationHistory = [
    {
      id: 1,
      name: "Organic Plant Food",
      zone: "A1",
      amount: "50 lbs",
      date: "2023-10-15",
    },
    {
      id: 2,
      name: "All-Purpose Fertilizer",
      zone: "B2",
      amount: "30 lbs",
      date: "2023-11-20",
    },
    {
      id: 3,
      name: "Slow-Release Fertilizer",
      zone: "C3",
      amount: "40 lbs",
      date: "2024-02-05",
    },
    {
      id: 4,
      name: "Liquid Seaweed Fertilizer",
      zone: "D4",
      amount: "20 gallons",
      date: "2024-03-10",
    },
    {
      id: 5,
      name: "Granular Flower Fertilizer",
      zone: "E5",
      amount: "25 lbs",
      date: "2024-04-02",
    },
    {
      id: 6,
      name: "Citrus Tree Fertilizer",
      zone: "F6",
      amount: "35 lbs",
      date: "2024-05-15",
    },
    {
      id: 7,
      name: "Vegetable Garden Fertilizer",
      zone: "G7",
      amount: "45 lbs",
      date: "2024-06-20",
    },
    {
      id: 8,
      name: "Rose Fertilizer",
      zone: "H8",
      amount: "40 lbs",
      date: "2024-07-05",
    },
    {
      id: 9,
      name: "Tomato Plant Food",
      zone: "I9",
      amount: "30 lbs",
      date: "2024-08-10",
    },
    {
      id: 10,
      name: "Tree and Shrub Fertilizer",
      zone: "J10",
      amount: "50 lbs",
      date: "2024-09-25",
    },
    {
      id: 11,
      name: "Orchid Fertilizer",
      zone: "K11",
      amount: "15 lbs",
      date: "2024-10-15",
    },
  ];

  return (
    <div className="fertilization-page">
      <h1 style={{ color: "darkgreen", fontWeight: "bold" }}>
        Fertilization Page
      </h1>
      <ReactApexChart
        options={heatChartData?.options}
        series={heatChartData?.series}
        type="heatmap"
        height={350}
        style={{ marginTop: "90px", marginBottom: "50px" }}
      />

      <form style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          className="form-group"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label htmlFor="fertilizerType">Fertilizer Type:{fertilizer}</label>
          <button
            style={{
              marginBottom: "5px",
              backgroundColor: "lightgreen",
              borderWidth: "3px",
              borderColor: "black",
            }}
            onClick={handleSelect}
          >
            Select
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="fertilizerAmount">Fertilizer Amount (lbs):</label>
          <input
            type="text"
            id="fertilizerAmount"
            value={fertilizerAmount}
            onChange={(e) => setFertilizerAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fertilizationDate">Fertilization Date:</label>
          <input
            type="date"
            id="fertilizationDate"
            value={fertilizationDate}
            onChange={(e) => setFertilizationDate(e.target.value)}
            required
          />
        </div>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button type="submit" style={{ marginLeft: "30%", marginRight: "30%" }}>
          Submit
        </button>
      </div>

      <div id="fertilizationPortal">
        <AddFertilization
          open={showAddFertilization}
          onFertilizationSubmit={(fertilizer) => {
            setFertilizer(fertilizer.name);
            setShowAddFertilization(false);

            // setSelectedLand(newLand);
          }}
          onClose={() => setShowAddFertilization(false)}
        />
      </div>
      <FertilizationHistoryTable fertilizationHistory={fertilizationHistory} />
    </div>
  );
};

export default FertilizationPage;
