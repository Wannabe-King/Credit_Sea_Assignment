require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "https://credit-sea-assignment-delta.vercel.app/" }));
app.use(express.json());

// Routes
app.use("/api/reports", reportRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
