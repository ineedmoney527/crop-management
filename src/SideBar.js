import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { Stack } from "@mui/material";

const Sidebar = () => {
  const [selectedPage, setSelectedPage] = useState("encyclopedia");
  const pages = ["weather", "encyclopedia", "accounting"];
  let navigate = useNavigate();

  useEffect(() => {
    switch (selectedPage) {
      case "weather":
        navigate("/Weather");
        break;
      case "encyclopedia":
        navigate("/Encyclopedia");
        break;
      case "accounting":
        navigate("/Accounting");
        break;
      default:
        navigate("/Encyclopedia");
    }
  }, [selectedPage]);
  return (
    <Stack className="sidebar">
      {pages.map((page) => (
        <button
          className={`sidebar-button ${selectedPage === page ? "active" : ""}`}
          onClick={() => setSelectedPage(page)}
        >
          {page.charAt(0).toUpperCase() + page.slice(1)}
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
