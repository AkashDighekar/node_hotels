const express = require("express");
const router = express.Router();
const MenuItems = require("./../models/menuItems");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuItems = new MenuItems(data);
    const response = await menuItems.save();
    console.log("Manu Items Saved Successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log("Menu Items Does't Saved...", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItems.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("Data not Fetched", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:testeType", async (req, res) => {
  try {
    const testeType = req.params.testeType;
    if (testeType == "spicy" || testeType == "sour" || testeType == "sweet") {
      const response = await MenuItems.find({ teste: testeType });
      console.log("menuItems is fetched");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log("Data not Fetched", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const newMenuItem = req.body;
    const response = await MenuItems.findByIdAndUpdate(menuId, newMenuItem, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ message: "MenuItes not Found" });
    }
    console.log("Menu item Updated Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("MenuItem not Fetched", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await MenuItems.findByIdAndDelete(menuId);
    if (!response) {
      res.status(404).json({ message: "Menu item Not found" });
    }

    console.log("Menu item Deleted");
    res.status(200).json({ message: "Menu Item Deleted Successfully" });
  } catch (err) {
    console.log("Manu item not deleted", err);
    res.status(500).json({ message: "MenuItem Deleted Successfully" });
  }
});

module.exports = router;
