import React, { useState } from "react";
import CropCard from "./CropCard";
import { TextField, Stack } from "@mui/material";
import "./Encyclopedia.css";
import carrot from "./images/carrot.png";
import cabbage from "./images/cabbage.png";
import corn from "./images/corn.png";
import SideBar from "./SideBar.js";
export default function Encyclopedia({ setName }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const crops = [
    {
      id: 1,
      name: "Carrot",
      scientificName: "Daucus carota",
      otherNames: ["Daucon", "Queen Anne's lace"],
      image: carrot,
    },
    {
      id: 2,
      name: "Cabbage",
      scientificName: "Brassica oleracea",
      otherNames: ["Bok Choy", "Cruciferous Vegetable", "Kale"],
      image: cabbage,
    },
    {
      id: 3,
      name: "Corn",
      scientificName: "Zea mays",
      otherNames: ["Meiz", "Maize", "Mays"],
      image: corn,
    },
  ];

  const filteredCrops =
    search === ""
      ? crops
      : crops.filter(
          (crop) =>
            crop.name.toLowerCase().includes(search) ||
            crop.otherNames.some((otherName) =>
              otherName.toLowerCase().includes(search)
            )
        );

  return (
    <div className="encyclopedia">
      <div className="sidebar">
        <SideBar></SideBar>
      </div>
      <div className="content">
        <div className="encyclopedia-header">
          <div
            style={{ fontSize: "40px", fontWeight: "bold", paddingLeft: "5px" }}
          >
            Crop Catalogue
          </div>
          <TextField
            className="search-bar"
            id="search"
            label="Search by name"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
            style={{ width: "50%" }}
          />
        </div>
        <div className="crops-container">
          <div className="crop-card-header">
            <div className="number-header">ID</div>
            <div className="name-stack-header">Name</div>
            <div className="other-names-header">Other Names</div>
            <div className="image-header">Image</div>
          </div>
          <div className="crop-list">
            {filteredCrops.map((crop) => (
              <CropCard
                key={crop.id}
                name={crop.name}
                scientificName={crop.scientificName}
                otherNames={crop.otherNames}
                image={crop.image}
                id={crop.id}
                setName={setName}
                bgColor={crop.id % 2 === 1 ? "#E6EABC" : "white"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
