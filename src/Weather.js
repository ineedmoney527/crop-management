import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import "./Weather.css";
import { useNavigate } from "react-router-dom";
import WeatherGraph from "./WeatherGraph";
import { ICON_MAP, weatherDescriptions } from "./WeatherCodeMap";
import axios from "axios";

const Weather = () => {
  const [pageTitle, setPageTitle] = useState("Weather");
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setPageTitle(e.target.value);
  };
  const [currentData, setCurrentData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // Track the starting index of visible data
  const DISPLAY_COUNT = 4; // Number of cards to display at once

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          getWeatherData(lat, lon, timezone);
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  function parseCurrentWeather({ current, daily }) {
    const {
      temperature_2m: temperature,
      wind_speed_10m: wind_speed,
      relative_humidity_2m: humidity,
      weather_code: icon_code,
    } = current;
    const {
      temperature_2m_max: [max_temp],
      temperature_2m_min: [min_temp],
    } = daily;
    return {
      timestamp: current.time * 1000,
      temperature: Math.round(temperature),
      humidity: Math.round(humidity),
      icon_code,
      wind_speed: Math.round(wind_speed),
      max_temp: Math.round(max_temp),
      min_temp: Math.round(min_temp),
    };
  }

  function parseDailyWeather({ daily }) {
    return daily.time.map((time, index) => {
      return {
        timestamp: time * 1000,
        icon_code: daily.weather_code[index],
        temperature: Math.round(daily.temperature_2m_max[index]),
        wind_speed: Math.round(daily.wind_speed_10m_max[index]),
      };
    });
  }

  function parseHourlyWeather({ hourly, current }) {
    return hourly.time
      .map((time, index) => {
        return {
          timestamp: time * 1000,
          icon_code: hourly.weather_code[index],
          temperature: Math.round(hourly.temperature_2m[index]),
          wind_speed: Math.round(hourly.wind_speed_10m[index]),
          humidity: Math.round(hourly.relative_humidity_2m[index]),
        };
      })
      .filter(({ timestamp }) => timestamp >= current.time * 1000);
  }

  function getWeatherData(lat, lon, timezone) {
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timeformat=unixtime",
        {
          params: {
            latitude: lat,
            longitude: lon,
            timezone: timezone,
          },
        }
      )
      .then(({ data }) => {
        setCurrentData(parseCurrentWeather(data));
        setHourlyData(parseHourlyWeather(data).slice(0, 30));
        setDailyData(parseDailyWeather(data));
      })
      .catch((error) => {
        console.error("Error getting weather data:", error);
      });
  }
  function getWeatherIcon(icon_code, timestamp) {
    let key = icon_code;
    if ([0, 1, 2].includes(icon_code)) {
      const hour = new Date(timestamp).getHours();
      if (hour >= 6 && hour < 18) {
        key = `${icon_code}-day`;
      } else {
        key = `${icon_code}-night`;
      }
    }
    return `/weather/${ICON_MAP.get(key)}.svg`;
  }

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

  const [isHourly, setIsHourly] = useState(true);

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => prevIndex - 1); // Move the starting index backward
  };

  const handleNextClick = () => {
    // const totalDataCount = isHourly ? hourlyData.length : dailyData.length;
    setStartIndex((prevIndex) => prevIndex + 1); // Move the starting index forward
  };
  useEffect(() => {
    setStartIndex(0); // Reset the starting index when the data changes
  }, [isHourly]);

  return (
    <div>
      <select
        className="select-pageWeather"
        value={pageTitle}
        onChange={handleTitleChange}
        style={{ fontSize: "24px" }}
      >
        <option value="Accounting">Accounting</option>
        <option value="Crop Summary">Farm Summary</option>
        <option value="Weather">Weather</option>
      </select>
      <Stack className="weather-container">
        <div className="weather-details">
          {currentData && (
            <Stack className="detail-left">
              <div className="main-temperature-container">
                <div className="main-temperature">
                  {currentData.temperature}˚C
                </div>
                <img
                  className="main-temperature-icon"
                  src={getWeatherIcon(
                    currentData.icon_code,
                    currentData.timestamp
                  )}
                  alt={weatherDescriptions[currentData.icon_code]}
                />
              </div>
              <div className="weather-description">
                {weatherDescriptions[currentData.icon_code]} - H{" "}
                {currentData.max_temp}˚C L {currentData.min_temp}˚C
              </div>
              <div className="weather-description">
                Wind: {currentData.wind_speed} km/h
              </div>
              <div className="weather-description">
                Humidity: {currentData.humidity}%
              </div>
            </Stack>
          )}
          <Stack className="detail-right">
            <div className="frequency-container">
              <button
                className={`frequency-button ${isHourly ? "isHourly" : ""}`}
                onClick={() => setIsHourly(true)}
                // className="frequency-button"
                // onClick={() => setIsHourly(true)}
                // style={{
                //   backgroundColor: isHourly ? "#9FC173" : "lightgrey",
                //   transition: "background-color 0.3s ease",
                //   ":hover": {
                //     backgroundColor: isHourly ? "#8ABD64" : "grey",
                //   },
                // }}
                // style={{
                //   // borderBottom: isHourly ? "2px solid #DCDCDC" : "none",
                //   backgroundColor: isHourly ? "#9FC173" : "lightgrey",
                //
                // }}
              >
                Hourly
              </button>
              <button
                className={`frequency-button ${isHourly ? "" : "isHourly"}`}
                onClick={() => setIsHourly(false)}
                // className="frequency-button"
                // onClick={() => setIsHourly(false)}
                // style={{
                //   backgroundColor: isHourly ? "lightgrey" : "#9FC173",
                //   transition: "background-color 0.3s ease",
                //   ":hover": {
                //     backgroundColor: isHourly ? "#8ABD64" : "grey",
                //   },
                // }}
              >
                Daily
              </button>
            </div>
            <div style={{ display: "flex", direction: "row", width: "100%" }}>
              <button
                className="navigate-button"
                onClick={handlePrevClick}
                style={{ visibility: startIndex > 0 ? "visible" : "hidden" }}
              >
                {`<`}
              </button>
              <div className="detail-right-cards">
                {(isHourly ? hourlyData : dailyData)
                  .slice(startIndex, startIndex + DISPLAY_COUNT) // Display a portion of data based on the starting index and display count
                  .map((data, index) => (
                    <Stack
                      key={isHourly ? data.timestamp : index}
                      className="detail-right-card"
                    >
                      <div
                        className="time"
                        style={{ color: "grey", fontSize: "19px" }}
                      >
                        {isHourly
                          ? new Date(data.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : new Date(data.timestamp).toLocaleDateString(
                              "en-US",
                              {
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                      </div>
                      <img
                        className="weather-icon"
                        src={getWeatherIcon(data.icon_code)}
                        alt="weather"
                      />
                      <div className="temperature">{data.temperature}˚C</div>
                      <div className="wind">{data.wind_speed} km/h</div>
                      {isHourly && (
                        <div className="humidity">{data.humidity}%</div>
                      )}
                    </Stack>
                  ))}
              </div>
              <button
                className="navigate-button"
                onClick={handleNextClick}
                style={{
                  visibility:
                    startIndex <
                    (isHourly
                      ? hourlyData.length - DISPLAY_COUNT
                      : dailyData.length - DISPLAY_COUNT)
                      ? "visible"
                      : "hidden",
                }}
              >
                {`>`}
              </button>
            </div>
          </Stack>
        </div>
        <Stack className="weather-reports">
          <div className="card-title">Wind Speed / Temperature Graph</div>
          <WeatherGraph
            isHourly={isHourly}
            labels={(isHourly ? hourlyData : dailyData).map((data) =>
              isHourly
                ? new Date(data.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(data.timestamp).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                  })
            )}
            windSpeedData={(isHourly ? hourlyData : dailyData).map(
              (data) => data.wind_speed
            )}
            temperatureData={(isHourly ? hourlyData : dailyData).map(
              (data) => data.temperature
            )}
          />
        </Stack>
      </Stack>
    </div>
  );
};
export default Weather;
