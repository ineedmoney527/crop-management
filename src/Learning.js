import React from "react";
import "./Learning.css";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
const Learning = () => {
  const navigate = useNavigate();

  const handleChapterClick = () => {
    navigate("/Learning2");
  };

  const handleAIClick = () => {
    navigate("/");
  };
  const handleLearningClick = () => {
    navigate("/Encyclopedia");
  };

  return (
    <div className="chat-container">
      <Stack className="sidebar">
        <button
          className="sidebar-button "
          onClick={() => navigate("/Encyclopedia")}
        >
          {" "}
          Encyclopedia
        </button>
        <button className="sidebar-button active">Learning</button>
      </Stack>
      {/* <div className={"chat_sidebar"}>
        <div className={"chat-sidebar-box"}>
          <button className={"sidebar-button"}>AI Tools</button>
          <button className={"sidebar-button"} onClick={handleLearningClick}>
            Learning
          </button>
        </div>
      </div> */}
      <div className="chat-messages">
        <div className="title">
          <p>Crop Management Lectures</p>
        </div>
        {/*<label className={"message-sent-label"}>Popular Questions</label>*/}
        <div className={"learning-column"}>
          <div className={"learning-column-1"}>
            <label className={"button-name"}>Chapter 1</label>
            <button className={"learning-button"} onClick={handleChapterClick}>
              Introduction Video
            </button>
            <label className={"button-name"}>Chapter 3</label>
            <button className={"learning-button"} onClick={handleChapterClick}>
              Crop Preparation
            </button>
            <label className={"button-name"}>Chapter 5</label>
            <button className={"learning-button"} onClick={handleChapterClick}>
              Knowledge of Crops
            </button>
          </div>
          <div className={"learning-column-2"}>
            <label className={"button-name"}>Chapter 2</label>
            <button className={"learning-button"} onClick={handleChapterClick}>
              Soil Preparation
            </button>
            <label className={"button-name"}>Chapter 4</label>
            <button className={"learning-button"} onClick={handleChapterClick}>
              Tools Preparation
            </button>
            <label className={"button-name"}>Chapter 6</label>
            <button className={"learning-button"} onClick={handleChapterClick}>
              Pest Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
