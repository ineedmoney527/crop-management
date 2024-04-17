import React, { useState, useEffect } from "react";
import "./AddFertilization.css";
import Planting from "./Planting.js";
import blueberry from "./images/blueberry.png";
import tomato from "./images/tomato.png";
import carrot from "./images/carrot.png";
import apple from "./images/apple.png";
import banana from "./images/banana.png";
import broccoli from "./images/broccoli.png";
import axios from "axios";
import { blue } from "@mui/material/colors";
export default function Crop({ open, onCropSubmit, onClose, user_id }) {
  const [crops, setCrops] = useState([]);
  const fetchCrops = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/map/addCrop`);
      setCrops(response.data);
      console.log("sell" + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  if (!open) return null;
  const handleAdd = (crop) => {
    onCropSubmit(crop); // Pass the selected crop to the onSubmit function
    onClose();
  };

  const handleViewDetail = (crop) => {
    console.log("View details of:", crop.name);
  };

  const CropCard = ({ crop }) => {
    return (
      <div className="crop-card">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={`./images/${crop.image}`} alt={crop.name} />
        <label>{crop.name}</label>
        <button className="select" onClick={() => handleAdd(crop)}>
          Select
        </button>{" "}
        {/* Pass crop to handleAdd */}
        <button className="view" onClick={() => handleViewDetail(crop)}>
          View Detail
        </button>{" "}
        {/* Pass crop to handleViewDetail */}
      </div>
    );
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (selectedCrop) {
  //       onCropSubmit(selectedCrop); // Pass the selected crop to the onSubmit function
  //       onClose(); // Close the Crop component
  //     } else {
  //       console.error("No crop selected.");
  //     }
  //   };

  return (
    <div className="crop-modal">
      <h1>Choose Crops to Plant</h1>
      <div className="crop-card-container">
        {crops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
    </div>
  );
}
