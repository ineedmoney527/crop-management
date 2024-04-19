// import React, { useState, useRef } from "react";
// import "./Learning3.css";
// import IntroVideo from "./images/Video.mp4";
// import { useNavigate } from "react-router-dom";
//
// const Learning3 = () => {
//   // State to manage video playback
//   const [setIsPlaying] = useState(false);
//
//   // Ref to the video element
//   const videoRef = useRef(null);
//
//   // Function to toggle playback
//   const togglePlayback = () => {
//     if (videoRef.current.paused || videoRef.current.ended) {
//       videoRef.current
//         .play()
//         .then(() => {
//           setIsPlaying(true);
//         })
//         .catch((error) => {
//           console.log("Failed to start playback:", error);
//         });
//     } else {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   };
//
//   const navigate = useNavigate();
//
//   const handleAIClick = () => {
//     navigate("/");
//   };
//   const handleLearningClick = () => {
//     navigate("Learning");
//   };
//
//   return (
//     <div className={"container"}>
//       <div className={"L3-Content"}>
//         <div className={"L3-Title"}>Chapter 3 Preparation of Tools</div>
//
//         <div className="video-container">
//           <video
//             ref={videoRef}
//             className="video-player"
//             controls // Display default controls
//             onClick={togglePlayback} // Allow toggling playback by clicking on the video
//           >
//             <source src={IntroVideo} type="video/mp4" />
//             {/* Add additional <source> tags for different video formats if needed */}
//             {/* Your browser does not support the video tag. */}
//           </video>
//           {/*<button className="play-button" onClick={togglePlayback}>*/}
//           {/*    {isPlaying ? 'Pause' : 'Play'}*/}
//           {/*</button>*/}
//         </div>
//
//         <div className={"L3-Note-Content"}>
//           <label className={"L3-Note-Title"}>Note</label>
//           <button className={"L3-Print-Button"}>Print</button>
//         </div>
//
//         <div className="line"></div>
//
//         <div className={"L3-Detail"}>
//           <label>
//             1. Watering can or spray bottle: For watering the plant, providing
//             the necessary moisture without causing waterlogging.
//             <br />
//             2. Pruning shears or scissors: To trim off dead or yellowing leaves,
//             promote healthy growth, and maintain the plant's appearance.
//             <br />
//             3. Well-draining pot: Ensure the Anthurium is potted in a container
//             with drainage holes to prevent water from accumulating at the roots.
//             <br />
//             4. Potting mix: Use a well-draining potting mix formulated for
//             houseplants or orchids to provide adequate aeration and drainage for
//             the Anthurium's roots.
//             <br />
//             5. Fertilizer: Choose a balanced liquid fertilizer formulated for
//             flowering houseplants, and follow the instructions for application
//             to provide essential nutrients for healthy growth and blooming.
//             <br />
//             6. Moisture meter or finger: To gauge soil moisture levels and
//             determine when the plant needs watering, preventing over or
//             under-watering.
//             <br />
//             7. Gloves: Optional but useful for protecting your hands, especially
//             if you have sensitive skin or if the plant has thorns or rough
//             foliage.
//             <br />
//             By having these tools prepared and easily accessible, you can ensure
//             that caring for your Anthurium plant is a smooth and enjoyable
//             experience, promoting its health and vitality."
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Learning3;

import React, { useState, useRef } from "react";
import "./Learning3.css";
import IntroVideo from "./images/Video.mp4";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Sidebar from "./sidebar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import AppBar from "@mui/material/AppBar";
import axios from "axios";

const steps = ["Watch the video", "Understand the tools", "Practice"];

