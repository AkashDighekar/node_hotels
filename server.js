const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const menuItemsRouter = require("./routes/menuItemsRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
const db = require("./db");

app.get("/", (req, res) => {
  res.send("Welcome To my Server how can help You");
  console.log("get method");
});

app.listen(PORT, () => {
  console.log("Server listen on port no 8080");
});

app.use("/user", userRouter);
app.use("/menu", menuItemsRouter);
