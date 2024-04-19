import React, { useState, useEffect } from "react";
import "./PlantingContainer.css";
import CalendarComponent from "./CalendarComponent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoRows } from "react-icons/go";
import { LuFlower } from "react-icons/lu";
import { TbSpacingHorizontal } from "react-icons/tb";
import { TbSpacingVertical } from "react-icons/tb";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { LuTreeDeciduous } from "react-icons/lu";
import { LiaSeedlingSolid } from "react-icons/lia";
import axios from "axios";

const PlantingContainer = ({ landId, crop }) => {
  const [cropInfo, setCropInfo] = useState([]);
  const [harvest, setHarvest] = useState(null);
  const [markedDates, setMarkedDates] = useState(null);

  const harvestData = [
    {
      id: 1,
      crop: "Blueberry",
      quantity: 50,
      weight: "25 kg",
      date: "2024-08-18",
    },
    {
      id: 2,
      crop: "Strawberry",
      quantity: 30,
      weight: "15 kg",
      date: "2024-08-20",
    },
    {
      id: 3,
      crop: "Apple",
      quantity: 100,
      weight: "50 kg",
      date: "2024-09-05",
    },
    {
      id: 4,
      crop: "Grapes",
      quantity: 80,
      weight: "40 kg",
      date: "2024-09-10",
    },
    {
      id: 5,
      crop: "Tomato",
      quantity: 60,
      weight: "30 kg",
      date: "2024-08-25",
    },
    {
      id: 6,
      crop: "Carrot",
      quantity: 120,
      weight: "60 kg",
      date: "2024-09-15",
    },
    {
      id: 7,
      crop: "Potato",
      quantity: 90,
      weight: "45 kg",
      date: "2024-09-20",
    },
    {
      id: 8,
      crop: "Lettuce",
      quantity: 70,
      weight: "35 kg",
      date: "2024-09-25",
    },
    {
      id: 9,
      crop: "Onion",
      quantity: 110,
      weight: "55 kg",
      date: "2024-09-30",
    },
  ];
  const fetchCropInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/map/planting/${landId}`
      );
      setCropInfo((prev) => response.data);
    } catch (error) {
      console.error("Error fetching lands:", error);
    }
  };

  useEffect(() => {
    fetchCropInfo();
  }, []);
  useEffect(() => {
    console.log("Crop Info:", cropInfo);
  }, [cropInfo, markedDates]);

  // Define the marked dates for the calendar

  return crop == null ? (
    <div>Nothing is planted here</div>
  ) : (
    <div className="planting-info">
      <h1 className="header">
        {" "}
        {crop} ({cropInfo?.cultivar}) Planting Information
      </h1>

      <div className="card-container">
        {/* Plant Layout */}
        <div className="card1">
          <h2 className="subh2">Plant Layout</h2>
          <div className="card-content">
            <div className="info-item1">
              <label
                className="title"
                style={{
                  fontSize: "27px",
                  alignContent: "flex-start",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <GoRows style={{ marginRight: "5px" }} />
                Number of Rows
              </label>
              <label
                style={{
                  alignItems: "flex-end",
                  textAlign: "right",
                  fontSize: "50px",
                  fontWeight: "bold",
                }}
              >
                {cropInfo?.noOfRows || ""}
              </label>
            </div>
            <div className="info-item2">
              <label
                className="title"
                style={{
                  fontSize: "27px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "flex-start",
                }}
              >
                <TbSpacingHorizontal style={{ marginRight: "5px" }} />
                Spacing in Row
              </label>{" "}
              <label
                style={{
                  alignItems: "flex-end",
                  textAlign: "right",
                  fontSize: "50px",
                  fontWeight: "bold",
                }}
              >
                {cropInfo?.rowSpacing} ft
              </label>
            </div>
            <div className="info-item3">
              <label
                className="title"
                style={{
                  fontSize: "27px",
                  alignContent: "center",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TbSpacingVertical style={{ marginRight: "5px" }} />
                Spacing Between Rows
              </label>{" "}
              <label
                style={{
                  alignItems: "flex-end",
                  textAlign: "right",
                  fontSize: "50px",
                  fontWeight: "bold",
                }}
              >
                {cropInfo?.spacingOnRows} ft
              </label>
            </div>
          </div>

          {/* Important Dates */}
          <div className="card">
            <h2 className="subh2">Important Dates</h2>
            <div className="card-content2">
              <div className="card-inline">
                <div className="info-item4">
                  <label className="title2">
                    <LiaSeedlingSolid
                      style={{
                        marginRight: "5px",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    Nursery Start
                  </label>{" "}
                  <label className="subcontent">
                    {" "}
                    {cropInfo?.nurseryStartDate?.split("T")[0] || ""} (
                    {cropInfo?.nurseryDays} days)
                  </label>
                </div>
                <div className="info-item5">
                  <label className="title2">
                    <LuTreeDeciduous
                      style={{
                        marginRight: "5px",
                        animation: "wiggle 2s linear infinite",
                      }}
                    />
                    Planting to Ground
                  </label>{" "}
                  <label className="subcontent">
                    {cropInfo?.plantingDate?.split("T")[0] || ""}
                  </label>
                </div>
                <div className="info-item6">
                  <label className="title2">
                    <LuFlower
                      style={{
                        marginRight: "5px",
                        animation: "rotate 2s linear infinite",
                      }}
                    />
                    Estimated Harvest
                  </label>{" "}
                  <label className="subcontent">
                    {cropInfo?.firstHarvestDay}({cropInfo?.daysToMature} days)
                  </label>
                </div>
              </div>
              <div className="info-item7">
                <label className="title2">
                  <MdOutlineBookmarkAdded
                    style={{
                      marginRight: "5px",
                      animation: "pulse 1s infinite",
                    }}
                  />
                  Marked Dates
                </label>
                <CalendarComponent
                  markedDates={{
                    harvest: cropInfo?.firstHarvestDay || "",
                    plant: cropInfo?.plantingDate?.split("T")[0] || "",
                    nursery: cropInfo?.nurseryStartDate?.split("T")[0] || "",
                  }}
                />{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="harvest-tableDisplay">
            <h2 className="subh2">Harvest Records</h2>
            <table className="harvest-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Weight</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {harvestData.map((record) => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.crop}</td>
                    <td>{record.quantity}</td>
                    <td>{record.weight}</td>
                    <td>{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantingContainer;
