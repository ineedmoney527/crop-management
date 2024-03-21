const SoilContainer = ({ soilData }) => {
  return (
    <div className="soil-container">
      <h2>Soil Information</h2>
      <div className="soil-visualizations">
        <div className="soil-type-visualization">
          <h3>Soil Type and Texture</h3>
          <div className="soil-type-icon">
            {/* Add icons or images based on soil type and texture */}
          </div>
          <div className="soil-type-text">
            {/* <p>Soil Type: {soilData.soilType}</p> */}
            <p>Texture: {soilData.texture}</p>
          </div>
        </div>
        <div className="soil-ph-visualization">
          <h3>Soil PH</h3>
          <div className="ph-meter">
            {/* Visualize soil PH using a meter or color indicator */}
          </div>
          <p>PH Level: {soilData.ph}</p>
        </div>
        <div className="soil-nutrients-visualization">
          <h3>Nutrient Levels</h3>
          <div className="nutrient-bars">
            {/* Visualize nutrient levels using bars or charts */}
          </div>
          <div className="nutrient-labels">
            <p>Nitrogen: {soilData.nitrogen}</p>
            <p>Potassium: {soilData.potassium}</p>
            <p>Phosphorus: {soilData.phosphorus}</p>
          </div>
        </div>
        {/* Add more visualizations for other soil parameters */}
      </div>
    </div>
  );
};

export default SoilContainer;
