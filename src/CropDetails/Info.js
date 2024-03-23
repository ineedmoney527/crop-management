import { Stack } from "@mui/material";
import "./Info.css";
import icon_info from "../images/Info.png";
import icon_water from "../images/Wet.png";
import icon_sun from "../images/Sun.png";
import icon_next from "../images/Chevron Right.png";
import carrot from "../images/carrots.png";
import cabbage from "../images/cabbage.png";
import corn from "../images/corn.png";

const GoldenPothosDetails = ({ name, setSelectedDetails }) => {
  const crops = {
    Carrot: {
      scientificName: "Daucus carota",
      otherNames: ["Daucon", "Queen Anne's lace"],
      description:
        "Carrot is a root vegetable that is often claimed to be the perfect health food. It is crunchy, tasty, and highly nutritious. Carrots are a particularly good source of beta carotene, fiber, vitamin K1, potassium, and antioxidants. They also have a number of health benefits. They're a weight-loss-friendly food and have been linked to lower cholesterol levels and improved eye health.",
      attributes: [
        {
          Lifespan: "Biennial",
          "Planting Time": "Spring, Fall",
          Spread: "10 cm",
          "Flower Size": "1 cm",
          "Stem Colour": "Green",
          "Leaf Type": "Compound",
        },
        {
          "Plant Type": "Herb",
          "Plant Height": "30 cm",
          "Leaf Color": "Green",
          "Flower Color": "White",
          Dormancy: "Winter",
          "Growth Rate": "Medium",
        },
      ],
      image_show: carrot,
    },
    Cabbage: {
      scientificName: "Brassica oleracea",
      otherNames: ["Bok Choy", "Cruciferous Vegetable", "Kale"],
      description:
        "Cabbage is a leafy green or purple biennial plant grown as an annual vegetable crop for its dense-leaved heads.",
      attributes: [
        {
          Lifespan: "Annual",
          "Planting Time": "Early spring or late summer",
          Spread: "30-60 cm",
          "Flower Size": "Small",
          "Stem Colour": "Green",
          "Leaf Type": "Broad, flat leaves",
        },
        {
          "Plant Type": "Vegetable",
          "Plant Height": "30-45 cm",
          "Leaf Color": "Green",
          "Flower Color": "Yellow",
          Dormancy: "Non-dormant",
          "Growth Rate": "Fast",
        },
      ],
      image_show: cabbage,
    },
    Corn: {
      scientificName: "Zea mays",
      otherNames: ["Meiz", "Maize", "Mays"],
      description:
        "Corn is a tall annual cereal grass (Zea mays) that is widely grown for its large elongated ears of starchy seeds.",
      attributes: [
        {
          Lifespan: "Annual",
          "Planting Time": "Spring",
          Spread: "45-60 cm",
          "Flower Size": "Medium to large",
          "Stem Colour": "Green",
          "Leaf Type": "Narrow, blade-like leaves",
        },
        {
          "Plant Type": "Vegetable",
          "Plant Height": "150-250 cm",
          "Leaf Color": "Green",
          "Flower Color": "Yellow",
          Dormancy: "Non-dormant",
          "Growth Rate": "Fast",
        },
      ],
      image_show: corn,
    },
  };

  const crop = crops[name];

  return (
    <Stack className="main-content">
      <div className="details-middle">
        <img className="crop-image" src={crop.image_show} alt="pothos"></img>
        <Stack className="details-content">
          <div className="crop-name">{name}</div>
          <div className="scientific-name">{crop.scientificName}</div>
          <div className="other-names">
            Also known as: {crop.otherNames.join(", ")}
          </div>
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
            {Object.entries(crop.attributes[0]).map(([key, value]) => (
              <div key={key} className="attribute">
                <div className="attribute-name">{key}</div>
                <div className="attribute-value">{value}</div>
              </div>
            ))}
          </Stack>
          <Stack className="details-attributes">
            {Object.entries(crop.attributes[1]).map(([key, value]) => (
              <div key={key} className="attribute">
                <div className="attribute-name">{key}</div>
                <div className="attribute-value">{value}</div>
              </div>
            ))}
          </Stack>
        </div>
      </Stack>
    </Stack>
  );
};
export default GoldenPothosDetails;
