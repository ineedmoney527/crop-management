import React, { useState, useEffect } from "react";
import CustomModal from "./CustomModal.js";
import {
  Button,
  Stack,
  Typography,
  Divider,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8BA766",
  color: "white",
  "&:hover": {
    backgroundColor: "#495D44",
  },
  padding: "8px 16px",
  minWidth: "100px",
}));

const Cart = ({
  cartItems,
  removeFromCart,
  editCartItem,
  storeItems,
  cartModalOpen,
  closeCartModal,
}) => {
  const [updatedQuantities, setUpdatedQuantities] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const userId = 1;

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleSaveCartChanges = () => {
    Object.keys(updatedQuantities).forEach((itemId) => {
      const item = cartItems.find((i) => i.id === parseInt(itemId));
      if (item) {
        editCartItem(item, updatedQuantities[itemId]);
      }
    });
  };

  const pay = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/pay", {
        cartItems,
        userId,
      });
      console.log(response.data); // Handle success message
    } catch (error) {
      alert(JSON.stringify(error.response.data.error));
      console.error(error.response.data); // Handle error message
    }
  };

  useEffect(() => {
    handleSaveCartChanges(); // Save cart changes after updatedQuantities changes
  }, []);

  useEffect(() => {
    handleSaveCartChanges(); // Save cart changes after updatedQuantities changes
  }, [updatedQuantities]); // Run this effect whenever updatedQuantities changes

  const handleQuantityUpdate = (item, newQuantity) => {
    const storeItem = storeItems.find((i) => i.id === item.id);
    if (newQuantity > storeItem.quantity) {
      setShowAlert(true);
    } else {
      setUpdatedQuantities((prevState) => ({
        ...prevState,
        [item.id]: newQuantity,
      }));
      setShowAlert(false);
    }
  };

  return (
    <CustomModal open={cartModalOpen} onClose={closeCartModal}>
      <Box p={4}>
        <Stack direction="column" spacing={3}>
          <Typography variant="h5" fontWeight="bold" color="#8BA766">
            Cart
          </Typography>
          <Divider />
          {showAlert && (
            <Alert severity="error">
              The quantity you entered exceeds the available stock.
            </Alert>
          )}
          {cartItems.length === 0 ? (
            <Typography variant="body1" color="#495D44">
              Your cart is empty.
            </Typography>
          ) : (
            cartItems.map((item, index) => {
              const storeItem = storeItems.find((i) => i.id === item.id);
              return (
                <Stack
                  key={item.id}
                  spacing={5} // Added spacing between elements
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    backgroundColor: "#F7F7F7",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="body1" color="#495D44">
                    {index + 1}. {item.name}
                  </Typography>
                  <Typography variant="body1" color="#495D44">
                    Price: ${item.price_per_unit.toFixed(2)}
                  </Typography>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={updatedQuantities[item.id] || item.quantity}
                    onChange={(e) =>
                      handleQuantityUpdate(item, parseInt(e.target.value, 10))
                    }
                    inputProps={{ min: 1, max: storeItem.quantity }}
                  />
                  <Typography variant="body1" color="#495D44">
                    Total: ${item.totalPrice.toFixed(2)}
                  </Typography>
                  <StyledButton
                    color="error"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </StyledButton>
                </Stack>
              );
            })
          )}
          <Divider />
          <Stack
            direction="column"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold" color="#8BA766">
              Total: ${getTotalPrice().toFixed(2)}
            </Typography>
            <StyledButton variant="contained" size="large" onClick={pay}>
              Pay Now
            </StyledButton>
          </Stack>
        </Stack>
      </Box>
    </CustomModal>
  );
};

export default Cart;
