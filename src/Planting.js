import React, { useState, useEffect } from "react";
import "./Planting.css";

const Planting = ({ open, onCropSubmit, onClose }) => {
  const [cropName, setCropName] = useState("Tomato");
  const [cultivar, setCultivar] = useState("Cherry Tomato");
  const [plantingMethod, setPlantingMethod] = useState("Broadcasting");
  const [seedTreatment, setSeedTreatment] = useState("Coating");
  const [plantingAmount, setPlantingAmount] = useState(500);
  const [nurseryStartDate, setNurseryStartDate] = useState("2024-05-01");
  const [nurseryDays, setNurseryDays] = useState(30);
  const [plantingDate, setPlantingDate] = useState("2024-06-01");
  const [daysToMature, setDaysToMature] = useState(90);
  const [firstHarvestDay, setFirstHarvestDay] = useState("2024-09-01");

  const [noOfRows, setNoOfRows] = useState(10);
  const [rowSpacing, setRowSpacing] = useState(30);
  const [spacingOnRows, setSpacingOnRows] = useState(15);
  const [bedVisualization, setBedVisualization] = useState("");

  useEffect(() => {
    if (plantingDate && daysToMature) {
      const maturityDate = new Date(plantingDate);
      maturityDate.setDate(maturityDate.getDate() + daysToMature);
      setFirstHarvestDay(maturityDate.toDateString());
    }
  }, [plantingDate, daysToMature]);

  useEffect(() => {
    if (rowSpacing && spacingOnRows && plantingAmount && noOfRows) {
      const bedRows = [];
      const seedPerRow = Math.floor(plantingAmount / noOfRows); // Ensure integer number of seeds per row
      const seedSymbol = "*"; // Use '*' for seeds

      for (let i = 0; i < noOfRows; i++) {
        const row = [];

        // Add seeds in the row with spacing
        for (let j = 0; j < seedPerRow; j++) {
          row.push(seedSymbol + " ".repeat(rowSpacing)); // Add row spacing between seeds
        }
        bedRows.push(row.join("")); // Combine seeds in a row without extra spacing
      }

      // Add vertical spacing between rows
      let spacedRows = [];
      for (let k = 0; k < bedRows.length; k++) {
        spacedRows.push(bedRows[k]);
        if (k < bedRows.length - 1) {
          // Add spacing on rows between each row except the last one
          spacedRows.push("\n".repeat(spacingOnRows)); // Add spacing on rows
        }
      }

      // Remove excess vertical spacing at the end of the bed visualization
      const lastRow = spacedRows[spacedRows.length - 1];
      if (lastRow && lastRow.trim().length === 0) {
        spacedRows.pop(); // Remove the last empty row
      }

      setBedVisualization(spacedRows.join("\n"));
    }
  }, [rowSpacing, spacingOnRows, plantingAmount, noOfRows]);
  if (!open) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      cropName,
      cultivar,
      plantingMethod,
      seedTreatment,
      plantingAmount,
      nurseryStartDate,
      nurseryDays,
      plantingDate,
      daysToMature,
      firstHarvestDay,
      noOfRows,
      rowSpacing,
      spacingOnRows,
      bedVisualization,
    };
    console.log(formData);
    onCropSubmit(formData);
    onClose();
  };
  return (
    <div className="planting-modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <h1>Planting information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cropName">Crop Name:</label>
          <input
            type="text"
            id="cropName"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cultivar">Cultivar:</label>
          <input
            type="text"
            id="cultivar"
            value={cultivar}
            onChange={(e) => setCultivar(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="plantingMethod">Planting Method:</label>
          <select
            name="plantingMethod"
            onChange={(e) => setPlantingMethod(e.target.value)}
          >
            <option value="Broadcasting">Broadcasting</option>
            <option value="Row Planting">Row Planting</option>
            <option value="Drilling">Drilling</option>
            <option value="Transplanting">Transplanting</option>
            <option value="Ridge&Furrow">Ridge and Furrow Planting</option>
          </select>
        </div>
        <div>
          <label htmlFor="seedTreatment">Seed Treatment:</label>
          <select
            id="seedTreatment"
            value={seedTreatment}
            onChange={(e) => setSeedTreatment(e.target.value)}
          >
            <option value="Coating">Seed Coating</option>
            <option value="Priming">Seed Priming</option>
            <option value="Pelleteing">Seed Pelleting</option>
            <option value="Inoculation">Seed Inoculation</option>
            <option value="Disinfection">Seed Disinfection</option>
          </select>
        </div>
        <div>
          <label htmlFor="plantingAmount">Planting Amount:</label>
          <input
            type="number"
            id="plantingAmount"
            value={plantingAmount}
            onChange={(e) => setPlantingAmount(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nurseryStartDate">Nursery Start Date:</label>
          <input
            type="date"
            id="nurseryStartDate"
            value={nurseryStartDate}
            onChange={(e) => setNurseryStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nurseryDays">Nursery Days:</label>
          <input
            type="number"
            id="nurseryDays"
            min={0}
            value={nurseryDays}
            onChange={(e) => setNurseryDays(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="plantingDate">Planting Date:</label>
          <input
            type="date"
            id="plantingDate"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="daysToMature">Days to Mature:</label>
          <input
            type="number"
            min={1}
            id="daysToMature"
            value={daysToMature}
            onChange={(e) => setDaysToMature(parseInt(e.target.value))}
          />
          <br></br>
          <label className="first">First Harvest Day:{firstHarvestDay}</label>
        </div>

        <div>
          <label htmlFor="noOfRows">No of Rows:</label>
          <input
            type="number"
            id="noOfRows"
            min={0}
            value={noOfRows}
            onChange={(e) => setNoOfRows(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="Spacing in a row">Spacing in a row:</label>
          <input
            type="number"
            id="rowSpacing"
            min={0}
            value={rowSpacing}
            onChange={(e) => setRowSpacing(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="Spacing between rows ">Spacing between rows:</label>
          <input
            type="number"
            min={0}
            id="spacingOnRows"
            value={spacingOnRows}
            onChange={(e) => setSpacingOnRows(parseInt(e.target.value))}
          />
        </div>
        <h2>Bed Visualization:</h2>
        <pre>{bedVisualization}</pre>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Planting;
