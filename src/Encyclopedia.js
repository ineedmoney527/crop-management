import React, { useState, useEffect } from "react";
import CropCard from "./CropCard";
import { TextField } from "@mui/material";
import "./Encyclopedia.css";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Encyclopedia() {
  const [search, setSearch] = useState("");
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  useEffect(() => {
    // Fetch crops data from the API endpoint
    fetch("http://localhost:8000/api/encyclopedia/crops")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching crops at fronteee");
        }
        // Print response headers to the console
        console.log("Response headers:", response.headers);
        return response.json();
      })
      .then((data) => {
        console.log("Crops data:", data);
        setCrops(data);
        setFilteredCrops(data);
      })
      .catch((error) => console.error("Error fetching crops at front:", error));
  }, []);

  useEffect(() => {
    // Filter crops based on search query
    setFilteredCrops(
      crops.filter(
        (crop) =>
          crop.name.toLowerCase().includes(search) ||
          crop.otherNames.some((otherName) =>
            otherName.toLowerCase().includes(search)
          )
      )
    );
  }, [search, crops]);

  return (
    <div className="encyclopedia">
      <Stack className="sidebar">
        <button
          className="sidebar-button"
          onClick={() => navigate("/Learning")}
        >
          Learning
        </button>
        <button className="sidebar-button active">Encyclopedia</button>
      </Stack>
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
            {filteredCrops.map((crop, index) => (
              <CropCard
                key={crop.id}
                name={crop.name}
                scientificName={crop.scientificName}
                otherNames={crop.otherNames}
                image={crop.image}
                id={index + 1}
                bgColor={"white"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
