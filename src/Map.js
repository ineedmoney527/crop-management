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
import { Tab, Tabs } from "@mui/material";

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
  const [currentSection, setCurrentSection] = useState(0); // State to track curre
  const [mapLayers, setMapLayers] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [showLandInfo, setShowLandInfo] = useState(false);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showPlanting, setShowPlanting] = useState(false);
  const [id, setID] = useState("");
  const [latlngs, setlatlngs] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const user_id = 1;
  //tab containers
  const [popUpTab, setPopUpTab] = useState("land"); // State to track active tab

  const [activeTab, setActiveTab] = useState("Soil"); // State to track active tab

  const fetchLands = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/map/${user_id}`
      );
      const updatedData = await Promise.all(
        response.data.map(async (land) => {
          const cropName = await getCropName(land.crop_id);
          return { ...land, cropName: cropName ? cropName : " " };
        })
      );
      console.log(updatedData);
      setMapLayers(updatedData);
    } catch (error) {
      console.error("Error fetching lands:", error);
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
  const getCropName = async (ID) => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/map/crop/" + ID
      );
      return response.data.name; // Return the crop name
    } catch (e) {
      console.log(e);
      return null; // Return null in case of an error
    }
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
    Object.values(_layers).forEach(({ _leaflet_id }) => {
      console.log(_leaflet_id);
      // Find the land in the mapLayers state that matches the deleted _leaflet_id
      const deletedLand = mapLayers.find((land) => land.id === _leaflet_id);
      if (deletedLand) {
        setMapLayers((layers) => layers.filter((l) => l.id !== deletedLand.id));
      }
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

  const handlePopUpTabClick = (tab) => {
    setPopUpTab(tab);
  };

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
                    setActiveTab("");
                    setSelectedLand((prev) => land);
                    console.log(land);
                  },
                }}
              >
                <Popup className="custom-popup">
                  <div className="popup-content">
                    <div className="popup-header">
                      <Typography>Land ID: {selectedLand?.id}</Typography>
                    </div>
                    <div className="popup-body">
                      <div className="popup-tabs">
                        <Tabs
                          value={popUpTab}
                          onChange={(event, newValue) =>
                            handlePopUpTabClick(newValue)
                          }
                          variant="fullWidth"
                          indicatorColor="primary"
                          textColor="primary"
                        >
                          <Tab label="Land Details" value="land" />
                          <Tab label="Soil Properties" value="soil" />
                          <Tab label="Tillage Practices" value="tillage" />
                        </Tabs>
                      </div>
                      <div className="popup-tab-content">
                        {popUpTab === "land" && (
                          <div className="section">
                            <Table bordered hover>
                              <tbody>
                                <tr>
                                  <td>Address:</td>
                                  <td>{selectedLand?.address || ""}</td>
                                </tr>
                                <tr>
                                  <td>Coordinate:</td>
                                  <td>
                                    {calculateCenter(JSON.parse(land.latlngs))
                                      .toString()
                                      .match(/LatLng\(([^)]+)\)/)[1] || ""}
                                  </td>
                                </tr>

                                <tr>
                                  <td>Crop:</td>
                                  <td>
                                    {selectedLand
                                      ? selectedLand.cropName || ""
                                      : ""}
                                  </td>
                                </tr>

                                <button onClick={() => handleAddCrop(land.id)}>
                                  Add Crop
                                </button>
                              </tbody>
                            </Table>
                          </div>
                        )}
                        {popUpTab === "soil" && (
                          <div className="section">
                            <Table bordered hover>
                              <tbody>
                                <tr>
                                  <td>Soil Texture:</td>
                                  <td>{selectedLand?.soil_texture || ""}</td>
                                </tr>
                                <tr>
                                  <td>Nitrogen:</td>
                                  <td>{selectedLand?.nitrogen || ""}</td>
                                </tr>
                                <tr>
                                  <td>Phosphorus:</td>
                                  <td>{selectedLand?.phosphorus || ""}</td>
                                </tr>
                                <tr>
                                  <td>Potassium:</td>
                                  <td>{selectedLand?.potassium || ""}</td>
                                </tr>
                                <tr>
                                  <td>pH:</td>
                                  <td>{selectedLand?.ph || ""}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        )}
                        {popUpTab === "tillage" && (
                          <div className="section">
                            <Table bordered hover>
                              <tbody>
                                <tr>
                                  <td>Tillage Depth:</td>
                                  <td>{selectedLand?.tilage_depth || ""}</td>
                                </tr>
                                <tr>
                                  <td>Tillage Practice:</td>
                                  <td>{selectedLand?.tilage_practice || ""}</td>
                                </tr>
                                <tr>
                                  <td>Tillage Timing:</td>
                                  <td>{selectedLand?.tilage_timing || ""}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="popup-footer">
                      {/* Add footer content or buttons if needed */}
                    </div>
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
              crops: null,
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
            setSelectedCrop(newCrop.name);
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
          cropName={selectedCrop}
          open={showPlanting}
          onCropSubmit={async (info) => {
            console.log(info);
            await axios
              .post(
                `http://localhost:5050/api/map/crop/${selectedLand.id}`,
                info
              )
              .then((response) => {
                fetchLands();
                console.log("Data inserted successfully:", response.data);
                // Perform any necessary actions after successful insertion
              })
              .catch((error) => {
                console.error("Error sending shape data:", error);
              });
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
          {activeTab === "crops" && (
            <PlantingConainer
              landId={selectedLand && selectedLand.id}
              crop={selectedLand && selectedLand.crop_id}
            ></PlantingConainer>
          )}
          {activeTab === "fertilization" && (
            <FertilizationPage></FertilizationPage>
          )}
          {activeTab === "pest management" && (
            <div>Weather content goes here...</div>
          )}
          {activeTab === "irrigation" && <Irrigation></Irrigation>}
          {activeTab === "tasks" && (
            <TodoList landId={selectedLand && selectedLand.id}></TodoList>
          )}
        </div>
      </div>
    </div>
  );
}
export default Map;
