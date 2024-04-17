import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';


const InventoryPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#73A9AD',
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
  

  const StyledTabs = styled(Tabs)(({ theme }) => ({
      '& .MuiTabs-indicator': {
        display: 'flex',
        width: '20%',
        justifyContent: 'center',
        backgroundColor: '#73A9AD',
      },
      '& .MuiTabs-indicatorSpan': {
        maxWidth: '50%', // Adjust the width here
        width: '10%',
        backgroundColor: 'rgba(69, 124, 204, 1)',
        borderRadius: 2,
      },
    }
    ));
  
  const StyledTab = styled(Tab)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(15),
    color: '#808E7C', // Set the text color here
    '&.Mui-selected': {
      color: '#73A9AD',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Dummy data for each tab
  const equipmentData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Equipment ${index + 1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
    condition: Math.random() > 0.5 ? "Good" : "Needs Maintenance",
  }));

  const herbicideData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Herbicide ${index + 1}`,
    brand: `Brand ${index + 1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
  }));

  const pesticideData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Pesticide ${index + 1}`,
    brand: `Brand ${index + 1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
  }));

  const seedlingsData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Seedlings ${index + 1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
    age: Math.floor(Math.random() * 30) + 1, // Age in days
  }));

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <Table sx={{borderRadius:'10px'}}>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Condition</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipmentData.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.id}</StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.quantity}</StyledTableCell>
                  <StyledTableCell>{item.condition}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 1:
        return (
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Brand</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {herbicideData.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.id}</StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.brand}</StyledTableCell>
                  <StyledTableCell>{item.quantity}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 2:
        return (
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Brand</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pesticideData.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.id}</StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.brand}</StyledTableCell>
                  <StyledTableCell>{item.quantity}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 3:
        return (
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Age (days)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seedlingsData.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.id}</StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.quantity}</StyledTableCell>
                  <StyledTableCell>{item.age}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ marginLeft: "30px", width: "100%" }}>
      <StyledTabs
        value={currentTab}
        onChange={handleChangeTab}
        variant="scrollable"
        scrollButtons="auto"
      >
        <StyledTab label="Equipment" />
        <StyledTab label="Herbicide" />
        <StyledTab label="Pesticide" />
        <StyledTab label="Seedlings" />
      </StyledTabs>
      <Typography variant="h6" gutterBottom component="div" mt={2}>
        {currentTab === 0 && "Equipment Inventory"}
        {currentTab === 1 && "Herbicide Inventory"}
        {currentTab === 2 && "Pesticide Inventory"}
        {currentTab === 3 && "Seedlings Inventory"}
      </Typography>
      <Box sx={{ minHeight: 200, p: 2, bgcolor: "background.paper", borderRadius:'10px' }}>
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default InventoryPage;
