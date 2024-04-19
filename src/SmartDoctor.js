// import React, { useState, useEffect, useRef } from "react";
// import "./SmartDoctor.css";
// import person from "./images/ion_person-circle-sharp.png";
// import plant from "./images/plant.png";

// const SmartDoctor = () => {
//   const handleLearningClick = () => {};

//   const videoRef = useRef(null);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [photo, setPhoto] = useState(null);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       setMediaStream(stream); // Set the mediaStream state
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const stopCamera = () => {
//     if (mediaStream) {
//       const tracks = mediaStream.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//       setMediaStream(null); // Reset the mediaStream state
//     }
//   };

//   const takePhoto = () => {
//     if (videoRef.current) {
//       const canvas = document.createElement("canvas");
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//       const dataURL = canvas.toDataURL("image/jpeg");
//       setPhoto(dataURL); // Set the captured photo in state
//     }
//   };

//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // Close the dropdown if the user clicks outside of it
//   const handleOutsideClick = (e) => {
//     if (!e.target.matches(".sd-dropbtn")) {
//       setDropdownOpen(false);
//     }
//   };

//   // Attach event listener to detect clicks outside dropdown
//   useEffect(() => {
//     document.addEventListener("click", handleOutsideClick);
//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   }, []);

//   return (
//     <div className="sd-chat-container">
//       {/* <div className={"sd-chat_sidebar"}>
//         <div className={"chat-sidebar-box"}>
//           <button className={"sidebar-button"}>AI Tools</button>
//           <button className={"sidebar-button"} onClick={handleLearningClick}>
//             Learning
//           </button>
//         </div>
//       </div> */}

//       <div className="sd-chat-messages">
//         <div className="sd-message-received">
//           <button className="sd-dropbtn" onClick={toggleDropdown}>
//             Smart Doctor 1.0 <i className="fa fa-caret-down"></i>
//           </button>
//           <div
//             className={`sd-dropdown-content ${dropdownOpen ? "sd-show" : ""}`}
//           >
//             <a href="./Chatbot"> Chat Bot 1.0</a>
//           </div>
//         </div>

//         <div className={"sd-user-message"}>
//           <div className={"sd-user"}>
//             <img src={person} alt={"person"} className={"sd-icon"} />
//             <label className={"sd-label"}>you</label>
//           </div>
//           <div className={"sd-question"}>
//             <label>
//               <img src={plant} alt={"plant"} className={"plant"} />
//             </label>
//           </div>
//         </div>

//         <div className={"sd-message"}>
//           <div className={"smart-doctor"}>
//             <img src={person} alt={"person"} className={"smart-doctor-icon"} />
//             <label className={"sd-label"}>smart doctor</label>
//           </div>

//           <div className={"sdd-answer"}>
//             <label>
//               Anthuriums, popularly known as flamingo flowers or laceleaf, are
//               prized for their striking, glossy foliage and vibrant,
//               heart-shaped blooms. These tropical beauties boast a unique
//               appearance, with glossy, dark green leaves that often have a waxy
//               texture, providing an elegant backdrop to their colorful
//               spathes,which can range from vibrant reds and pinks to softer
//               shades of white and green.
//               <br />
//               Anthuriums are renowned for their long-lasting flowers, making
//               them a favorite among indoor plant enthusiasts.In terms of care,
//               Anthuriums thrive in bright, indirect light, though they can
//               tolerate lower light conditions.They prefer temperatures between
//               65°F to 80°F (18°C to 27°C) and should be shielded from drafts and
//               extreme temperature fluctuations.Proper watering is crucial for
//               Anthuriums, as they require consistently moist soil,
//               <br />
//               but overwatering should be avoided to prevent root rot. With the
//               right conditions,Anthuriums can be rewarding houseplants, adding a
//               touch of tropical elegance to any indoor space.
//             </label>
//           </div>
//         </div>

//         <div className="sd-input-container">
//           <input type="file" accept="image/*" />
//           <button onClick={startCamera}>Camera</button>
//           <button onClick={stopCamera}>Stop Camera</button>
//           <button onClick={takePhoto}>Take Photo</button>
//           <button>Send</button>
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             style={{ width: "100%", maxWidth: "300px" }}
//           ></video>
//           {photo && (
//             <img src={photo} alt="Captured" style={{ maxWidth: "300px" }} />
//           )}
//           {/*<video ref={videoRef} autoPlay muted style={{width: '100%', maxWidth: '300px'}}></video>*/}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SmartDoctor;

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./SmartDoctor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SmartDoctor = () => {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);

  const surpriseOptions = [
    "Does the image have a whale?",
    "Is the image fabulously pink?",
    "Does the image have puppies?",
  ];

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const uploadImage = async (e) => {
    setResponse("");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setImage(e.target.files[0]);
    e.target.value = null;
    try {
      await axios.post("http://localhost:5050/api/vision/upload", formData);
    } catch (e) {
      console.log(e);
    }
  };

  const analyzeImage = async () => {
    setIsLoading(true);
    setResponse("");
    if (!image) {
      setError("Error ! Must have an existing image");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5050/api/vision/analyze",
        {
          message: JSON.stringify(value),
        }
      );
      console.log("Response" + JSON.stringify(response));
      const answer = response.data.message.content;
      setResponse(answer.replace(/\\n/g, "<br>"));
    } catch (e) {
      setError("Error. Please check your network/server");
    }
    setIsLoading(false);
  };

  const clear = () => {
    setImage(null);
    setValue("");
    setResponse("");
    setError("");
  };

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "ChatBot") {
      navigate("/ChatBot"); // Navigate to Smart Doctor page
    }
  };
  useEffect(() => {
    if (isLoading) {
      const rotationInterval = setInterval(() => {
        setRotation((prevRotation) => (prevRotation + 1) % 360);
      }, 1);

      // Clean up the interval when the component unmounts
      return () => clearInterval(rotationInterval);
    }
  }, [isLoading]);
  return (
    <div style={{ backgroundColor: "#fafafc", padding: "30px" }}>
      <select
        className="select-page"
        style={{ fontSize: "24px", width: "200px" }}
        onChange={handleSelectChange}
      >
        <option value="Smart Doctor">Smart Doctor</option>
        <option value="ChatBot">ChatBot</option>
      </select>
      <div className="app">
        <section className="search-section">
          <div className="image-container">
            {image && (
              <img className="image" src={URL.createObjectURL(image)} />
            )}
          </div>
          <p className="extra-info">
            <span>
              <label htmlFor="files" className="upload">
                Upload an image
              </label>
              <input
                onChange={uploadImage}
                id="files"
                accept="image/*"
                type="file"
                hidden
              />
            </span>{" "}
            to ask questions about.
          </p>
          <p>
            What do you want to know about the image?
            <button className="surprise" onClick={surprise} disabled={response}>
              Surprise me
            </button>
          </p>
          <div className="input-container">
            <input
              value={value}
              placeholder="What is in the image..."
              onChange={(e) => setValue(e.target.value)}
            />
            {!response && !error && (
              <div
                className="button-container"
                style={{
                  display: "flex",
                  flex: "1",
                  justifyContent: "center", // Horizontally center the items
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {isLoading ? (
                  <img
                    src="loading.svg"
                    alt="loading"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      width: "30px",
                      height: "30px",
                    }}
                  />
                ) : (
                  <button onClick={analyzeImage}>Ask me</button>
                )}
              </div>
            )}

            {(response || error) && <button onClick={clear}>Clear</button>}
          </div>

          {error && <p>{""}</p>}
          {response && (
            <ReactMarkdown className="answer">{response}</ReactMarkdown>
          )}
        </section>
      </div>
    </div>
  );
};

export default SmartDoctor;
