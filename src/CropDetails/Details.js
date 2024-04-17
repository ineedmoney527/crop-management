import DetailsSideBar from "./DetailsSideBar";
import { useState } from "react";
import Info from "./Info";
import Pest from "./Pest";
import Disease from "./Disease";
import Cares from "./Cares";
import Faq from "./Faq";
import icon_back from "../images/Go Back.png";
import "./Details.css";
import { useParams } from "react-router-dom";
const Detail = () => {
  const { name } = useParams();
  const [selectedDetail, setSelectedDetail] = useState("info");
  return (
    <div>
      <div className="container">
        <div className="details-sidebar">
          <button className="back-button" onClick={() => window.history.back()}>
            <img src="/back.svg" alt="<" />
          </button>
          <DetailsSideBar
            selectedDetail={selectedDetail}
            setSelectedDetail={setSelectedDetail}
          />
        </div>
        <div className="sub-container">
          {selectedDetail === "info" && (
            <Info name={name} setSelectedDetails={setSelectedDetail} />
          )}
          {selectedDetail === "care" && <Cares name={name} />}
          {selectedDetail === "faq" && <Faq name={name} />}
          {selectedDetail === "insect" && <Pest name={name} />}
          {selectedDetail === "disease" && <Disease name={name} />}
        </div>
      </div>
    </div>
  );
};
export default Detail;
