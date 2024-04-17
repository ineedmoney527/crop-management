import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import weather1 from "./images/weather1.png";
import weather2 from "./images/weather2.png";
import weather3 from "./images/weather3.png";
import weather4 from "./images/weather4.png";
// import WeatherGraph from "./WeatherGraph";
import "./Weather.css";
import TransactionBarChart from "./TransactionBarChart.js";
import { useNavigate } from "react-router-dom";
import WeatherGraph from "./WeatherGraph.js";
const Weather = () => {
  const [pageTitle, setPageTitle] = useState("Weather");
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setPageTitle(e.target.value);
  };

  useEffect(() => {
    // Navigate to a specific page based on the selected title
    switch (pageTitle) {
      case "Crop Summary":
        navigate("/CropSummary");
        break;

      case "Weather":
        navigate("/Weather");
        break;
      // Add more cases for additional options if needed
      default:
        navigate("/Accounting");
        break;
    }
  }, [pageTitle]);

  const transactions = [
    {
      id: 1,
      date: "2023-06-12",
      payee: "John Doe",
      category: "Livestock Sales",
      description: "Sale of cattle",
      type: "Income",
      amount: 223.0,
    },
    {
      id: 2,
      date: "2023-05-26",
      payee: "Jane Smith",
      category: "Gardening",
      description: "Purchase of seeds and gardening tools",
      type: "Expense",
      amount: 500.0,
    },
    {
      id: 3,
      date: "2023-05-25",
      payee: "Mike Johnson",
      category: "Resale Items",
      description: "Resale of farm equipment",
      type: "Income",
      amount: 83.88,
    },
    {
      id: 4,
      date: "2023-05-25",
      payee: "John Doe",
      category: "Resale Items",
      description: "Resale of farm tools",
      type: "Income",
      amount: 60.0,
    },
    {
      id: 5,
      date: "2023-04-13",
      payee: "Jane Smith",
      category: "Miscellaneous Income",
      description: "Miscellaneous income source",
      type: "Income",
      amount: 860.0,
    },
    {
      id: 6,
      date: "2023-07-18",
      payee: "Alice Johnson",
      category: "Maintenance",
      description: "Repair of farming equipment",
      type: "Expense",
      amount: 120.0,
    },
    {
      id: 7,
      date: "2023-07-22",
      payee: "Bob Williams",
      category: "Transportation",
      description: "Transportation expenses for farm produce",
      type: "Expense",
      amount: 65.5,
    },
    {
      id: 8,
      date: "2023-08-05",
      payee: "Charlie Brown",
      category: "Fertilizers",
      description: "Purchase of fertilizers for crops",
      type: "Expense",
      amount: 300.0,
    },
    {
      id: 9,
      date: "2023-08-15",
      payee: "David Miller",
      category: "Rent",
      description: "Payment for renting farmland",
      type: "Expense",
      amount: 700.0,
    },
    {
      id: 10,
      date: "2023-08-20",
      payee: "Emma Davis",
      category: "Utilities",
      description: "Payment for farm utilities",
      type: "Expense",
      amount: 150.0,
    },
  ];
  const [isHourly, setIsHourly] = useState(true);
  const hourly_data = [
    {
      time: "1:00 PM",
      icon: weather2,
      temperature: "29˚C",
      wind: "8.2 km/h",
      humidity: "65%",
    },
    {
      time: "2:00 PM",
      icon: weather3,
      temperature: "30˚C",
      wind: "7.5 km/h",
      humidity: "63%",
    },
    {
      time: "3:00 PM",
      icon: weather4,
      temperature: "31˚C",
      wind: "6.8 km/h",
      humidity: "60%",
    },
    {
      time: "4:00 PM",
      icon: weather4,
      temperature: "32˚C",
      wind: "9.3 km/h",
      humidity: "58%",
    },
  ];

  const daily_data = [
    {
      day: "Monday",
      icon: weather3,
      temperature: "30˚C",
      wind: "8.2 km/h",
      humidity: "65%",
    },
    {
      day: "Tuesday",
      icon: weather2,
      temperature: "31˚C",
      wind: "7.5 km/h",
      humidity: "63%",
    },
    {
      day: "Wednesday",
      icon: weather4,
      temperature: "32˚C",
      wind: "6.8 km/h",
      humidity: "60%",
    },
    {
      day: "Thursday",
      icon: weather2,
      temperature: "33˚C",
      wind: "9.3 km/h",
      humidity: "58%",
    },
  ];

  return (
    <div>
      <select
        className="select-pageWeather"
        value={pageTitle}
        onChange={handleTitleChange}
        style={{ fontWeight: "bold", fontSize: "24px" }}
      >
        {/* {" "} */}
        <option value="Accounting">Accounting</option>
        <option value="Crop Summary">Farm Summary</option>
        <option value="Weather">Weather</option>
        {/* Add options for the select dropdown here */}
      </select>
      <Stack className="weather-container">
        <div className="weather-details">
          <Stack className="detail-left">
            <div className="card-title">Weather</div>
            <div className="main-temperature-container">
              <div className="main-temperature">29˚C</div>
              <img
                className="main-temperature-icon"
                src={weather1}
                alt="weather"
              ></img>
            </div>
            <div className="weather-description">
              Light Rain - H 33˚C L 28˚C
            </div>
            <div className="weather-description">Wind: 6.5 km/h</div>
            <div className="weather-description">Humidity: 60%</div>
          </Stack>
          <Stack className="detail-right">
            <div className="frequency-container">
              <button
                className="frequency-button"
                onClick={() => setIsHourly(true)}
                style={{
                  borderBottom: isHourly ? "2px solid #000" : "none",
                  color: "black",
                }}
              >
                Hourly
              </button>
              <button
                className="frequency-button"
                onClick={() => setIsHourly(false)}
                style={{
                  borderBottom: isHourly ? "none" : "2px solid #000",
                  color: "black",
                }}
              >
                Daily
              </button>
            </div>
            <div className="detail-right-contents">
              {(isHourly ? hourly_data : daily_data).map((data) => (
                <Stack
                  key={isHourly ? data.time : data.date}
                  className="detail-right-content"
                >
                  <div className="time">{isHourly ? data.time : data.day}</div>
                  <img className="weather-icon" src={data.icon} alt="weather" />
                  <div className="temperature">{data.temperature}</div>
                  <div className="wind">{data.wind}</div>
                  <div className="humidity">{data.humidity}</div>
                </Stack>
              ))}
            </div>
          </Stack>
        </div>
        <Stack className="weather-reports">
          <div className="card-title">Wind Speed / Tempearture Graph</div>
          <WeatherGraph></WeatherGraph>
          {/* <WeatherGraph /> */}
        </Stack>
      </Stack>
    </div>
  );
};
export default Weather;
