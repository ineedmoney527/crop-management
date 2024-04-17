import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Soil from "./Soil";
import Planting from "./Planting";
import PlantingConainer from "./PlantingContainer";
import SoilContainer from "./SoilContainer";
import FertilizationPage from "./Fertilization";
import Irrigation from "./Irrigation";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  useMapEvents,
  Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./Map.css";
import Information from "./information";

import { LinearProgress, Typography, Box } from "@mui/material";
import Crop from "./AddCrop";
import { set } from "react-hook-form";
import PlantingInfo from "./PlantingContainer";
import TodoList from "./TodoList";

const icons = {
  defaultIcon: new L.Icon({
    iconUrl: require("./images/blueberry.png"),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
};
const calculateCenter = (latlngs) => {
  const bounds = L.latLngBounds(latlngs);
  return bounds.getCenter();
};

function Map() {
  const [selectedIcon, setSelectedIcon] = useState(icons.defaultIcon);
  const [mapLayers, setMapLayers] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [showLandInfo, setShowLandInfo] = useState(false);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showPlanting, setShowPlanting] = useState(false);
  const [id, setID] = useState("");
  const [latlngs, setlatlngs] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const user_id = 1;
  //tab containers
  const [activeTab, setActiveTab] = useState("tasks"); // State to track active tab

  const fetchLands = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/map/${user_id}`
      );
      setMapLayers((prev) => response.data);
      const hehe = response.data[0].latlngs;
      const huhu = JSON.parse(hehe);
      console.log(calculateCenter(huhu));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  useEffect(() => {
    fetchLands();
  }, [showLandInfo]);
  const handleIconChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedIcon(icons[selectedValue]);
  };

  const handleAddCrop = () => {
    setShowAddCrop(true);
  };

  const _onCreate = (e) => {
    console.log("haha");
    const { layerType, layer } = e;
    if (
      layerType === "polygon" ||
      layerType === "rectangle" ||
      layerType === "circle"
    ) {
      const { _leaflet_id } = layer;
      setID(_leaflet_id);
      setlatlngs(layer.getLatLngs()[0]);
      setShowLandInfo(true);
      fetchLands();
    }
  };
  const _onDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };
  const _onEdited = (e) => {
    setSelectedLand(null);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id, _latlngs }) => {
      setMapLayers((layers) =>
        layers.map((land) =>
          land.id === _leaflet_id
            ? {
                ...land,
                latlngs: _latlngs[0],
                markerPosition: calculateCenter(_latlngs),
              }
            : land
        )
      );
    });
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  //for tab contaienr

  return (
    <div className="App">
      <div className="icon-selector">
        <label htmlFor="iconSelect">Select Icon:</label>
        <select id="iconSelect" onChange={handleIconChange}>
          <option value="defaultIcon">Default Icon</option>
        </select>
      </div>
      <MapContainer
        className="map"
        center={[2.019858963264568, 103.22156929584389]}
        zoom={13}
        style={{ flex: 1 }}
      >
        <TileLayer url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=Vi4BJZ5pcrCqK16xREtW" />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            onDeleted={_onDeleted}
            onEdited={_onEdited}
            draw={{
              circle: false,
              circlemarker: false,
              rectangle: true,
              polyline: true,
              polygon: true,
            }}
          />
        </FeatureGroup>
        <MarkerClusterGroup>
          {mapLayers.map((land) => (
            <Polygon
              positions={JSON.parse(land.latlngs)}
              pathOptions={
                land?.id !== selectedLand?.id
                  ? {
                      color: "#87cefa",
                      fillColor: "#87cefa",
                      opacity: 0.5,
                    }
                  : { color: "red", fillColor: "red", fillOpacity: 0.5 }
              }
            >
              <Marker
                key={land && land.id}
                position={calculateCenter(JSON.parse(land.latlngs))}
                icon={selectedIcon}
                eventHandlers={{
                  click: (e) => {
                    console.log("marker clicked", e);
                    setSelectedLand((prev) => land);
                    console.log(selectedLand);

                    // e.layer.setStyle({ color: "red" });
                  },
                }}
              >
                <Popup class="pop">
                  <div className="popup-content">
                    <h3>Land ID: {selectedLand?.id}</h3>
                    <div className="popup-details">
                      <div className="popup-row">
                        <span className="popup-label">Address:</span>
                        <span>{selectedLand?.address || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Crop Name:</span>
                        <span>{selectedLand?.crop_id || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Soil Texture:</span>
                        <span>{selectedLand?.soil_texture || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Nitrogen:</span>
                        <span>{selectedLand?.nitrogen || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Phosphorus:</span>
                        <span>{selectedLand?.phosphorus || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Potassium:</span>
                        <span>{selectedLand?.potassium || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">pH:</span>
                        <span>{selectedLand?.ph || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Tillage Depth:</span>
                        <span>{selectedLand?.tilage_depth || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Tillage Practice:</span>
                        <span>{selectedLand?.tilage_practice || ""}</span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Tillage Timing:</span>
                        <span>{selectedLand?.tilage_timing || ""}</span>
                      </div>
                    </div>
                    <button onClick={() => handleAddCrop(land.id)}>
                      Add Crop
                    </button>
                  </div>
                </Popup>
              </Marker>
            </Polygon>
          ))}
        </MarkerClusterGroup>
        {/* {selectedLand && (
          <Polygon
            positions={selectedLand.latlngs}
            pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.5 }}
          />
        )} */}

        {/* <MapEvents /> */}
      </MapContainer>

      <div id="soilPortal">
        <Soil
          open={showLandInfo}
          onSoilInfoSubmit={async (soilType) => {
            const newLand = {
              user_id: user_id,
              latlngs: latlngs, // You can add the actual latlngs data here
              soilType: soilType,
              crops: "",
              // markerPosition: calculateCenter(latlngs),
            };
            console.log(newLand);
            await axios
              .post("http://localhost:5050/api/map", newLand)
              .then((response) => {
                console.log("Shape data sent successfully:", response.data);
                fetchLands();
                // Perform any necessary actions after successful insertion
              })
              .catch((error) => {
                console.error("Error sending shape data:", error);
              });

            // setMapLayers((prevLayers) => [...prevLayers, newLand]);
          }}
          onClose={() => setShowLandInfo(false)}
        />
      </div>
      <div id="cropPortal">
        <Crop
          id={selectedLand && selectedLand.id}
          user_id={user_id}
          open={showAddCrop}
          onCropSubmit={async (newCrop) => {
            console.log(newCrop.id);
            await axios
              .put(
                `http://localhost:5050/api/map/crop/${newCrop.id}/${selectedLand.id}`
              )
              .then((response) => {
                console.log("CROP data updated successfully:", response.data);

                // Perform any necessary actions after successful insertion
              })
              .catch((error) => {
                console.error("Error sending shape data:", error);
              });
          }}
          onClose={() => {
            setShowAddCrop(false);
            setShowPlanting(true);
          }}
        />
      </div>
      <div id="plantingPortal">
        <Planting
          open={showPlanting}
          onCropSubmit={() => {
            console.log("haha");
            alert("Crop added successfully!");
            setShowPlanting(false);

            // setSelectedLand(newLand);
          }}
          onClose={() => setShowPlanting(false)}
        />
      </div>
      <div className="tabs-container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "soil" && "active"}`}
            onClick={() => handleTabClick("soil")}
          >
            Soil
          </div>
          <div
            className={`tab ${activeTab === "crops" && "active"}`}
            onClick={() => handleTabClick("crops")}
          >
            Crops
          </div>

          <div
            className={`tab ${activeTab === "fertilization" && "active"}`}
            onClick={() => handleTabClick("fertilization")}
          >
            Fertilization
          </div>
          {/* <div
            className={`tab ${activeTab === "pestManagement" && "active"}`}
            onClick={() => handleTabClick("pestManagement")}
          >
            Pest Mangement
          </div> */}
          <div
            className={`tab ${activeTab === "irrigation" && "active"}`}
            onClick={() => handleTabClick("irrigation")}
          >
            Irrigation
          </div>
          <div
            className={`tab ${activeTab === "tasks" && "active"}`}
            onClick={() => handleTabClick("tasks")}
          >
            Tasks
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="tab-content">
          {activeTab === "soil" && selectedLand && (
            <SoilContainer></SoilContainer>
          )}
          {activeTab === "crops" && <PlantingConainer></PlantingConainer>}
          {activeTab === "fertilization" && (
            <FertilizationPage></FertilizationPage>
          )}
          {activeTab === "pest management" && (
            <div>Weather content goes here...</div>
          )}
          {activeTab === "irrigation" && <Irrigation></Irrigation>}
          {activeTab === "tasks" && <TodoList></TodoList>}
        </div>
      </div>
    </div>
  );
}
export default Map;
