import { Stack } from "@mui/material";
import icon_care from "../images/User Manual.png";
import "./Cares.css";
import { useEffect, useState } from "react";

const Cares = ({ name }) => {
  const [cares, setCares] = useState([]);
  useEffect(() => {
    try {
      fetch(`http://localhost:8000/api/encyclopedia/cares/${name}`)
        .then((response) => response.json())
        .then((data) => setCares(data));
    } catch (e) {
      console.error("Error:", e);
    }
  }, []);

  return (
    <Stack className="main-content">
      <div className="page-title">
        <img src={icon_care} alt="Icon" />
        <div className="page-title-text">Care Guide for {name}</div>
      </div>
      <div className="care-contents">
        {cares &&
          cares.map((care, index) => (
            <div key={index} className={`page-content`}>
              <Stack className="content-text">
                <div className="content-title">
                  <div>{care.name}</div>
                </div>
                <div className="content-description">{care.description}</div>
              </Stack>
            </div>
          ))}
      </div>
    </Stack>
  );
};

export default Cares;
