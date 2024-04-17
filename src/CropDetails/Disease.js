import { Stack } from "@mui/material";
import "./Disease.css";
import icon_disease from "../images/Potted Plant.png";
import { useEffect, useState } from "react";

// const diseases = [
//   {
//     name: "Root Rot",
//     description:
//       "Root rot is caused by overwatering or poorly draining soil, leading to fungal infections of the roots. Symptoms include wilting, yellowing leaves, and a foul odor from the soil.",
//     prevention:
//       "Ensure proper drainage in the pot, and water the plant only when the top inch of soil feels dry.",
//     img: img7,
//   },
//   {
//     name: "Leaf Spot",
//     description:
//       "Leaf spot diseases are caused by various fungi and bacteria. Symptoms include dark spots or lesions on the leaves, which may be surrounded by yellowing or browning.",
//     prevention:
//       "Avoid overhead watering, as moisture on the leaves can promote fungal growth. Keep the foliage dry and ensure good air circulation around the plant.",
//     img: img8,
//   },
// ];

const Disease = ({ name }) => {
  const [diseases, setDiseases] = useState([]);
  useEffect(() => {
    try {
      fetch(`http://localhost:8000/api/encyclopedia/diseases/${name}`)
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
        <div className="page-title-text">Common Diseases affecting {name}</div>
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
              <div className="content-title">Prevention</div>
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
