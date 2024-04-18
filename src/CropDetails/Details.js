import DetailsSideBar from "./DetailsSideBar";
import { useState } from "react";
import { Stack } from "@mui/material";
import Info from "./Info";
import Pest from "./Pest";
import Disease from "./Disease";
import Cares from "./Cares";
import Faq from "./Faq";
// import icon_back from "../images/Go Back.png";
import "./Details.css";
import { useParams } from "react-router-dom";
const Detail = () => {
    const { name } = useParams();
  const [selectedDetail, setSelectedDetail] = useState("info");
  return (
    <div>
      <Stack className="container">
        {/*<button className="back-button" onClick={() => window.history.back()}>*/}
        {/*  <img src={icon_back} alt="<" />*/}
        {/*</button>*/}
        <div className="sub-container">
          <DetailsSideBar
            selectedDetail={selectedDetail}
            setSelectedDetail={setSelectedDetail}
          />
          {selectedDetail === "info" && (
            <Info name={name} setSelectedDetails={setSelectedDetail} />
          )}
          {selectedDetail === "care" && <Cares name={name} />}
          {selectedDetail === "faq" && <Faq name={name} />}
          {selectedDetail === "insect" && <Pest name={name} />}
          {selectedDetail === "disease" && <Disease name={name} />}
        </div>
      </Stack>
    </div>
  );
};
export default Detail;
