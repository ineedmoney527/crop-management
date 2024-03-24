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
} from "@mui/material";

const InventoryPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Condition</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipmentData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 1:
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {herbicideData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 2:
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pesticideData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 3:
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Age (days)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seedlingsData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.age}</TableCell>
                </TableRow>
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
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Equipment" />
        <Tab label="Herbicide" />
        <Tab label="Pesticide" />
        <Tab label="Seedlings" />
      </Tabs>
      <Typography variant="h6" gutterBottom component="div" mt={2}>
        {currentTab === 0 && "Equipment Inventory"}
        {currentTab === 1 && "Herbicide Inventory"}
        {currentTab === 2 && "Pesticide Inventory"}
        {currentTab === 3 && "Seedlings Inventory"}
      </Typography>
      <Box sx={{ minHeight: 200, p: 2, bgcolor: "background.paper" }}>
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default InventoryPage;
