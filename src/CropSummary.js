import { React, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import InventoryPage from "./InventoryPage";

export default function CropSummary() {
  // Dummy data
  const cropData = [
    { name: "Wheat", areaPlanted: 500, ratio: 0.4, revenue: 25000 },
    { name: "Rice", areaPlanted: 300, ratio: 0.3, revenue: 18000 },
    { name: "Corn", areaPlanted: 200, ratio: 0.2, revenue: 12000 },
    { name: "Barley", areaPlanted: 150, ratio: 0.15, revenue: 9000 },
    { name: "Soybeans", areaPlanted: 100, ratio: 0.1, revenue: 6000 },
  ];

  // Data for pie chart
  const pieChartData = {
    labels: ["Wheat", "Rice", "Corn", "Barley", "SoyBean"],
    datasets: [
      {
        data: [500, 300, 200, 150, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "green", "brown"],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "green",
          "brown",
        ],
      },
    ],
  };
  const [pageTitle, setPageTitle] = useState("Crop Summary");
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setPageTitle(e.target.value);
  };
  useEffect(() => {
    // Navigate to a specific page based on the selected title
    switch (pageTitle) {
      case "Crop Summary":
        navigate("/CropSummary");
        break;

      case "Weather":
        navigate("/Weather");
        break;
      // Add more cases for additional options if needed
      default:
        navigate("/Accounting");
        break;
    }
  }, [pageTitle]);

  return (
    <>
      <div>
        <select
          value={pageTitle}
          onChange={handleTitleChange}
          style={{ fontWeight: "bold", fontSize: "24px" }}
        >
          {" "}
          <option value="Accounting">Accounting</option>
          <option value="Crop Summary">Farm Summary</option>
          <option value="Weather">Weather</option>
          {/* Add options for the select dropdown here */}
        </select>
      </div>
      <Box
        display="flex"
        justifyContent="center"
        gap="80px"
        padding="40px"
        maxHeight={500}
      >
        {/* Left container with table */}
        <Paper
          style={{ flex: "1" }}
          elevation={3}
          variant="outlined"
          sx={{ borderRadius: 10, padding: 2, flex: "1" }}
        >
          <Typography variant="h6" gutterBottom>
            Crop Summary Table
          </Typography>
          <TableContainer
            style={{
              maxWidth: "100%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Crop Name</TableCell>
                  <TableCell>Area Planted (hectar)</TableCell>
                  <TableCell>Ratio</TableCell>
                  <TableCell>Revenue Generated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cropData.map((crop, index) => (
                  <TableRow key={index}>
                    <TableCell>{crop.name}</TableCell>
                    <TableCell>{crop.areaPlanted}</TableCell>
                    <TableCell>{crop.ratio}</TableCell>
                    <TableCell>{crop.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Right container with pie chart */}
        <Paper
          style={{ maxWidth: "500px", flex: "1" }}
          elevation={3}
          variant="outlined"
          sx={{
            borderRadius: 10,
            padding: 2,
            flex: "1",
            height: "400px", // Set a specific height for the container
          }}
        >
          <Typography variant="h6" gutterBottom>
            Crop Categories Pie Chart
          </Typography>
          <div
            style={{
              maxWidth: "100%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pie data={pieChartData} />
          </div>
        </Paper>
      </Box>
      <div>
        <InventoryPage></InventoryPage>
      </div>
    </>
  );
}
