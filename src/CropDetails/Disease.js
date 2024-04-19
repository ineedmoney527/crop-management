import { Stack } from "@mui/material";
import "./Disease.css";
import icon_disease from "../images/Potted Plant.png";
import { useEffect, useState } from "react";
// import img7 from "../images/img7.png";
// import img8 from "../images/img8.png";

const Disease = ({ name }) => {
  const [diseases, setDiseases] = useState([]);
  useEffect(() => {
    try {
      fetch(`http://localhost:5050/api/encyclopedia/diseases/${name}`)
        .then((response) => response.json())
        .then((data) => setDiseases(data));
    } catch (e) {
      console.error("Error:", e);
    }
  }, []);
  return (
    <Stack className="main-content">
      <div className="page-title">
        <img src={icon_disease} alt="Icon" />
        <div className="page-title-text">Common Disease affecting {name}</div>
      </div>
      <Stack className="contents">
        {diseases.map((disease, index) => (
          <div className="disease-content" key={index}>
            {index % 2 === 0 && (
              <div className="content-images">
                <img
                  className="main-img1"
                  src={disease.image}
                  alt={disease.name}
                />
              </div>
            )}
            <Stack className="content-text">
              <div className="content-title">{disease.name}</div>
              <div className="content-description">{disease.description}</div>
              <div className="prevention">Prevention</div>
              <div className="content-description">{disease.solution}</div>
            </Stack>
            {index % 2 !== 0 && (
              <div className="content-images">
                <img
                  className="main-img2"
                  src={disease.image}
                  alt={disease.name}
                />
              </div>
            )}
          </div>
        ))}
      </Stack>
    </Stack>
  );
};
export default Disease;
