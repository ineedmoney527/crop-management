import React, { useState } from "react";
import "./Crop.css";
import Organic from "./images/organici.jpeg";
import AllPurpose from "./images/allpurpose.jpeg";
import Citrus from "./images/citrus.jpeg";
import Granular from "./images/granular.jpeg";
import Liquid from "./images/liquidseaweed.jpeg";
import Slow from "./images/slowrelease.png";
import { blue } from "@mui/material/colors";
import { LinearProgress } from "@mui/material";
export default function AddFertilizer({
  open,
  onFertilizationSubmit,
  onClose,
}) {
  const fertilizers = [
    {
      name: "Organic Plant Food",
      npk: {
        nitrogen: 5,
        phosphorus: 3,
        potassium: 4,
      },
      environmentalRating: 8,
      image: Organic,
    },
    {
      name: "All-Purpose Fertilizer",
      npk: {
        nitrogen: 10,
        phosphorus: 10,
        potassium: 10,
      },
      image: AllPurpose,
      environmentalRating: 7,
    },
    {
      name: "Slow-Release Fertilizer",
      npk: {
        nitrogen: 12,
        phosphorus: 6,
        potassium: 8,
      },
      image: Slow,
      environmentalRating: 9,
    },
    {
      name: "Liquid Seaweed Fertilizer",
      npk: {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 1,
      },
      image: Liquid,
      environmentalRating: 6,
    },
    {
      name: "Granular Flower Fertilizer",
      npk: {
        nitrogen: 5,
        phosphorus: 10,
        potassium: 5,
      },
      image: Granular,
      environmentalRating: 7,
    },
    {
      name: "Citrus Tree Fertilizer",
      npk: {
        nitrogen: 8,
        phosphorus: 4,
        potassium: 8,
      },
      image: Citrus,
      environmentalRating: 8,
    },
  ];

  if (!open) return null;
  const handleAdd = (crop) => {
    onFertilizationSubmit(crop); // Pass the selected crop to the onSubmit function
    onClose();
  };

  const handleViewDetail = (crop) => {
    console.log("View details of:", crop.name);
  };
  const calculateRatio = (value) => {
    return (value / 10) * 100; // Convert the NPK ratio to a percentage for the progress bar
  };

  const FertilizerCard = ({ fertilizer }) => {
    return (
      <div className="fertilizer-card">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={fertilizer.image} alt={fertilizer.name} />
        <label>{fertilizer.name}</label>
        <div className="progress-bars">
          <div className="progress-bar">
            <p>Nitrogen (N): {fertilizer.npk.nitrogen}</p>
            <LinearProgress
              variant="determinate"
              value={calculateRatio(fertilizer.npk.nitrogen)}
            />
          </div>
          <div className="progress-bar">
            <p>Phosphorus (P): {fertilizer.npk.phosphorus}</p>
            <LinearProgress
              variant="determinate"
              value={calculateRatio(fertilizer.npk.phosphorus)}
            />
          </div>
          <div className="progress-bar">
            <p>Potassium (K): {fertilizer.npk.potassium}</p>
            <LinearProgress
              variant="determinate"
              value={calculateRatio(fertilizer.npk.potassium)}
            />
          </div>
          <div className="progress-bar">
            <p>Environmental Rating: {fertilizer.environmentalRating}/10</p>
            <LinearProgress
              variant="determinate"
              value={(fertilizer.environmentalRating / 10) * 100}
              sx={{ backgroundColor: blue[100] }}
            />
          </div>
        </div>
        <button className="select" onClick={() => handleAdd(fertilizer)}>
          Select
        </button>{" "}
        {/* Pass fertilizer to handleAdd */}
        <button className="view" onClick={() => handleViewDetail(fertilizer)}>
          View Detail
        </button>{" "}
        {/* Pass fertilizer to handleViewDetail */}
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
    <div className="fertilizer-modal">
      <h1>Choose Fertilizer</h1>
      <div className="fertilizer-card-container">
        {fertilizers.map((fertilizer) => (
          <FertilizerCard key={fertilizer.id} fertilizer={fertilizer} />
        ))}
      </div>
    </div>
  );
}
