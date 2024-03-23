import { Stack } from "@mui/material";
import "./Pest.css";
import icon_insect from "../images/Insect.png";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import img5 from "../images/img5.png";
import img6 from "../images/img6.png";

const GoldenPothosInsect = ({ name }) => {
  return (
    <Stack className="main-content">
      <div className="page-title">
        <img src={icon_insect} alt="Icon" />
        <div className="page-title-text">Common Pests affecting {name}</div>
      </div>
      <Stack className="contents">
        <div className="insect-content">
          <div className="content-images">
            <img
              className="main-img-l"
              src={img1}
              alt="Insect"
              style={{ marginRight: "5px" }}
            />
            <Stack className="stack-images" spacing={0.5}>
              <img className="small-img" src={img2} alt="Insect" />
              <img className="small-img" src={img3} alt="Insect" />
            </Stack>
          </div>
          <Stack className="content-text">
            <div className="content-title">Mealybugs</div>
            <div className="content-description">
              Mealybugs are small, soft-bodied insects that are covered with a
              white, waxy substance. They are commonly found on the undersides
              of leaves, along the veins, and in leaf axils. Mealybugs feed by
              sucking sap from plants, which can cause yellowing, wilting, and
              stunted growth. They also excrete a sticky substance called
              honeydew, which can attract ants and promote the growth of sooty
              mold.
            </div>
          </Stack>
        </div>
        <div className="insect-content2">
          <Stack className="content-text">
            <div className="content-title">Fungus Gnats / Fruit Fly</div>
            <div className="content-description">
              Fungus gnats are the party crashers of the soil, with fruit flies
              as their wingmen. Spot these pests by the tiny, dark flies
              loitering around the plant or soil. Cut off their water supply by
              letting the soil dry out, trap them with yellow sticky cards, or
              unleash beneficial nematodes like microscopic bouncers. Keep your
              watering can in check to avoid overwatering and gnat gatecrashers.
            </div>
          </Stack>
          <div className="content-images">
            <Stack
              className="stack-images"
              spacing={1}
              style={{ marginRight: "5px" }}
            >
              <img className="small-img" src={img4} alt="Insect" />
              <img className="small-img" src={img5} alt="Insect" />
            </Stack>
            <img className="main-img-r" src={img6} alt="Insect" />
          </div>
        </div>
        <div className="insect-content">
          <div className="content-images">
            <img
              className="main-img-l"
              src={img1}
              alt="Insect"
              style={{ marginRight: "5px" }}
            />
            <Stack className="stack-images" spacing={0.5}>
              <img className="small-img" src={img2} alt="Insect" />
              <img className="small-img" src={img3} alt="Insect" />
            </Stack>
          </div>
          <Stack className="content-text">
            <div className="content-title">Mealybugs</div>
            <div className="content-description">
              Mealybugs are small, soft-bodied insects that are covered with a
              white, waxy substance. They are commonly found on the undersides
              of leaves, along the veins, and in leaf axils. Mealybugs feed by
              sucking sap from plants, which can cause yellowing, wilting, and
              stunted growth. They also excrete a sticky substance called
              honeydew, which can attract ants and promote the growth of sooty
              mold.
            </div>
          </Stack>
        </div>
      </Stack>
    </Stack>
    //     </div>
    //   </Stack>
    // </div>
  );
};
export default GoldenPothosInsect;
