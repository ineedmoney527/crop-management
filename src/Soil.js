import React, { useState } from "react";
import "./Soil.css"; // Import CSS for Soil component styles
import { Button } from "@mui/material";

export default function Soil({ open, onSoilInfoSubmit, onClose }) {
  const [soilInfo, setSoilInfo] = useState({
    texture: "Loamy soil",
    ph: "6.5",
    nitrogen: "20 ppm",
    potassium: "15 ppm",
    phosphorus: "10 ppm",
    tilage: "plowing",
    depth: "12 inches",
    time: "Spring planting season",
    name: "John Doe",
    address: "123 Farm Road, Anytown, USA",
  });

  const [activeTab, setActiveTab] = useState("soilInfo"); // Active tab state

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoilInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSoilInfoSubmit(soilInfo);
    onClose(); // Close the Soil component
  };

  return (
    <div className="soil-modal">
      <div className="soil-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="heading1">Soil Information</h2>
        <div className="tabs">
          <button
            className={activeTab === "soilInfo" ? "active" : ""}
            onClick={() => setActiveTab("soilInfo")}
          >
            Soil Testing
          </button>
          <button
            className={activeTab === "tilagePractices" ? "active" : ""}
            onClick={() => setActiveTab("tilagePractices")}
          >
            Tilage Practices
          </button>

          <button
            className={activeTab === "landInformation" ? "active" : ""}
            onClick={() => setActiveTab("landInformation")}
          >
            Land Information
          </button>
        </div>
        {activeTab === "soilInfo" && (
          <form className="Allform" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="texture">
                Texture:
              </label>
              <input
                className="input"
                type="text"
                id="texture"
                name="texture"
                value={soilInfo.texture}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="ph">
                pH:
              </label>
              <input
                className="input"
                type="number"
                id="ph"
                name="ph"
                value={soilInfo.ph}
                onChange={handleChange}
                min="0" // Minimum value allowed
                max="14" // Maximum value allowed
                step="0.1" // Increment or decrement by 0.1
              />
            </div>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="nitrogen">
                Nitrogen:
              </label>
              <input
                className="input"
                type="text"
                id="nitrogen"
                name="nitrogen"
                value={soilInfo.nitrogen}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="potassium">
                Potassium:
              </label>
              <input
                className="input"
                type="text"
                id="potassium"
                name="potassium"
                value={soilInfo.potassium}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="phosphorus">
                Phosphorus:
              </label>
              <input
                className="input"
                type="text"
                id="phosphorus"
                name="phosphorus"
                value={soilInfo.phosphorus}
                onChange={handleChange}
              />
            </div>
            <button id="submitbtn" className="submitbutton" type="submit">
              Submit
            </button>
          </form>
        )}
        {activeTab === "tilagePractices" && (
          <form className="Allform" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="labelTitle-soil">Tilage Practices:</label>
              <div className="radio-group">
                <input
                  className="input"
                  type="radio"
                  id="plowing"
                  name="tilage"
                  value="plowing"
                  checked={soilInfo.tilage === "plowing"}
                  onChange={handleChange}
                />
                <label htmlFor="plowing">Plowing</label>
                <input
                  className="input"
                  type="radio"
                  id="discing"
                  name="tilage"
                  value="discing"
                  checked={soilInfo.tilage === "discing"}
                  onChange={handleChange}
                />
                <label htmlFor="discing">Discing</label>
                <input
                  className="input"
                  type="radio"
                  id="allowing"
                  name="tilage"
                  value="allowing"
                  checked={soilInfo.tilage === "allowing"}
                  onChange={handleChange}
                />
                <label htmlFor="allowing">Allowing</label>
              </div>
            </div>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="depth">
                Depth:
              </label>
              <input
                className="input"
                type="text"
                id="depth"
                name="depth"
                value={soilInfo.depth}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="time">
                Time of Operation:
              </label>
              <input
                className="input"
                type="text"
                id="time"
                name="time"
                value={soilInfo.time}
                onChange={handleChange}
              />
            </div>
            <button className="submitbutton" type="submit">
              Submit
            </button>
          </form>
        )}
        {activeTab === "landInformation" && (
          <form className="Allform" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="Field Name">
                Name:
              </label>
              <input
                className="input"
                type="text"
                id="field"
                name="field"
                value={soilInfo.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="labelTitle-soil" htmlFor="time">
                Address
              </label>
              <input
                className="input"
                type="text"
                id="time"
                name="time"
                value={soilInfo.address}
                onChange={handleChange}
              />
            </div>
            <button className="submitbutton" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
