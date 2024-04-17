import React, { useState, useEffect } from "react";
import "./Faq.css";
import { Stack } from "@mui/material";
import icon_faq from "../images/Question Mark.png";
const Faq = ({ name }) => {
  const [expanded, setExpanded] = useState({});
  const handleToggle = (questionId) => {
    setExpanded({ ...expanded, [questionId]: !expanded[questionId] });
  };
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:8000/api/encyclopedia/faq/${name}`)
        .then((response) => response.json())
        .then((data) => setFaqs(data));
    } catch (e) {
      console.error("Error:", e);
    }
  }, []);

  return (
    <Stack className="faq-container">
      <div className="page-title">
        <img src={icon_faq} alt="Icon" />
        <div className="page-title-text">
          Frequently asked questions for {name}
        </div>
      </div>
      {faqs.map((faq) => (
        <div
          key={faq.id}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <button
            onClick={() => handleToggle(faq.id)}
            className={`faq-question ${expanded[faq.id] ? "active" : ""}`}
          >
            {faq.question}
            <span className={`indicator ${expanded[faq.id] ? "active" : ""}`}>
              +
            </span>
          </button>
          <div className={`faq-answer ${expanded[faq.id] ? "visible" : ""}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </Stack>
  );
};

export default Faq;
