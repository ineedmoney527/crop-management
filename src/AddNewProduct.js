import React from "react";
import "./AddNewProduct.css";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import dayjs from "dayjs";
import { Hidden, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import DescriptionIcon from "@mui/icons-material/Description";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

import { createTheme } from "@mui/material/styles";
import { Buffer } from "buffer";
//icons
import YardIcon from "@mui/icons-material/Yard";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CakeIcon from "@mui/icons-material/Cake";

import AccessibleIcon from "@mui/icons-material/Accessible";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddNewProduct({ open, onClose, edit, selectedRowData, userId }) {
  const [selectedImage, setSelectedImage] = useState("./images/blueberry.png");
  const [category, setCategory] = React.useState("");
  const defaultValues = selectedRowData || {}; // Set default values to selectedRowData if available

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
  });

  const [isHovered, setIsHovered] = useState(false);
  //for close button

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onSubmit = async (data) => {
    try {
      let response; // Declare response variable outside the if-else block

      if (edit) {
        response = await axios.put(
          `http://localhost:8000/api/market/product/${selectedRowData.id}`,
          data
        );
      } else {
        console.log(data);
        response = await axios.post("http://localhost:8000/api/market", {
          ...data,
          userId: userId,
        });
      }

      console.log(response);

      if (!response.data.success) {
        setError("root", { message: "Server Error. Please try again" });
      } else {
        onClose();
        reset();
        alert("Product added successfully!");
      }
    } catch (error) {
      console.log(error);
      // Handle network errors or other unexpected errors
      setError("root", {
        message: "An error occurred while processing your request.",
      });
    }
  };
  //const base64String = Buffer.from(

  useEffect(() => {
    console.log(selectedRowData);
    if (edit) {
      setSelectedImage(`/images/${selectedRowData.image_url}`);
      setValue("fileName", selectedRowData.image_url);
    }
  }, [selectedRowData]);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (edit && defaultValues.image_file) {
      setValue("fileName", file.name);
    } else {
      setValue("fileName", file.name);
    }

    try {
      setSelectedImage(URL.createObjectURL(file));
    } catch (err) {}
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  // const reader = new FileReader();
  //   reader.onload = () => {
  //     setValue("fileName", reader.result.split(',')[1]); // Set the base64 string as the value
  //   };
  // };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setValue("birthdate", date, { shouldValidate: true });
  // };
  const theme = createTheme({
    typography: {
      fontSize: 30,
      // Add other typography options as needed
    },
  });
  useEffect(() => {
    if (!edit) {
      reset();

      setValue("fileName", defaultValues.image_file);
    }
  }, [edit, reset]);

  return (
    open && (
      <div className="modal-wrapper">
        <div>{defaultValues.birth_date}</div>
        <div className="modal-content">
          <div
            className={`close-wrapper ${isHovered ? "enlarge" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="close" onClick={onClose}>
              &times;
            </span>
          </div>
          <form className="myForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="vertical-stack">
              {selectedImage && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h3>Product Picture</h3>
                  <div>
                    <img
                      src={selectedImage}
                      alt={"image"}
                      className="selected-image"
                    />
                  </div>
                </div>
              )}
              {errors.fileName && (
                <div className="error">{errors.fileName.message}</div>
              )}
              <input
                style={{ textAlignLast: "center" }}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <input
                type="hidden"
                defaultValue="./Vector.png"
                {...register("fileName")}
              />

              {errors.image && (
                <div className="error">{errors.image.message}</div>
              )}
              <Box
                sx={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
              >
                <YardIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  inputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 25 } }}
                  className="textField"
                  {...register("name")}
                  autoComplete="off"
                  id="my-input"
                  outline="none"
                  label="Name"
                  variant="standard"
                  error={!!errors.name}

                  // defaultValue={defaultValues.name || ""}
                />
              </Box>
              {errors.name && (
                <div className="error">{errors.name.message}</div>
              )}

              <Box
                sx={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
              >
                {" "}
                <DescriptionIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></DescriptionIcon>
                <TextField
                  InputLabelProps={{ style: { fontSize: 25 } }}
                  inputProps={{ style: { fontSize: 20 } }}
                  className="textField"
                  {...register("description")}
                  label="Description"
                  autoComplete="off"
                  variant="standard"
                  error={!!errors.password}
                />
              </Box>
              {errors.password && (
                <div className="error">{errors.password.message}</div>
              )}
              <Box
                sx={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
              >
                {" "}
                <PriceChangeIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></PriceChangeIcon>
                <TextField
                  InputLabelProps={{ style: { fontSize: 25 } }}
                  inputProps={{ style: { fontSize: 20 }, step: "0.01" }}
                  className="textField"
                  type="number"
                  min="1"
                  {...register("price_per_unit")}
                  label="Price"
                  autoComplete="off"
                  variant="standard"
                  error={!!errors.password}
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
              >
                {" "}
                <ProductionQuantityLimitsIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></ProductionQuantityLimitsIcon>
                <TextField
                  InputLabelProps={{ style: { fontSize: 25 } }}
                  inputProps={{ style: { fontSize: 20 } }}
                  className="textField"
                  type="number"
                  min="1"
                  {...register("quantity")}
                  label="Quantity"
                  autoComplete="off"
                  variant="standard"
                  error={!!errors.password}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                {/* <YardIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></YardIcon>{" "} */}
                <FormControl sx={{ m: 1, minWidth: 280 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Category
                  </InputLabel>
                  <Select
                    {...register("category")}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Category"
                    defaultValue={edit ? selectedRowData.category : "Select"}
                  >
                    <MenuItem value="Select">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value="Vegetables">Vegetables</MenuItem>
                    <MenuItem value="Fruits">Fruits</MenuItem>
                    <MenuItem value="Equipment">Equipment</MenuItem>
                    <MenuItem value="Herbicide">Herbicide</MenuItem>
                    <MenuItem value="Pesticide">Pesticide</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <div
                className="button-container"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Submit"}
                </button>
              </div>
              {errors.root && (
                <div className="error">{errors.root.message}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default AddNewProduct;
