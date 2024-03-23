import { Stack } from "@mui/material";
import "./Disease.css";
import icon_disease from "../images/Potted Plant.png";
import img7 from "../images/img7.png";
import img8 from "../images/img8.png";

const GoldenPothosDisease = ({ name }) => {
  return (
    <Stack className="main-content">
      <div className="page-title">
        <img src={icon_disease} alt="Icon" />
        <div className="page-title-text">Common Disease affecting {name}</div>
      </div>
      <Stack className="contents">
        <div className="disease-content">
          <img
            className="main-img-l"
            src={img7}
            alt="Disease"
            style={{ marginRight: "5px" }}
          />
          <Stack className="content-text">
            <div className="content-title">Root Rot</div>
            <div className="content-description">
              Root rot is caused by overwatering or poorly draining soil,
              leading to fungal infections of the roots. Symptoms include
              wilting, yellowing leaves, and a foul odor from the soil.
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Prevention
            </div>
            <div className="content-description">
              Ensure proper drainage in the pot, and water the plant only when
              the top inch of soil feels dry.
            </div>
          </Stack>
        </div>
        <div className="disease-content2">
          <Stack className="content-text">
            <div className="content-title">Leaf Spot</div>
            <div className="content-description">
              Leaf spot diseases are caused by various fungi and bacteria.
              Symptoms include dark spots or lesions on the leaves, which may be
              surrounded by yellowing or browning.
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Prevention
            </div>
            <div className="content-description">
              Avoid overhead watering, as moisture on the leaves can promote
              fungal growth. Keep the foliage dry and ensure good air
              circulation around the plant.
            </div>
          </Stack>
          <img className="main-img-r" src={img8} alt="Disease" />
        </div>
        <div className="disease-content">
          <img
            className="main-img-l"
            src={img7}
            alt="Disease"
            style={{ marginRight: "5px" }}
          />
          <Stack className="content-text">
            <div className="content-title">Root Rot</div>
            <div className="content-description">
              Root rot is caused by overwatering or poorly draining soil,
              leading to fungal infections of the roots. Symptoms include
              wilting, yellowing leaves, and a foul odor from the soil.
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Prevention
            </div>
            <div className="content-description">
              Ensure proper drainage in the pot, and water the plant only when
              the top inch of soil feels dry.
            </div>
          </Stack>
        </div>
      </Stack>
    </Stack>
  );
};
export default GoldenPothosDisease;
