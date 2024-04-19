import { Stack } from "@mui/material";
import "./Info.css";
import icon_info from "../images/Info.png";
import icon_water from "../images/Wet.png";
import icon_sun from "../images/Sun.png";
import icon_next from "../images/Chevron Right.png";
// import carrot from "../images/carrots.png";
// import cabbage from "../images/cabbage.png";
// import corn from "../images/corn.png";
import { useEffect, useState } from "react";

const Info = ({ name, setSelectedDetails }) => {
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5050/api/encyclopedia/info/${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCrop(data);
      });
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
  // const crops = {
  //   Carrot: {
  //     scientificName: "Daucus carota",
  //     otherNames: ["Daucon", "Queen Anne's lace"],
  //     description:
  //       "Carrot is a root vegetable that is often claimed to be the perfect health food. It is crunchy, tasty, and highly nutritious. Carrots are a particularly good source of beta carotene, fiber, vitamin K1, potassium, and antioxidants. They also have a number of health benefits. They're a weight-loss-friendly food and have been linked to lower cholesterol levels and improved eye health.",
  //     attributes: [
  //       {
  //         Lifespan: "Biennial",
  //         "Planting Time": "Spring, Fall",
  //         Spread: "10 cm",
  //         "Flower Size": "1 cm",
  //         "Stem Colour": "Green",
  //         "Leaf Type": "Compound",
  //       },
  //       {
  //         "Plant Type": "Herb",
  //         "Plant Height": "30 cm",
  //         "Leaf Color": "Green",
  //         "Flower Color": "White",
  //         Dormancy: "Winter",
  //         "Growth Rate": "Medium",
  //       },
  //     ],
  //     image_show: carrot,
  //   },
  //   Cabbage: {
  //     scientificName: "Brassica oleracea",
  //     otherNames: ["Bok Choy", "Cruciferous Vegetable", "Kale"],
  //     description:
  //       "Cabbage is a leafy green or purple biennial plant grown as an annual vegetable crop for its dense-leaved heads.",
  //     attributes: [
  //       {
  //         Lifespan: "Annual",
  //         "Planting Time": "Early spring or late summer",
  //         Spread: "30-60 cm",
  //         "Flower Size": "Small",
  //         "Stem Colour": "Green",
  //         "Leaf Type": "Broad, flat leaves",
  //       },
  //       {
  //         "Plant Type": "Vegetable",
  //         "Plant Height": "30-45 cm",
  //         "Leaf Color": "Green",
  //         "Flower Color": "Yellow",
  //         Dormancy: "Non-dormant",
  //         "Growth Rate": "Fast",
  //       },
  //     ],
  //     image_show: cabbage,
  //   },
  //   Corn: {
  //     scientificName: "Zea mays",
  //     otherNames: ["Meiz", "Maize", "Mays"],
  //     description:
  //       "Corn is a tall annual cereal grass (Zea mays) that is widely grown for its large elongated ears of starchy seeds.",
  //     attributes: [
  //       {
  //         Lifespan: "Annual",
  //         "Planting Time": "Spring",
  //         Spread: "45-60 cm",
  //         "Flower Size": "Medium to large",
  //         "Stem Colour": "Green",
  //         "Leaf Type": "Narrow, blade-like leaves",
  //       },
  //       {
  //         "Plant Type": "Vegetable",
  //         "Plant Height": "150-250 cm",
  //         "Leaf Color": "Green",
  //         "Flower Color": "Yellow",
  //         Dormancy: "Non-dormant",
  //         "Growth Rate": "Fast",
  //       },
  //     ],
  //     image_show: corn,
  //   },
  // };

  // const crop = crops[name];

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
                <img
                  src={icon_water}
                  alt="Icon Care"
                  style={{
                    color: "white",
                    filter: "brightness(0) invert(1)",
                    width: "30px",
                    height: "30px",
                  }}
                />
                <Stack className="details-care-button-text">
                  {/*<div className="button-text1">Water</div>*/}
                  <div className="button-text2">Every Week</div>
                </Stack>
                <img
                  src={icon_next}
                  alt=">"
                  style={{
                    color: "white",
                    filter: "brightness(0) invert(1)",
                    width: "30px",
                    height: "30px",
                  }}
                />
              </div>
            </button>
            <button
              className="details-care-button"
              onClick={() => setSelectedDetails("care")}
            >
              <div className="button-components">
                <img
                  src={icon_sun}
                  alt="Icon Care"
                  style={{
                    color: "white",
                    filter: "brightness(0) invert(1)",
                    width: "30px",
                    height: "30px",
                  }}
                />
                <Stack className="details-care-button-text">
                  {/*<div className="button-text1">Sunlight</div>*/}
                  <div className="button-text2">Full Shade</div>
                </Stack>
                <img
                  src={icon_next}
                  alt=">"
                  style={{
                    color: "white",
                    filter: "brightness(0) invert(1)",
                    width: "30px",
                    height: "30px",
                  }}
                />
              </div>
            </button>
          </div>
        </Stack>
      </div>
      <Stack className="details-attributes-container">
        <div className="attributes-title">
          <img
            src={icon_info}
            alt="Icon"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
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
