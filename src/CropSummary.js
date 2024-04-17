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
  styled,
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import InventoryPage from "./InventoryPage";

export default function CropSummary() {
  const palette = [  '#FBA884', '#F9DC74', '#73A9AD', '#90C8AC', '#C4DFAA', '#D0C9B6', '#EEC535', '#8D8571',];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#90C8AC',
      color: 'white',
      alignItems: 'center',
      textAlign: 'center', // Center the text
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '16px'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      alignItems: 'center',
      textAlign: 'center', // Center the text
      verticalAlign: 'middle',
      color: '#495D44'
    },
    '&.MuiTable-root	':{
      borderRadius: '10px'
    }
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: '#FCE5DA',
      cursor: 'pointer', // Optionally, change cursor to pointer on hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

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
        backgroundColor: palette,
        hoverBackgroundColor: palette,
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
          className="select-pageCrop"
          onChange={handleTitleChange}
          style={{  fontSize: "24px" }}
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
        gap="20px"
        padding="20px"
        maxHeight={500}
      >
        {/* Left container with table */}
        <Paper
          style={{ flex: "1" }}
          elevation={3}
          variant="outlined"
          sx={{ 
            boxShadow: '0px 6px 12px -2px rgba(50, 50, 93, 0.25), 0px 3px 7px -3px rgba(0, 0, 0, 0.3)',
            borderRadius: '20px', padding: 2, flex: "1", }}
        >
          <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>
            Crop Summary Table
          </Typography>
          <TableContainer
            style={{
              borderRadius: '10px',
              maxWidth: "100%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Table stickyHeader sx={{ borderRadius: '10px' }} >
              <TableHead>
                <TableRow style={{ backgroundColor: '#f5f5f5'}}>
                  <StyledTableCell style={{ fontWeight: 'bold' }}>Crop Name</StyledTableCell>
                  <StyledTableCell  style={{ fontWeight: 'bold' }}>Area Planted (hectar)</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: 'bold' }} >Ratio</StyledTableCell>
                  <StyledTableCell  style={{ fontWeight: 'bold' }} >Revenue Generated</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cropData.map((crop, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{crop.name}</StyledTableCell>
                    <StyledTableCell>{crop.areaPlanted}</StyledTableCell>
                    <StyledTableCell>{crop.ratio}</StyledTableCell>
                    <StyledTableCell>{crop.revenue}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Right container with pie chart */}
        <Paper
          style={{ width: "350px", flex: "1", height:'450px' }}
          elevation={3}
          variant="outlined"
          sx={{
            borderRadius: 5,
            padding: 2,
            flex: "1",
            boxShadow: '0px 6px 12px -2px rgba(50, 50, 93, 0.25), 0px 3px 7px -3px rgba(0, 0, 0, 0.3)',
            height: "400px", // Set a specific height for the container
          }}
        >
          <Typography variant="h6" gutterBottom sx={{fontWeight:'bold'}} >
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
