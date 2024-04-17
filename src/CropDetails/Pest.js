import { Stack } from "@mui/material";
import "./Pest.css";
import icon_insect from "../images/Insect.png";
import { useEffect, useState } from "react";

const Pest = ({ name }) => {
  const [pests, setPests] = useState([]);
  useEffect(() => {
    try {
      fetch(`http://localhost:8000/api/encyclopedia/pests/${name}`)
        .then((response) => response.json())
        .then((data) => {
          setPests(data);
        });
    } catch (e) {
      console.error("Error:", e);
    }
  }, []);

  return (
    <Stack className="main-content">
      <div className="page-title">
        <img src={icon_insect} alt="Icon" />
        <div className="page-title-text">Common Pests affecting {name}</div>
      </div>
      <Stack className="contents">
        {pests.map((pest, index) => (
          <div className="insect-content" key={index}>
            {index % 2 === 0 && (
              <div className="content-images">
                <img className="main-img1" src={pest.image} alt="Insect" />
              </div>
            )}
            <Stack className="content-text">
              <div className="content-title">{pest.name}</div>
              <div className="content-description">{pest.description}</div>
              <div className="content-title">Prevention</div>
              <div className="content-description">{pest.solution}</div>
            </Stack>
            {index % 2 !== 0 && (
              <div className="content-images">
                <img className="main-img2" src={pest.image} alt="Insect" />
              </div>
            )}
          </div>
        ))}
      </Stack>
    </Stack>
  );
};

export default Pest;
