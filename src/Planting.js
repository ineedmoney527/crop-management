import React, { useState, useEffect } from "react";

const Planting = () => {
  const [cropName, setCropName] = useState("");
  const [cultivar, setCultivar] = useState("");
  const [plantingMethod, setPlantingMethod] = useState("");
  const [seedTreatment, setSeedTreatment] = useState("");
  const [plantingAmount, setPlantingAmount] = useState(0);
  const [nurseryStartDate, setNurseryStartDate] = useState("");
  const [nurseryDays, setNurseryDays] = useState(0);
  const [plantingDate, setPlantingDate] = useState("");
  const [daysToMature, setDaysToMature] = useState(0);
  const [firstHarvestDay, setFirstHarvestDay] = useState("");

  const [noOfRows, setNoOfRows] = useState(0);
  const [rowSpacing, setRowSpacing] = useState(0);
  const [spacingOnRows, setSpacingOnRows] = useState(0);
  const [bedVisualization, setBedVisualization] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate bed visualization based on row spacing
    const bedRows = [];
    for (let i = 0; i < noOfRows; i++) {
      const row = [];
      for (let j = 0; j < spacingOnRows; j++) {
        row.push("*");
      }
      bedRows.push(row.join(""));
    }
    setBedVisualization(bedRows.join("\n"));

    // Reset form after submission
    setCropName("");
    setCultivar("");
    setPlantingMethod("");
    setSeedTreatment("");
    setPlantingAmount(0);
    setNurseryStartDate("");
    setNurseryDays(0);
    setPlantingDate("");
    setDaysToMature(0);
    setFirstHarvestDay("");
    setNoOfRows(0);
    setRowSpacing(0);
    setSpacingOnRows(0);
  };
  useEffect(() => {
    if (plantingDate && daysToMature) {
      const maturityDate = new Date(plantingDate);
      maturityDate.setDate(maturityDate.getDate() + daysToMature);
      setFirstHarvestDay(maturityDate.toDateString());
    }
  }, [plantingDate, daysToMature]);

  return (
    <div>
      <h1>Input Page</h1>
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
            id="plantingMethod"
            value={plantingMethod}
            onChange={(e) => setPlantingMethod(e.target.value)}
          >
            <option value="">Select Planting Method</option>
            <option value="method1">Method 1</option>
            <option value="method2">Method 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="seedTreatment">Seed Treatment:</label>
          <select
            id="seedTreatment"
            value={seedTreatment}
            onChange={(e) => setSeedTreatment(e.target.value)}
          >
            <option value="">Select Seed Treatment</option>
            <option value="treatment1">Treatment 1</option>
            <option value="treatment2">Treatment 2</option>
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
            id="daysToMature"
            value={daysToMature}
            onChange={(e) => setDaysToMature(parseInt(e.target.value))}
          />
          <br></br>
          <label>First Harvest Day:{firstHarvestDay}</label>
        </div>

        <div>
          <label htmlFor="noOfRows">No of Rows:</label>
          <input
            type="number"
            id="noOfRows"
            value={noOfRows}
            onChange={(e) => setNoOfRows(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rowSpacing">Spacing between Rows:</label>
          <input
            type="number"
            id="rowSpacing"
            value={rowSpacing}
            onChange={(e) => setRowSpacing(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="spacingOnRows">Spacing on Rows:</label>
          <input
            type="number"
            id="spacingOnRows"
            value={spacingOnRows}
            onChange={(e) => setSpacingOnRows(parseInt(e.target.value))}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <h2>Bed Visualization:</h2>
      <pre>{bedVisualization}</pre>
    </div>
  );
};

export default Planting;
