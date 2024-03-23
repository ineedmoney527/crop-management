import React, { useState, useEffect } from "react";
import "./PlantingContainer.css";
import CalendarComponent from "./CalendarComponent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PlantingContainer = () => {
  const [cropName, setCropName] = useState("Blueberry");
  const [cultivar, setCultivar] = useState("Variety X");
  const [plantingMethod, setPlantingMethod] = useState("rowPlanting");
  const [seedTreatment, setSeedTreatment] = useState("treatment2");
  const [plantingAmount, setPlantingAmount] = useState(120);
  const [nurseryStartDate, setNurseryStartDate] = useState(
    new Date("2024-03-20")
  );
  const [nurseryDays, setNurseryDays] = useState(30);
  const [plantingDate, setPlantingDate] = useState(new Date("2024-04-20"));
  const [daysToMature, setDaysToMature] = useState(120);
  const [firstHarvestDay, setFirstHarvestDay] = useState("");

  const [noOfRows, setNoOfRows] = useState(10);
  const [rowSpacing, setRowSpacing] = useState(2);
  const [spacingOnRows, setSpacingOnRows] = useState(4);
  const [bedVisualization, setBedVisualization] = useState("");

  useEffect(() => {
    if (plantingDate && daysToMature) {
      const maturityDate = new Date(plantingDate);
      maturityDate.setDate(maturityDate.getDate() + daysToMature);
      setFirstHarvestDay(maturityDate.toDateString());
    }
  }, [plantingDate, daysToMature]);

  // Define the marked dates for the calendar
  const markedDates = [
    new Date("2024-03-20"),
    new Date("2024-04-20"),
    new Date("2024-08-14"),
  ];
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

  return (
    <div className="planting-info">
      <h1 className="header">Blueberry Planting Information</h1>

      <div className="card-container">
        {/* Plant Layout */}
        <div className="card">
          <h2>Plant Layout</h2>
          <div className="info-item">
            <label className="title">Number of Rows</label>{" "}
            <label>{noOfRows}</label>
          </div>
          <div className="info-item">
            <label className="title">Spacing in Row</label>{" "}
            <label>{rowSpacing} ft</label>
          </div>
          <div className="info-item">
            <label className="title">Spacing Between Rows</label>{" "}
            <label>{spacingOnRows} ft</label>
          </div>
        </div>

        {/* Important Dates */}
        <div className="card">
          <h2>Important Dates</h2>
          <div className="info-item">
            <label className="title">Nursery Start</label>{" "}
            <label>March 20, 2024 (30 days)</label>
          </div>
          <div className="info-item">
            <label className="title">Planting to Ground</label>{" "}
            <label>April 20, 2024</label>
          </div>
          <div className="info-item">
            <label className="title">Estimated Harvest</label>{" "}
            <label>August 18, 2024 (120 days)</label>
          </div>

          <div className="info-item">
            <label className="title">Marked Dates</label>
            <CalendarComponent></CalendarComponent>
          </div>
        </div>
        <div className="card">
          <div className="harvest-table">
            <h2>Harvest Records</h2>
            <table>
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
