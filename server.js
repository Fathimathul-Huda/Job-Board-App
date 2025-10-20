const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const port = 3000;

// MongoDB connection
mongoose.connect(process.env.mongourl)
  .then(() => console.log(" DB connected successfully"))
  .catch((err) => console.log(" DB connection error:", err));

// Import Routes
const jobroutes = require("./Routes/jobroutes");
const authroutes = require("./Routes/authroutes");

// Use prefixed routes
app.use("/auth", authroutes); // all auth routes start with /auth
app.use("/job", jobroutes);   // all job routes start with /job

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
