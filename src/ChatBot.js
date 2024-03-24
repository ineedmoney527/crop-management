// ChatComponent.js

import React, { useState, useEffect } from "react";
import "./ChatBot.css";
import { useNavigate } from "react-router-dom";

const ChatComponent = () => {
  const navigate = useNavigate();

  const handleOption1Click = () => {
    navigate("ChatBotAnswer");
  };

  const handleLearningClick = () => {
    navigate("Learning");
  };

  const handleSendCLick = () => {
    const inputElement = document.querySelector(".input-container input");
    const inputValue = inputElement.value.trim(); // Trim to remove leading/trailing whitespace

    if (inputValue !== "") {
      navigate("ChatBotAnswer");
    } else {
      alert("Please enter your question");
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close the dropdown if the user clicks outside of it
  const handleOutsideClick = (e) => {
    if (!e.target.matches(".dropbtn")) {
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

  return (
    <div className="chat-container">
      <div className={"chat_sidebar"}>
        <div className={"chat-sidebar-box"}>
          <button className={"sidebar-button"}>AI Tools</button>
          <button className={"sidebar-button"} onClick={handleLearningClick}>
            Learning
          </button>
        </div>
      </div>

      <div className="chat-messages">
        <div className="message received">
          <button className="dropbtn" onClick={toggleDropdown}>
            ChatBot 1.0 <i className="fa fa-caret-down"></i>
          </button>
          <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
            <a href="./SmartDoctor"> Smart Doctor 1.0</a>
          </div>
        </div>
        <div className="message sent">
          <p>Hi! How can I help you?</p>
        </div>
        <label className={"message-sent-label"}>Popular Questions</label>
        <div className={"suggestion-column"}>
          <div className={"suggestion1"}>
            <button
              className={"suggestion-button"}
              onClick={handleOption1Click}
            >
              option 1
            </button>
            <button
              className={"suggestion-button"}
              onClick={handleOption1Click}
            >
              option 2
            </button>
          </div>
          <div className={"suggestion2"}>
            <button
              className={"suggestion-button"}
              onClick={handleOption1Click}
            >
              option 3
            </button>
            <button
              className={"suggestion-button"}
              onClick={handleOption1Click}
            >
              option 4
            </button>
          </div>
        </div>

        <div className="input-container">
          <input type="text" placeholder="Message ChatBot..." />
          <button onClick={handleSendCLick}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
