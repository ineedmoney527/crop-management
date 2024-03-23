import React, { useState, useEffect } from "react";
import "./ChatBotAnswer.css";
import person from "./images/ion_person-circle-sharp.png";
import { useNavigate } from "react-router-dom";

const CBAChatComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.matches(".cba-dropbtn")) {
      setDropdownOpen(false);
    }
  };

  // Attach event listener to detect clicks outside dropdown
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const navigate = useNavigate();
  const handleLearningClick = () => {
    navigate("Learning");
  };

  return (
    <div className="cba-chat-container">
      {/* <div className={"cba-chat_sidebar"}>
                <div className={"chat-sidebar-box"}>
                    <button className={"sidebar-button"}>AI Tools</button>
                    <button className={"sidebar-button"} onClick={handleLearningClick}>Learning</button>
                </div>
            </div> */}

      <div className="cba-chat-messages">
        <div className="cba-message received">
          <button className="cba-dropbtn" onClick={toggleDropdown}>
            ChatBot 1.0 <i className="fa fa-caret-down"></i>
          </button>
          <div
            className={`cba-dropdown-content ${dropdownOpen ? "cba-show" : ""}`}
          >
            <a href="./SmartDoctor"> Smart Doctor 1.0</a>
          </div>
        </div>

        <div className={"cba-user-message"}>
          <div className={"user"}>
            <img src={person} alt={"person"} className={"icon"} />
            <label className={"label"}>you</label>
          </div>
          <div className={"question"}>
            <label>
              What are some essential practices for effective crop management?
            </label>
          </div>
        </div>

        <div className={"chatbot-message"}>
          <div className={"chatbot"}>
            <img src={person} alt={"person"} className={"chatbot-icon"} />
            <label className={"cba-label"}>chatbot</label>
          </div>
          <div className={"cba-answer"}>
            <label>
              Effective crop management involves a combination of various
              practices aimed at optimizing crop growth, yield, and overall
              health. Firstly, proper soil preparation is crucial, including
              practices such as plowing, harrowing, and soil amendment to ensure
              adequate nutrient availability and soil structure. Additionally,
              selecting appropriate crop varieties suited to the local climate
              and soil conditions is essential for maximizing yields and
              minimizing risks associated with pests and diseases. Implementing
              crop rotation and inter cropping strategies can help manage pests
              and diseases while enhancing soil fertility and reducing soil
              erosion. Adequate irrigation management, including efficient water
              usage and drainage systems, is vital for ensuring optimal water
              availability throughout the growing season. Furthermore, timely
              and accurate monitoring of crop health, including pest
              infestations, diseases, and nutrient deficiencies, allows for
              proactive management interventions such as pest control measures
              and nutrient supplementation. Finally, adopting sustainable
              practices such as conservation tillage, integrated pest
              management, and organic farming methods not only promotes
              long-term soil health and biodiversity but also contributes to
              environmental conservation and resilience against climate change
              impacts. In summary, effective crop management requires a holistic
              approach that integrates agronomic practices, technology, and
              sustainable principles to optimize productivity while minimizing
              negative environmental impacts.
            </label>
          </div>
        </div>

        <div className="cba-input-container">
          <input type="text" placeholder="Message ChatBot..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default CBAChatComponent;
