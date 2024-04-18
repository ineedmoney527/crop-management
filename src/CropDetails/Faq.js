import React, { useState,useEffect } from "react";
import "./Faq.css";
import { Stack } from "@mui/material";
import icon_faq from "../images/Question Mark.png";
const Faq = ({ name }) => {
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState({});
  const handleToggle = (questionId) => {
    setExpanded({ ...expanded, [questionId]: !expanded[questionId] });
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/api/encyclopedia/faq/${name}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setFaqs(data)
          });

    } catch (e) {
      console.error("Error:", e);
    }
  }, []);

  // const questions = [
  //   {
  //     id: 1,
  //     question: "What type of soil is best for growing carrots?",
  //     answer:
  //       "Carrots grow best in loose, well-draining soil that is free of rocks and clumps. Sandy loam or loamy soil with good organic matter content is ideal for growing carrots.",
  //   },
  //   {
  //     id: 2,
  //     question: "How deep should I plant carrot seeds?",
  //     answer:
  //       "Carrot seeds should be planted about 1/4 to 1/2 inch deep in the soil. Plant them thinly and cover lightly with soil, then water gently to keep the soil moist.",
  //   },
  //   {
  //     id: 3,
  //     question: "How often should I water my carrot plants?",
  //     answer:
  //       "Carrots need consistent moisture to grow properly. Water them deeply once or twice a week, depending on weather conditions and soil moisture levels.",
  //   },
  //   {
  //     id: 4,
  //     question: "When should I thin my carrot seedlings?",
  //     answer:
  //       "Thin carrot seedlings when they reach about 2 inches tall. Space them 1 to 2 inches apart to allow room for the roots to develop properly.",
  //   },
  //   {
  //     id: 5,
  //     question: "How do I protect my carrot plants from pests?",
  //     answer:
  //       "Carrots are susceptible to pests such as carrot flies and aphids. Use floating row covers to protect young plants, and practice crop rotation to reduce pest populations.",
  //   },
  // ];

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
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <button
            onClick={() => handleToggle(faq.id)}
            className={`faq-question ${expanded[faq.id] ? "active" : ""}`}
          >
            {faq.question}{" "}
            <span
              className={`indicator ${expanded[faq.id] ? "active" : ""}`}
            >
              +
            </span>
          </button>
          <div
            className={`faq-answer ${expanded[faq.id] ? "visible" : ""}`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </Stack>
  );
};

export default Faq;
