const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const { jwtAutheMiddleWere, generateToken } = require("./../jwt");

router.post("/signUp", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Data Save Successfully...");
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("Data not Saved getting error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login Routing
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Username & Password" });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    //token generate
    const token = generateToken(payload);
    res.json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", jwtAutheMiddleWere, async (req, res) => {
  try {
    const data = await User.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("Data not Fetched", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", jwtAutheMiddleWere, async (req, res) => {
  try {
    const userData = req.user;
    console.log("UserDate", userData);

    const userId = await userData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
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
