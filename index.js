const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User"); // СНачала модель подключается
require("./services/passport");

// Mongoose establishes connection to Atlas
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

// Where auth begins
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
