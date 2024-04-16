import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ChatbotController from "../backend/controller/ChatbotController.js";
import SmartDoctorController from "../backend/controller/SmartDoctorController.js";
import MarketController from "../backend/controller/MarketController.js";
import UserController from "../backend/controller/UserController.js";
import AccountingController from "../backend/controller/AccoutingController.js";

import pool from "./config/dbConnection.js";
const app = express();
import dotenv from "dotenv";

dotenv.config();

// Enable CORS for all routes
app.use(cors());
// Configure body-parser for handling JSON and URL-encoded data with a limit of "10mb"
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
const PORT = process.env.PORT || 5000;
console.log(process.env.PORT);

app.use("/api/user", UserController);
app.use("/api/chatbot", ChatbotController);
app.use("/api/vision", SmartDoctorController);
app.use("/api/market", MarketController);
app.use("/api/accounting", AccountingController);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
