const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URL_LOCAL;

//const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connection Istablished...");
});
db.on("disconnected", () => {
  console.log("Server Disconnected...");
});
db.on("error", (err) => {
  console.log("Server is getting Error", err);
});

module.exports = db;
