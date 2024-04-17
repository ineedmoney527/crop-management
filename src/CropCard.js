import React from "react";
import "./CropCard.css";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CropCard = ({ id, name, scientificName, otherNames, image, bgColor }) => {
  const navigate = useNavigate();
  const handleCropClick = () => {
    navigate(`/CropDetails/Details/${name}`);
  };
  return (
    <button className="crop-card" onClick={handleCropClick}>
      <div className="card-content">
        <div className="crop-card-number">{id}</div>
        <Stack className="name-stack">
          <div className="normal-name">{name}</div>
          <div className="scientific-name">{scientificName}</div>
        </Stack>
        <Stack className="other-names-container">
          {otherNames.length > 0 ? (
            otherNames.map((otherName, index) => (
              <div key={index} className="other-name">
                {otherName}
              </div>
            ))
          ) : (
            <div className="other-name" style={{ fontStyle: "italic" }}>
              None
            </div>
          )}
        </Stack>
        <div className="crop-card-image">
          <img src={image} alt={name} />
        </div>
      </div>
    </button>
  );
};

export default CropCard;
