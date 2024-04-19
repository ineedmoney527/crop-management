import React, { useState, useRef } from "react";
import "./ChatBot.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [convHistory, setConvHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatbotConversation = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5050/api/chatbot`, {
        userQuestion: userInput,
        convHistory: convHistory,
      });

      // Assuming response.data contains the messages
      const messages = {
        type: "ai",
        text: response.data.messages,
      };
      setConvHistory((prevHistory) => [
        ...prevHistory,
        { type: "human", text: userInput },
      ]);
      // Assuming messages is an array of messages
      setConvHistory((prevHistory) => [
        ...prevHistory,
        { type: "ai", text: response.data.messages },
      ]);
      console.log(convHistory);
      // Clear user input
      setUserInput("");

      // Scroll to bottom of conversation
      chatbotConversation.current.scrollTop =
        chatbotConversation.current.scrollHeight;
    } catch (error) {
      console.error("Error asking questions:", error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "Smart Doctor") {
      navigate("/SmartDoctor"); // Navigate to Smart Doctor page
    }
  };

  return (
    <main>
      <section className="chatbot-container">
        <div className="chatbot-header">
          {/*<img src="images/plant.png" alt={"Logo"} className="logo"/>*/}

          <select
            className="select-page"
            style={{ fontSize: "24px", width: "200px" }}
            onChange={handleSelectChange}
          >
            <option value="ChatBot">ChatBot</option>
            <option value="Smart Doctor">Smart Doctor</option>
          </select>
        </div>
        <div
          className="chatbot-conversation-container"
          ref={chatbotConversation}
        >
          {convHistory.map((message, index) => (
            <div key={index} className={`speech speech-${message.type}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form
          id="form"
          className="chatbot-input-container"
          onSubmit={handleSubmit}
        >
          <input
            name="user-input"
            type="text"
            id="user-input"
            className="chatbox-input"
            placeholder={"Message ChatBot..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            Send
            {/* <img src="images/send.svg" alt="Send" className="send-btn-icon" /> */}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Chatbot;
