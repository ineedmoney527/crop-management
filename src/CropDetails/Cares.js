import { Stack } from "@mui/material";
import icon_care from "../images/User Manual.png";
import "./Cares.css"
import { useEffect, useState } from "react";

// const GoldenPothosDisease = ({ name }) => {
  // const cares = {
    // Carrot: {
    //   Caretype: [
    //     {
    //       Name: "Watering",
    //       Description:
    //         "Carrots require consistent watering to keep the soil evenly moist. It's important to water deeply to encourage the roots to grow deep into the soil.",
    //     },
    //     {
    //       Name: "Sunlight",
    //       Description:
    //         "Carrots prefer full sunlight, but they can tolerate partial shade. Ensure they get at least 6 hours of sunlight per day for optimal growth.",
    //     },
    //     {
    //       Name: "Soil",
    //       Description:
    //         "Carrots prefer well-drained, loose soil rich in organic matter. Amend heavy clay soils with compost to improve drainage.",
    //     },
    //     {
    //       Name: "Temperature",
    //       Description:
    //         "Carrots grow best in cooler temperatures, ideally between 60°F and 70°F. High temperatures can cause carrots to become bitter or bolt.",
    //     },
    //     {
    //       Name: "Pest Control",
    //       Description:
    //         "Carrots are susceptible to pests such as carrot rust fly and carrot weevils. Use row covers or insecticidal soap to protect them.",
    //     },
    //   ],
    // },
    // Cabbage: {
    //   Caretype: [
    //     {
    //       Name: "Fertilizing",
    //       Description:
    //         "Cabbages benefit from regular fertilizing to promote healthy growth. Use a balanced fertilizer every 3-4 weeks during the growing season.",
    //     },
    //     {
    //       Name: "Pest Control",
    //       Description:
    //         "Cabbages are susceptible to pests such as cabbage worms and aphids. Inspect plants regularly and use insecticidal soap or neem oil as needed.",
    //     },
    //     {
    //       Name: "Watering",
    //       Description:
    //         "Cabbages need consistent watering, especially during dry periods. Water deeply to encourage strong root development and prevent splitting.",
    //     },
    //     {
    //       Name: "Sunlight",
    //       Description:
    //         "Cabbages thrive in full sun but can tolerate partial shade. Ensure they get at least 6 hours of sunlight daily for optimal growth.",
    //     },
    //     {
    //       Name: "Soil",
    //       Description:
    //         "Cabbages prefer well-drained, fertile soil with a pH between 6.0 and 7.5. Incorporate compost or aged manure into the soil before planting.",
    //     },
    //   ],
    // },
    // Corn: {
    //   Caretype: [
    //     {
    //       Name: "Spacing",
    //       Description:
    //         "Corn plants require adequate spacing for optimal growth and pollination. Plant seeds or seedlings 9-12 inches apart in rows spaced 30-36 inches apart.",
    //     },
    //     {
    //       Name: "Support",
    //       Description:
    //         "Tall corn varieties may need support to prevent them from falling over in strong winds. Use stakes or plant them close together for mutual support.",
    //     },
    //     {
    //       Name: "Fertilizing",
    //       Description:
    //         "Corn plants benefit from regular fertilizing to support their vigorous growth. Apply a balanced fertilizer at planting and again when the plants are knee-high.",
    //     },
    //     {
    //       Name: "Watering",
    //       Description:
    //         "Corn needs consistent moisture, especially during the critical stages of tasseling and silking. Provide 1-1.5 inches of water per week, either through rainfall or irrigation.",
    //     },
    //     {
    //       Name: "Pest Control",
    //       Description:
    //         "Corn is susceptible to pests such as corn earworms and armyworms. Monitor plants regularly and apply insecticides or use biological controls as necessary.",
    //     },
    //   ],
    // },
  // };

    const Cares = ({ name }) => {
        const [cares, setCares] = useState([]);
        useEffect(() => {
            try {
                fetch(`http://localhost:5000/api/encyclopedia/cares/${name}`)
                    .then((response) => response.json())
                    .then((data) => setCares(data));
            } catch (e) {
                console.error("Error:", e);
            }
        }, []);

  // const cropCares = cares[name]?.Caretype;

  return (
    <Stack className="main-content">
      <div className="page-title" style={{fontSize:'50px',color:'red'}}>
        <img src={icon_care} alt="Icon" />
        <div className="page-title-text">Care Guide for {name}</div>
      </div>
      <Stack className="contents">
        {cares &&
          cares.map((care, index) => (
            <div
              key={index}
              className={`page-content${index % 2 === 0 ? "" : "2"}`}
            >
              <Stack className="content-text">
                <div className="content-title">
                  <div>{care.name}</div>
                </div>
                <div className="content-description">{care.description}</div>
              </Stack>
            </div>
          ))}
      </Stack>
    </Stack>
  );
};

export default Cares;
