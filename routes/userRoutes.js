const express = require("express");
const router = express.Router();
const User = require("./../models/user");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("Data Save Successfully...");
    res.status(200).json(response);
  } catch (error) {
    console.log("Data not Saved getting error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("Data not Fetched", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await User.find({ work: workType });
      console.log("Work Data fetched");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log("Data not Fetched", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const newUserData = req.body;

    const response = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("Data not Fetched", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.findByIdAndDelete(userId);
    if (!response) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User data deleted");
    res.status(200).json({ massage: "User Deleted Successfully" });
  } catch (err) {
    console.log("Data not deleted", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
