import { Stack } from "@mui/material";
import "./Info.css";
import icon_info from "../images/Info.png";
import icon_water from "../images/Wet.png";
import icon_sun from "../images/Sun.png";
import icon_next from "../images/Chevron Right.png";
import { useEffect, useState } from "react";

const Info = ({ name, setSelectedDetails }) => {
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/encyclopedia/info/${name}`)
      .then((response) => response.json())
      .then((data) => setCrop(data));
  }, []);

  if (!crop) {
    return <div>Loading...</div>;
  }

  // Split attributes into two halves
  const leftAttributes = {};
  const rightAttributes = {};
  const attributes = crop.attributes;
  const attributeKeys = Object.keys(attributes);
  const halfIndex = Math.ceil(attributeKeys.length / 2);
  attributeKeys.forEach((key, index) => {
    if (index < halfIndex) {
      leftAttributes[key] = attributes[key];
    } else {
      rightAttributes[key] = attributes[key];
    }
  });

  return (
    <Stack className="main-content">
      <div className="details-middle">
        <img className="crop-image" src={crop.image} alt="pothos"></img>
        <Stack className="details-content">
          <div className="crop-name">{crop.name}</div>
          <div className="scientific-name">{crop.scientificName}</div>
          <div className="other-names">Also known as: {crop.otherNames}</div>
          <div className="description">{crop.description}</div>
          <div className="details-care-container">
            <button
              className="details-care-button"
              onClick={() => setSelectedDetails("care")}
            >
              <div className="button-components">
                <img src={icon_water} alt="Icon Care" />
                <Stack className="details-care-button-text">
                  <div className="button-text1">Water</div>
                  <div className="button-text2">Every Week</div>
                </Stack>
                <img src={icon_next} alt=">" />
              </div>
            </button>
            <button
              className="details-care-button"
              onClick={() => setSelectedDetails("care")}
            >
              <div className="button-components">
                <img src={icon_sun} alt="Icon Care" />
                <Stack className="details-care-button-text">
                  <div className="button-text1">Sunlight</div>
                  <div className="button-text2">Full Shade</div>
                </Stack>
                <img src={icon_next} alt=">" />
              </div>
            </button>
          </div>
        </Stack>
      </div>
      <Stack className="details-attributes-container">
        <div className="attributes-title">
          <img src={icon_info} alt="Icon" />
          <div className="attributes-title-text">Attributes of {name}</div>
        </div>
        <div className="attributes-container">
          <Stack className="details-attributes">
            {Object.entries(leftAttributes).map(([name, value]) => (
              <div key={name} className="attribute">
                <div className="attribute-name">{name}</div>
                <div className="attribute-value">{value}</div>
              </div>
            ))}
          </Stack>
          <Stack className="details-attributes">
            {Object.entries(rightAttributes).map(([name, value]) => (
              <div key={name} className="attribute">
                <div className="attribute-name">{name}</div>
                <div className="attribute-value">{value}</div>
              </div>
            ))}
          </Stack>
        </div>
      </Stack>
    </Stack>
  );
};
export default Info;
