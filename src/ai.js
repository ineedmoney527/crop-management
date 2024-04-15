import React, { useState } from "react";
import "./index.css"; // Assuming you have the CSS file in the same folder
import axios from "axios"; // Import Axios for API calls

const openAIApiKey = process.env.OPENAI_API_KEY;

function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user message to conversation
    setConversation([...conversation, { type: "user", text: userInput }]);
    setUserInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: userInput,
          max_tokens: 150,
          temperature: 0.7,
          n: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${openAIApiKey}`,
          },
        }
      );

      const aiResponse = response.data.choices[0].text.trim();

      // Add AI response to conversation
      setConversation([...conversation, { type: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <main>
      <section className="chatbot-container">
        <div className="chatbot-header">
          <img src="images/logo-scrimba.svg" alt="Logo" className="logo" />
          <p className="sub-heading">Knowledge Bank</p>
        </div>
        <div
          className="chatbot-conversation-container"
          id="chatbot-conversation-container"
        >
          {conversation.map((message, index) => (
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
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            <img src="images/send.svg" alt="Send" className="send-btn-icon" />
          </button>
        </form>
      </section>
    </main>
  );
}

export default Chatbot;