const Learning3 = () => {
  const [setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const [droppedTools, setDroppedTools] = useState({});
  const [currentDroppedTools, setCurrentDroppedTools] = useState({});
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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

  const handleAIClick = () => {
    navigate("/");
  };

  const handleLearningClick = () => {
    navigate("../Learning");
  };

  const handleGamificationClick = () => {
    navigate("../Gamification");
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setCompletedSteps(new Set([...Array(activeStep + 1).keys()]));
    } else {
      setOpenDialog(true);
      // Handle finish action
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompletedSteps(new Set());
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);

    const updatedUserData = {
      userId: 2,
    };

    axios
      .post("http://localhost:5050/api/update-lecture-hours", updatedUserData)
      .then((response) => {
        console.log("Quiz count updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating quiz count:", error);
      });

    navigate("../Learning2");
  };

  React.useEffect(() => {
    if (completedSteps.size === steps.length) {
      setOpenDialog(true);
    }
  }, [completedSteps]);

  const [toolDescriptions, setToolDescriptions] = useState([
    {
      tool: "Watering can",
      description:
        "Used for watering the plant, providing the necessary moisture without causing waterlogging.",
      correct: null,
    },
    {
      tool: "Pruning shears",
      description:
        "Used to trim off dead or yellowing leaves, promote healthy growth, and maintain the plant's appearance.",
      correct: null,
    },
    {
      tool: "Drainage holes",
      description:
        "Ensure the Anthurium is potted in a container with these to prevent water from accumulating at the roots.",
      correct: null,
    },
  ]);

  // Shuffle function to randomize the array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledToolDescriptions = shuffleArray([...toolDescriptions]);

  const handleDragStart = (e, tool) => {
    e.dataTransfer.setData("tool", tool);
  };

  const handleDrop = (e, description) => {
    e.preventDefault();
    const droppedTool = e.dataTransfer.getData("tool");

    if (droppedTool) {
      setCurrentDroppedTools((prevState) => ({
        ...prevState,
        [description]: droppedTool,
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const areAllMatchesCorrect = () => {
    for (const descriptionItem of toolDescriptions) {
      const droppedTool = currentDroppedTools[descriptionItem.description];
      if (!droppedTool || droppedTool !== descriptionItem.tool) {
        return false;
      }
    }
    return true;
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div
            style={{
              width: "70%",
              height: "auto",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <video
              ref={videoRef}
              className="video-player"
              controls
              onClick={togglePlayback}
            >
              <source src={IntroVideo} type="video/mp4" />
            </video>
          </div>
        );
      case 1:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/*<label className={"L3-Note-Title"}>Notes</label>*/}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                height: "50vh",
                border: "1px solid grey",
              }}
            >
              <img
                src={
                  "https://media.istockphoto.com/id/937601742/photo/sprout-watered-from-a-watering-can-on-nature-background.jpg?s=1024x1024&w=is&k=20&c=L2kTeMak9VtjbsOsyD-MvV8kmQm2hgIyXrY0iAiAyeE="
                }
                alt={"image"}
                style={{
                  width: "50%",
                  height: "auto",
                }}
              />
              <div style={{ marginLeft: "10px" }}>
                <h1
                  style={{
                    fontSize: "30px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Introduction
                </h1>
                <label
                  style={{
                    fontSize: "20px",
                    color: "#555",
                    marginBottom: "20px",
                  }}
                >
                  Master the Art of Plant Care
                </label>
                <p
                  style={{ fontSize: "14px", color: "#888", lineHeight: "1.6" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus eget dui ultricies, bibendum eros ut, ultrices enim.
                  Vivamus luctus justo at arcu maximus, eu vehicula lectus
                  tristique.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                height: "50vh",
                border: "1px solid grey",
                marginTop: "20px",
              }}
            >
              <div style={{ marginLeft: "10px" }}>
                <h1
                  style={{
                    fontSize: "30px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Tool Preparation
                </h1>
                <label
                  style={{
                    fontSize: "20px",
                    color: "#555",
                    marginBottom: "20px",
                  }}
                >
                  Master the Art of Plant Care
                </label>
                <p
                  style={{ fontSize: "14px", color: "#888", lineHeight: "1.6" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus eget dui ultricies, bibendum eros ut, ultrices enim.
                  Vivamus luctus justo at arcu maximus, eu vehicula lectus
                  tristique.
                </p>
              </div>
              <img
                src={
                  "https://media.istockphoto.com/id/654151668/photo/vegetable-gardening-header.jpg?s=1024x1024&w=is&k=20&c=iQSAj9QKUKbZPVRGnOWUraBJH-07lSYd4E-XpfIYRbE="
                }
                alt={"image"}
                style={{
                  width: "50%",
                  height: "auto",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                height: "50vh",
                border: "1px solid grey",
                marginTop: "20px",
              }}
            >
              <img
                src={
                  "https://media.istockphoto.com/id/1425803430/photo/packing-up-harvested-grapes.jpg?s=1024x1024&w=is&k=20&c=L30RjXCvVYUrMydRcy3HdZMacJ-5AbjDC3R-yNUy0GI="
                }
                alt={"image"}
                style={{
                  width: "50%",
                  height: "auto",
                }}
              />
              <div style={{ marginLeft: "10px" }}>
                <h1
                  style={{
                    fontSize: "30px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Soil management
                </h1>
                <label
                  style={{
                    fontSize: "20px",
                    color: "#555",
                    marginBottom: "20px",
                  }}
                >
                  Master the Art of Plant Care
                </label>
                <p
                  style={{ fontSize: "14px", color: "#888", lineHeight: "1.6" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus eget dui ultricies, bibendum eros ut, ultrices enim.
                  Vivamus luctus justo at arcu maximus, eu vehicula lectus
                  tristique.
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                marginTop: "20px",
              }}
            >
              {shuffledToolDescriptions.map((item) => (
                <div
                  key={item.tool}
                  id={item.tool}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.tool)}
                  style={{
                    fontSize: "18px",
                    margin: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  data-tool={item.tool}
                >
                  {item.tool}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                marginTop: "20px",
              }}
            >
              {toolDescriptions.map((descriptionItem) => (
                <div
                  key={descriptionItem.description}
                  onDrop={(e) => handleDrop(e, descriptionItem.description)}
                  onDragOver={handleDragOver}
                  style={{
                    fontSize: "18px",
                    margin: "10px",
                    padding: "20px",
                    border: "1px dashed #ccc",
                    borderRadius: "4px",
                    minHeight: "150px",
                    backgroundColor: currentDroppedTools[
                      descriptionItem.description
                    ]
                      ? currentDroppedTools[descriptionItem.description] ===
                        descriptionItem.tool
                        ? "#8BC34A"
                        : "#EF5350"
                      : "#FFFFFF",
                  }}
                >
                  <p>{descriptionItem.description}</p>
                  {currentDroppedTools[descriptionItem.description] && (
                    <p>{currentDroppedTools[descriptionItem.description]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className={"L3-Content"}>
        <Box sx={{ width: "100%", mt: 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed</Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={activeStep === 2 && !areAllMatchesCorrect()}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          )}
        </Box>

        <div className={"L3-Title"}>{steps[activeStep]}</div>

        {renderContent()}

        <div className="line"></div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have completed all steps. Well done!
          </DialogContentText>
          <DialogContentText>Learning Hours + 1</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Learning3;
