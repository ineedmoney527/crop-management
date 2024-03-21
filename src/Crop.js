import React, { useState } from "react";
import "./Crop.css";
import Planting from "./Planting";
import blueberry from "./images/blueberry.png";
import tomato from "./images/tomato.png";
import carrot from "./images/carrot.png";
import apple from "./images/apple.png";
import banana from "./images/banana.png";
import broccoli from "./images/broccoli.png";

import { blue } from "@mui/material/colors";
export default function Crop({ id, open, onCropSubmit, onClose }) {
  const crops = [
    {
      name: "Blueberry",
      image: blueberry, // Corrected image URL for Tomato
    },
    {
      name: "Carrot",
      image: carrot, // Corrected image URL for Carrot
    },
    {
      name: "Apple",
      image: apple, // Corrected image URL for Carrot
    },
    {
      name: "Tomato",
      image: tomato, // Corrected image URL for Carrot
    },
    {
      name: "Broccoli",
      image: broccoli, // Corrected image URL for Carrot
    },
    {
      name: "Banana",
      image: banana, // Corrected image URL for Carrot
    },
    // Add more crops as needed
  ];

  if (!open) return null;
  const handleAdd = (crop) => {
    onCropSubmit(crop); // Pass the selected crop to the onSubmit function
    onClose();
    <Planting />;
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
        <img src={crop.image} alt={crop.name} />
        <h2>{crop.name}</h2>
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
