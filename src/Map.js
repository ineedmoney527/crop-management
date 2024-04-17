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
  const [mapLayers, setMapLayers] = useState([
    {
      id: "2",
      latlngs: [
        [2.019858963264568, 103.22156929584389],
        [2.029858963264568, 103.23156929584389],
        [2.024858963264568, 103.24156929584389],
      ], // Coordinates for another polygon
      crops: { name: "Crop 4" },
      soilType: {
        texture: "Sandy",
        ph: "7.0",
        nitrogen: "20 ppm",
        potassium: "25 ppm",
        phosphorus: "10 ppm",
        tilage: "Intensive",
        depth: "25 cm",
        time: "Fall",
        name: "Sample Soil 2",
        address: "456 Soil Ave, Earth",
      },
      markerPosition: calculateCenter([
        [2.019858963264568, 103.22156929584389],
        [2.029858963264568, 103.23156929584389],
        [2.024858963264568, 103.24156929584389],
      ]),
    },
  ]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [showLandInfo, setShowLandInfo] = useState(false);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showPlanting, setShowPlanting] = useState(false);
  const [id, setID] = useState("");
  const [latlngs, setlatlngs] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  //tab containers
  const [activeTab, setActiveTab] = useState("tasks"); // State to track active tab

  const handleIconChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedIcon(icons[selectedValue]);
  };

  const handleAddCrop = () => {
    setShowAddCrop(true);
  };
  // const MapEvents = () => {
  //   useMapEvents({
  //     click(e) {
  //       // setState your coords here
  //       // coords exist in "e.latlng.lat" and "e.latlng.lng"
  //       console.log();
  //       console.log(e.latlng.lng);
  //     },
  //   });
  //   return false;
  // };

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
            <Marker
              key={land.id}
              position={land.markerPosition}
              icon={selectedIcon}
              eventHandlers={{
                click: (e) => {
                  console.log("marker clicked", e);
                  setSelectedLand(land);
                  console.log(land.id);
                  console.log(land.latlngs[0]);

                  // e.layer.setStyle({ color: "red" });
                },
              }}
            >
              <Popup class="pop">
                <h3>ID:{selectedLand?.id}</h3>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Plant Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedLand && selectedLand.crops.name}</td>
                    </tr>
                  </tbody>
                </Table>
                <button onClick={() => handleAddCrop(land.id)}>Add Crop</button>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {selectedLand && (
          <Polygon
            positions={selectedLand.latlngs}
            pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.5 }}
          />
        )}
        {/* <MapEvents /> */}
      </MapContainer>

      <div id="soilPortal">
        <Soil
          open={showLandInfo}
          onSoilInfoSubmit={(soilType) => {
            const newLand = {
              id: id, // Generate a random ID；
              latlngs: latlngs, // You can add the actual latlngs data here
              soilType: soilType,
              crops: { name: "" },
              markerPosition: calculateCenter(latlngs),
            };
            setMapLayers((prevLayers) => [...prevLayers, newLand]);
            // setSelectedLand(newLand);
          }}
          onClose={() => setShowLandInfo(false)}
        />
      </div>
      <div id="cropPortal">
        <Crop
          id={selectedLand && selectedLand.id}
          open={showAddCrop}
          onCropSubmit={(newCrop) => {
            setMapLayers((layers) =>
              layers.map((land) =>
                land.id === selectedLand.id
                  ? { ...land, crops: { name: newCrop.name } }
                  : land
              )
            );
            // setSelectedLand(newLand);
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
