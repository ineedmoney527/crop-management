import React, { useState, useRef } from "react";
import "./Learning3.css";
import IntroVideo from "./images/Video.mp4";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const Learning3 = () => {
  // State to manage video playback
  const [setIsPlaying] = useState(false);

  // Ref to the video element
  const videoRef = useRef(null);

  // Function to toggle playback
  const togglePlayback = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Failed to start playback:", error);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const navigate = useNavigate();

  const handleAIClick = () => {
    navigate("/");
  };
  const handleLearningClick = () => {
    navigate("Learning");
  };

  return (
    <div className={"L3-container"}>
      <Stack className="sidebar">
        <button
          className="sidebar-button"
          onClick={() => navigate("/Encyclopedia")}
        >
          Encyclopedia
        </button>
        <button
          className="sidebar-button active"
          onClick={() => navigate("/Learning1")}
        >
          Learning
        </button>
      </Stack>
      <div className={"L3-Content"}>
        <div className={"L3-Title"}>Chapter 3 Preparation of Tools</div>

        <div className="video-container">
          <video
            ref={videoRef}
            className="video-player"
            controls // Display default controls
            onClick={togglePlayback} // Allow toggling playback by clicking on the video
          >
            <source src={IntroVideo} type="video/mp4" />
          </video>
        </div>

        <div className={"L3-Note-Content"}>
          <label className={"L3-Note-Title"}>Note</label>
          <button className={"L3-Print-Button"}>Print</button>
        </div>

        <div className="line"></div>

        <div className={"L3-Detail"}>
          <label>
            1. Watering can or spray bottle: For watering the plant, providing
            the necessary moisture without causing waterlogging.
            <br />
            2. Pruning shears or scissors: To trim off dead or yellowing leaves,
            promote healthy growth, and maintain the plant's appearance.
            <br />
            3. Well-draining pot: Ensure the Anthurium is potted in a container
            with drainage holes to prevent water from accumulating at the roots.
            <br />
            4. Potting mix: Use a well-draining potting mix formulated for
            houseplants or orchids to provide adequate aeration and drainage for
            the Anthurium's roots.
            <br />
            5. Fertilizer: Choose a balanced liquid fertilizer formulated for
            flowering houseplants, and follow the instructions for application
            to provide essential nutrients for healthy growth and blooming.
            <br />
            6. Moisture meter or finger: To gauge soil moisture levels and
            determine when the plant needs watering, preventing over or
            under-watering.
            <br />
            7. Gloves: Optional but useful for protecting your hands, especially
            if you have sensitive skin or if the plant has thorns or rough
            foliage.
            <br />
            By having these tools prepared and easily accessible, you can ensure
            that caring for your Anthurium plant is a smooth and enjoyable
            experience, promoting its health and vitality."
          </label>
        </div>
      </div>
    </div>
  );
};

export default Learning3;
