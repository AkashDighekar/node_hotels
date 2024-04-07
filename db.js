const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(url, {
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
