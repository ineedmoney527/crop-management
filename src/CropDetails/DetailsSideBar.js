import React from "react";
import { Stack } from "@mui/material";
import icon_info from "../images/Info.png";
import icon_care from "../images/User Manual.png";
import icon_faq from "../images/Question Mark.png";
import icon_insect from "../images/Insect.png";
import icon_disease from "../images/Potted Plant.png";
import "./DetailsSideBar.css";

export default function DetailsSideBar({ selectedDetail, setSelectedDetail }) {
  const side_components = [
    {
      name: "info",
      icon: icon_info,
    },
    {
      name: "care",
      icon: icon_care,
    },
    {
      name: "faq",
      icon: icon_faq,
    },
    {
      name: "insect",
      icon: icon_insect,
    },
    {
      name: "disease",
      icon: icon_disease,
    },
  ];

  return (
    <Stack className="side-buttons">
      {side_components.map((component) => (
        <button key={component.name}
          className={`side-button ${
            selectedDetail === component.name ? "active" : ""
          }`}
          onClick={() => setSelectedDetail(component.name)}
        >
          <img src={component.icon} alt={`${component.name} Icon`} />
        </button>
      ))}
    </Stack>
  );
}
