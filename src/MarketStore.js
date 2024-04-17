import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./MarketStore.css";
import CustomModal from "./CustomModal.js"; // Import the modal component
import AddNewProduct from "./AddNewProduct.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  Box,
  Typography,
  Slider,
  Divider,
  Stack,
  Grid,
  Button,
  TextField,
  styled,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { CiShoppingCart } from "react-icons/ci";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Card,
  CardContent,
} from "@mui/material";
import SeedCard from "./SeedCard"; // Import SeedCard component here
import CartPage from "./CartPage.js";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TableContainer from "@mui/material/TableContainer";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  TabContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function MarketStore() {
  const theme = useTheme();
  const [openAlert, setOpenAlert] = useState(false);
  const [value, setValue] = React.useState(1);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const categoriesData = [
    { id: 1, name: "Flowers", checked: false },
    { id: 2, name: "Vegetables", checked: false },
    { id: 3, name: "Herbs", checked: false },
  ];

  const [categories, setCategories] = useState(categoriesData);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [storeItems, setStoreItems] = useState([]);
  const [myItem, setMyItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [itemToAdd, setItemToAdd] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const user_id = 1;

  useEffect(() => {
    if (openAlert) {
      const timer = setTimeout(() => {
        setOpenAlert(false);
      }, 1000); // Adjust the duration (in milliseconds) as needed

      return () => clearTimeout(timer);
    }
  }, [openAlert]);

  const handleShowAlert = () => {
    setOpenAlert(true);
  };

  const fetchStoreItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/market/${user_id}/1`
      );
      setStoreItems(response.data);
      setFilteredItems(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchMyProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/market/${user_id}/0`
      );
      setMyItem(response.data);
      console.log("sell" + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchStoreItem();
    fetchMyProduct();
    console.log("myitem" + myItem);
    console.log("someitem" + storeItems);
  }, []);

  const openAddToCartModal = (seed) => {
    setSelectedSeed(seed);
    setItemToAdd({ ...seed, quantity: 1 });
    console.log(seed.quantity);
    setModalOpen(true);
  };

  const closeAddToCartModal = () => {
    setSelectedSeed(null);
    setModalOpen(false);
  };
  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const addToCart = (seed) => {
    openAddToCartModal(seed); // Open the modal for adding to cart
  };

  const viewCart = (seed) => {
    setCartModalOpen(true); // Open the modal for adding to cart
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const removeFromCart = (itemToRemove) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    const itemToUpdate = storeItems.find((item) => item.id === itemToRemove.id);
    if (itemToUpdate) {
      itemToUpdate.quantity += itemToRemove.quantity;
      setStoreItems([...storeItems]);
    }
    setCartItems(updatedCartItems);
  };

  const handleAddToCart = () => {
    if (itemToAdd.quantity <= 0) {
      alert("Quantity should be greater than zero.");
      return;
    }
    if (itemToAdd.quantity > selectedSeed.quantity) {
      alert("Quantity exceeded available stock.");
      return;
    }

    const existingItem = cartItems.find((item) => item.id === itemToAdd.id);
    if (existingItem) {
      // Update the quantity of the existing item
      existingItem.quantity += itemToAdd.quantity;
      existingItem.totalPrice =
        existingItem.quantity * existingItem.price_per_unit;
      setCartItems([...cartItems]);
    } else {
      // Create a new item and add it to the cart
      const newItem = {
        ...itemToAdd,
        totalPrice: itemToAdd.quantity * itemToAdd.price_per_unit,
      };
      setCartItems([...cartItems, newItem]);
    }

    selectedSeed.quantity -= itemToAdd.quantity;
    closeAddToCartModal();
    handleShowAlert();
    console.log(cartItems);
  };

  <CustomModal open={modalOpen} onClose={closeAddToCartModal}>
    {selectedSeed && (
      <div>
        <h2>Add to Cart</h2>
        <p>
          Seed: {selectedSeed.name}
          <br />
          Price per unit: ${selectedSeed.price_per_unit}
        </p>
        <TextField
          type="number"
          label="Quantity"
          InputProps={{ inputProps: { min: 1, max: selectedSeed.quantity } }}
          defaultValue={1}
          onChange={(e) => {
            const quantity = parseInt(e.target.value, 10);
            setSelectedSeed({ ...selectedSeed, quantity });
          }}
        />
        <p>
          Total Price: ${selectedSeed.quantity * selectedSeed.price_per_unit}
        </p>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    )}
  </CustomModal>;

  const editCartItem = (item, newQuantity) => {
    const updatedCartItems = cartItems.map((i) =>
      i.id === item.id
        ? {
            ...i,
            quantity: newQuantity,
            totalPrice: newQuantity * i.price_per_unit,
          }
        : i
    );
    setCartItems(updatedCartItems);
    const storeItem = storeItems.find((i) => i.id === item.id);
    if (storeItem) {
      storeItem.quantity += item.quantity - newQuantity;
      setStoreItems([...storeItems]);
    }
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? { ...category, checked: !category.checked }
        : category
    );
    setCategories(updatedCategories);

    // Check if all categories are unchecked
    const allUnchecked = updatedCategories.every(
      (category) => !category.checked
    );

    if (allUnchecked) {
      setFilteredItems(storeItems);
    } else {
      filterItems(updatedCategories, priceRange);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    filterItems(categories, newValue);
  };

  const handleApplyFilters = () => {
    // Handle applying filters based on categories and price range
    console.log("Categories:", categories);
    console.log("Price Range:", priceRange);
  };

  const filterItems = (selectedCategories, priceRange) => {
    let filtered = [];

    if (selectedCategories.some((category) => category.checked)) {
      // Filter by both categories and price range
      filtered = storeItems.filter(
        (item) =>
          selectedCategories.some(
            (category) => category.checked && category.name === item.category
          ) &&
          item.price_per_unit >= priceRange[0] &&
          item.price_per_unit <= priceRange[1]
      );
    } else {
      // Filter only by price range
      filtered = storeItems.filter(
        (item) =>
          item.price_per_unit >= priceRange[0] &&
          item.price_per_unit <= priceRange[1]
      );
    }

    setFilteredItems(filtered);
  };
  //--------------------------------------------------------------------------------
  //seller code
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          ""
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={deleteRows}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip sx={{ display: "flex", gap: "20px" }} title="Filter list">
            <IconButton onClick={handleAddNewProduct}>
              {`My Products ${"    "}`}

              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  const handleDeleteClick = async (id) => {
    console.log(id);
    if (
      window.confirm(
        `Are you sure you want to delete this product with ID ${id}?`
      )
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/market/${id}`
        );
        alert("Product deleted successfully");
        fetchMyProduct();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  const deleteRows = async () => {
    if (selectedRows.length === 0) {
      return;
    }

    try {
      const id = selectedRows.map((row) => row.id).join(",");
      if (
        window.confirm(
          `Are you sure you want to delete selected products with ID ${id}?`
        )
      ) {
        const response = await axios.delete(
          `http://localhost:8000/api/market/rows/${id}`
        );
        alert("Products deleted successfully");
        fetchMyProduct();
      }
    } catch (error) {
      console.error("Error deleting users:", error);
      alert(error.message);
    }

    setSelectedRows([]);
  };

  const handleAddNewProduct = () => {
    setAddNewProduct(true);
  };

  const handleEditProduct = (x) => {
    const ross = myItem.find((row) => row.id === x);
    setSelectedRow(ross);
    setEditProduct(true);
  };

  return (
    <div className={"marketStorePage"}>
      <Tabs
        value={value}
        onChange={handleChangeTab}
        aria-label="secondary tabs example"
      >
        <Tab label="BUY" {...a11yProps(0)} />
        <Tab label="SELL" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Stack direction="row" justifyContent={"space-between"}>
            <input
              className={"searchStore"}
              type={"text"}
              placeholder={"Search keywords"}
            />
            <Snackbar
              open={openAlert}
              autoHideDuration={4000} // Same duration as the setTimeout
              onClose={() => setOpenAlert(false)}
            >
              <Alert severity="success">
                Item has been added successfully to cart!
              </Alert>
            </Snackbar>
            <Button
              className={"buttons-store"}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(139, 167, 102, 0.2)", // Background color with opacity
                },
              }}
              onClick={viewCart}
            >
              <CiShoppingCart size={30} />
            </Button>
          </Stack>

          <Stack direction="row" spacing={5} className={"mainContainerStore"}>
            <Stack
              mt={10}
              direction="column"
              spacing={2}
              className={"filteringBox"}
            >
              <div className="emptyDiv" style={{ marginTop: "15px" }}></div>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  className={"Header2"}
                >
                  Filter By
                </Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  className={"Header2"}
                >
                  Categories
                </Typography>
                <FormGroup>
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      control={
                        <Checkbox
                          checked={category.checked}
                          onChange={() => handleCategoryChange(category.id)}
                          sx={{
                            color: "#495D44", // Change the checkbox color here
                            "&.Mui-checked": {
                              color: "#8BA766", // Change the checked color if needed
                            },
                          }}
                        />
                      }
                      label={category.name}
                      sx={{
                        color: "#495D44", // Change the label color here
                        "&.Mui-checked": {
                          color: "#495D44", // Change the checked label color if needed
                        },
                      }}
                    />
                  ))}
                </FormGroup>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  className="Header2"
                >
                  Price Range
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  step={10}
                  sx={{ color: "#8BA766" }}
                />
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  className={"smallText"}
                >
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
              </Box>
              <Box mt={2}>
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleApplyFilters}
                  sx={{
                    backgroundColor: "#8BA766", // Background color
                    color: "white", // Text color
                    "&:hover": {
                      backgroundColor: "#495D44", // Hover background color
                      color: "#8BA766", // Hover text color
                    },
                  }}
                >
                  Apply Filters
                </Button> */}
              </Box>
            </Stack>

            {/*display the item pic and info */}
            <Grid container spacing={3}>
              {filteredItems.length === 0 ? (
                <Typography variant="body2" fontWeight="bold">
                  No items match the filter criteria.
                </Typography>
              ) : (
                filteredItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <SeedCard seed={item} addToCart={addToCart} />
                  </Grid>
                ))
              )}
            </Grid>
          </Stack>
          <CustomModal open={modalOpen} onClose={closeAddToCartModal}>
            {selectedSeed && (
              <div>
                <h2>Add to Cart</h2>
                <p>
                  Seed: {selectedSeed.name}
                  <br />
                  Price per unit: ${selectedSeed.price_per_unit}
                </p>
                <TextField
                  type="number"
                  label="Quantity"
                  InputProps={{
                    inputProps: { min: 1, max: selectedSeed.quantity },
                  }}
                  defaultValue={1}
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value, 10);
                    setItemToAdd({ ...selectedSeed, quantity: quantity });
                  }}
                />
                <p>
                  Total Price: $
                  {(itemToAdd.quantity * selectedSeed.price_per_unit).toFixed(
                    2
                  )}
                </p>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
              </div>
            )}
          </CustomModal>

          <CartPage
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            editCartItem={editCartItem}
            storeItems={storeItems}
            cartModalOpen={cartModalOpen}
            closeCartModal={closeCartModal}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selectedRows?.length} />
              <TableContainer>
                <DataGrid
                  rows={myItem}
                  checkboxSelection
                  disableRowSelectionOnClick
                  headerClassName="header-center"
                  disableSelectionOnClick
                  // onRowClick={(row) => {
                  //   console.log("haha");
                  // }}
                  onRowSelectionModelChange={(ids) => {
                    setSelectedRows(
                      ids.map((id) => myItem.find((row) => row.id === id))
                    );
                  }}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  pagination
                  autoHeight
                  slots={{
                    toolbar: GridToolbar,
                  }}
                  {...myItem}
                  columns={[
                    {
                      field: "id",
                      headerName: "ID",
                      width: 100,
                      align: "center",
                      headerAlign: "center",
                    },
                    {
                      field: "image_url",
                      headerName: "Image",
                      width: 150,
                      align: "center",
                      headerAlign: "center",
                      renderCell: (params) => {
                        // Convert the Buffer array to a base64 string

                        // Use the base64 string as the src attribute for the img tag
                        return (
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              margin: "auto", // Center the avatar within the cell
                            }}
                            src={`./images/${params.value}`}
                            alt="Image"
                          />
                        );
                      },
                    },
                    {
                      field: "name",
                      headerName: "Name",
                      headerAlign: "center",
                      width: 150,
                      align: "center",
                      flex: 1,
                    },
                    {
                      field: "category",
                      headerName: "Category",
                      headerAlign: "center",
                      width: 200,
                      align: "center",
                      flex: 1,
                    },
                    {
                      field: "price_per_unit",
                      headerName: "Price/Unit",
                      headerAlign: "center",
                      width: 150,
                      align: "center",
                      flex: 1,
                    },
                    {
                      field: "quantity",
                      headerName: "Quantity",
                      headerAlign: "center",
                      width: 150,
                      align: "center",
                      flex: 1,
                    },
                    {
                      field: "description",
                      headerName: "Description",
                      headerAlign: "center",
                      width: 150,
                      align: "center",
                      flex: 1,
                    },
                    {
                      field: "acti",
                      headerName: "Action",
                      headerAlign: "center",
                      width: 100,
                      align: "center",
                      renderCell: (params) => (
                        <>
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditProduct(params.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteClick(params.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      ),
                      disableSelectionOnClick: false, // Enable selection for this column
                    },
                    // Columns definition
                  ]}
                />
              </TableContainer>
            </Paper>
          </Box>
        </TabPanel>
      </SwipeableViews>
      {addNewProduct && (
        <AddNewProduct
          open={addNewProduct}
          onClose={() => {
            setAddNewProduct(false);
            fetchMyProduct();
          }}
          edit={false}
          userId={user_id}
        />
      )}

      {editProduct && (
        <AddNewProduct
          open={editProduct}
          onClose={() => {
            setEditProduct(false);
            fetchMyProduct();
          }}
          edit={true}
          selectedRowData={selectedRow}
          userId={user_id}
        />
      )}
    </div>
  );
}

export default MarketStore;
